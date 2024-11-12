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
  function getCorrectAnswers(): string[] {
    return answers!
      .filter((answer: Answer) => answer.answer_type === true) // Filtruje správne odpovede
      .map((answer: Answer) => answer.text); // Extrahuje text správnych odpovedí
  }
  return (
    <View>
      {questions_status === "success" && answer_status === "success" && (
        <>
        <View style={{height:"60%"}}>
          <StudyCardWindow
            question={questions[question_position].text}
            answer={getCorrectAnswers()}
            answer_shown={answerShown}
            setShown={() => setAnswerShown(!answerShown)}
          />
          </View>
          <View style={{marginTop:10}}>
          <Button
           
            onPress={() => {
              getQuestionPosition(1);
            }}
          >
            Ďalšia
          </Button>
          </View>
          <View style={{marginTop:10}}>
          <Button
           style={{marginTop:10}}
            onPress={() => {
              getQuestionPosition(-1);
            }}
          >
            Predošlá
          </Button>
          </View>
        </>
      )}
    </View>
  );
};

export default StudyCard;
