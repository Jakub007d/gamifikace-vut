import fetchAnswers from "@/components/downloaders/fetchAnswers";
import fetchQuestions from "@/components/downloaders/fetchQuestions";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import { Answer } from "@/components/props";
import StudyCardWindow from "@/components/study_card_ui/StudyWindow";
import { Button } from "@rneui/base";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

const QuizView = () => {
  const [question_position, setPosition] = useState(0);
  const [selected_answers, setSelectedAnswer] = useState<Answer[]>([]);
  const [answers_sent, setAnswersSent] = useState(false);
  const { lectureID, courseID } = useLocalSearchParams();
  const [score, setScore] = useState(0);
  const [correct_answers, setCorrectAnswers] = useState(0);
  const { status: questions_status, data: questions } = useQuery({
    queryKey: ["questions", lectureID],
    enabled: !!lectureID,
    queryFn: () =>
      fetchQuestions(
        typeof lectureID === "string" ? lectureID : lectureID.join(", ")
      ),
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
        return "green";
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
        : undefined;
    }
  }

  function getCorrectAnswers(): string[] {
    return answers!
      .filter((answer: Answer) => answer.answer_type === true) // Filtruje správne odpovede
      .map((answer: Answer) => answer.text); // Extrahuje text správnych odpovedí
  }

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
                  title={answer.text}
                  color={handleAnswerColor(answer)}
                  onPress={
                    !answers_sent
                      ? () => toggleAnswerSelection(answer)
                      : () => {}
                  }
                />
              </View>
            ))}
          </View>
          <View style={{ padding: 10, height: "10%" }}>
            {!answers_sent && (
              <Button
                title={answers_sent ? "Dalej" : "Zadaj"}
                onPress={() => {
                  setAnswersSent(true);
                  validateSelectedAnswers();
                }}
              />
            )}
            {answers_sent && (
              <Button
                title={answers_sent ? "Dalej" : "Zadaj"}
                onPress={() => {
                  if (question_position + 1 < questions.length) {
                    setPosition(question_position + 1);
                  } else {
                    router.push({
                      pathname: "/study/lecture/sumaryView",
                      params: { score: score },
                    });
                  }
                  setAnswersSent(false);
                }}
              />
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default QuizView;
