import fetchAnswers from "@/components/downloaders/fetchAnswers";
import fetchQuestions from "@/components/downloaders/fetchQuestions";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import { Answer } from "@/components/props";
import StudyCardWindow from "@/components/study_card_ui/StudyWindow";
import { Button } from "native-base";
import { useQuery } from "@tanstack/react-query";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import ScoreUploader from "../uploaders/scoreUploader";
import fetchChallange from "../downloaders/fetchChallange";
interface QuizProps {
  user_id: String;
  course_id: String;
  is_challange: boolean;
}

const QuizViewScreen = (props: QuizProps) => {
  const [question_position, setPosition] = useState(0);
  const [selected_answers, setSelectedAnswer] = useState<Answer[]>([]);
  const [answers_sent, setAnswersSent] = useState(false);
  const [score, setScore] = useState(0);
  const [correct_answers, setCorrectAnswers] = useState(0);
  const { status: questions_status, data: questions } = useQuery({
    queryKey: ["challange", props.course_id],
    enabled: !!props.course_id,
    queryFn: () => fetchChallange(props.course_id),
  });
  const { status: answer_status, data: answers } = useQuery({
    queryKey: ["answers", questions?.[question_position]?.id],
    enabled: !!questions,
    queryFn: () => fetchAnswers(questions![question_position].id),
  });

  useEffect(() => {
    if (answers) {
      setCorrectAnswers(0);
      answers.forEach((answer) => {
        if (answer.answer_type == true) {
          setCorrectAnswers(correct_answers + 1);
        }
      });
    }
  }, [answers]);

  const toggleAnswerSelection = (answer: Answer) => {
    // Skontroluje, či už je odpoveď vybraná
    if (selected_answers.some((selected) => selected.id === answer.id)) {
      // Ak je odpoveď vybraná, odstráni ju zo zoznamu
      setSelectedAnswer(
        selected_answers.filter((selected) => selected.id !== answer.id)
      );
    } else {
      // Ak odpoveď nie je vybraná, pridá ju do zoznamu
      setSelectedAnswer([...selected_answers, answer]);
    }
  };

  function getQuestionPosition(next_position: number) {
    const maxSize: number = questions!.length;
    if (question_position + next_position >= maxSize) {
      setPosition(0);
    } else if (question_position <= 0) {
      setPosition(maxSize - 1);
    } else {
      setPosition(question_position + next_position);
    }
  }
  function validateSelectedAnswers() {
    var correctSelectedAnswers = 0;
    var corectAnswers = 0;
    selected_answers.forEach((answer) => {
      if (answer.answer_type) {
        correctSelectedAnswers += 1;
      }
    });
    answers?.slice(0, 4).forEach((answer) => {
      if (answer.answer_type) {
        corectAnswers += 1;
      }
    });
    setScore(correctSelectedAnswers / corectAnswers);
  }

  function handleAnswerColor(answer: Answer): string | undefined {
    if (answers_sent) {
      if (
        answer.answer_type == true &&
        selected_answers.some((selected) => selected.id === answer.id)
      ) {
        return "#28a745";
      }
      if (
        answer.answer_type == true &&
        !selected_answers.some((selected) => selected.id === answer.id)
      ) {
        return "orange";
      }
      if (
        answer.answer_type == false &&
        selected_answers.some((selected) => selected.id === answer.id)
      ) {
        return "red";
      }
    } else {
      return selected_answers.some((selected) => selected.id === answer.id)
        ? "green"
        : "#00bcd4";
    }
  }

  function getCorrectAnswers(): string[] {
    return answers!
      .filter((answer: Answer) => answer.answer_type === true) // Filtruje správne odpovede
      .map((answer: Answer) => answer.text); // Extrahuje text správnych odpovedí
  }

  const handleSummarry = () => {
    ScoreUploader(props.course_id, score, props.user_id);
  };
  useFocusEffect(
    useCallback(() => {
      // Cleanup function that gets called when the screen is blurred (leaving the screen)
      return () => {
        console.log("Idem het");
        // Call the ScoreUploader function when leaving the screen
        ScoreUploader(props.course_id, score, props.user_id);
      };
    }, [props.course_id, String(score), props.user_id]) // Dependencies to trigger the effect when these values change
  );
  return (
    <View>
      {questions_status === "success" && answer_status === "success" && (
        <>
          <View style={{ height: "40%" }}>
            <StudyCardWindow
              question={questions[question_position].text}
              answer={getCorrectAnswers()}
              answer_shown={false}
              setShown={() => {}}
            />
          </View>
          <View style={{ height: "50%", marginTop: 15 }}>
            {answers.slice(0, 4).map((answer: Answer, index) => (
              <View style={{ padding: 10 }} key={index}>
                <Button
                  onPress={
                    !answers_sent
                      ? () => toggleAnswerSelection(answer)
                      : () => {}
                  }
                  style={{
                    backgroundColor: handleAnswerColor(answer), // Dynamically set the background color
                  }}
                >
                  {answer.text}
                </Button>
              </View>
            ))}
          </View>
          <View style={{ padding: 10, height: "10%" }}>
            {!answers_sent && (
              <Button
                onPress={() => {
                  setAnswersSent(true);
                  validateSelectedAnswers();
                }}
              >
                {answers_sent ? "Dalej" : "Zadaj"}
              </Button>
            )}
            {answers_sent && (
              <Button
                onPress={() => {
                  if (question_position + 1 < questions.length) {
                    setPosition(question_position + 1);
                  } else {
                    handleSummarry();
                    router.push({
                      pathname: "/study/lecture/sumaryView",
                      params: { score: score, is_challange: "true" },
                    });
                  }
                  setAnswersSent(false);
                }}
              >
                {answers_sent ? "Dalej" : "Zadaj"}
              </Button>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default QuizViewScreen;
