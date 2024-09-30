import fetchAnswers from "@/components/downloaders/fetchAnswers";
import fetchQuestions from "@/components/downloaders/fetchQuestions";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import { Answer } from "@/components/props";
import StudyCardWindow from "@/components/study_card_ui/StudyWindow";
import { Button } from "@rneui/base";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text } from "react-native";

const StudyCard = () => {
  const [answerShown, setAnswerShown] = useState(false);
  const [question_position, setPosition] = useState(0);
  const { lectureID, courseID } = useLocalSearchParams();
  const { status: questions_status, data: questions } = useQuery({
    queryKey: ["questions", lectureID],
    enabled: !!lectureID,
    queryFn: () => fetchQuestions(lectureID[0]!),
  });
  const { status: answer_status, data: answers } = useQuery({
    queryKey: ["answers", questions?.[question_position]?.id],
    enabled: !!questions,
    queryFn: () => fetchAnswers(questions![question_position].id),
  });
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
  function getCorrectAnswer(): Answer {
    return answers!.find((answer: Answer) => answer.answer_type === true)!;
  }
  return (
    <View>
      {questions_status === "success" && answer_status === "success" && (
        <>
          <StudyCardWindow
            question={questions[question_position].text}
            answer={getCorrectAnswer().text}
            answer_shown={answerShown}
            setShown={() => setAnswerShown(!answerShown)}
          />
          <Button
            onPress={() => {
              getQuestionPosition(1);
            }}
          >
            Ďalšia
          </Button>
          <Button
            onPress={() => {
              getQuestionPosition(-1);
            }}
          >
            Prtedošlá
          </Button>
        </>
      )}
    </View>
  );
};

export default StudyCard;
