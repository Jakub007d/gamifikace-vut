import fetchAnswers from "@/components/downloaders/fetchAnswers";
import fetchQuestions from "@/components/downloaders/fetchQuestions";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import { Answer } from "@/components/props";
import StudyCardWindow from "@/components/study_card_ui/StudyWindow";
import { Button, ButtonText } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import React from "react";
import { Box } from "@/components/ui/box";
import { Avatar } from "@/components/ui/avatar";
import getInitials from "@/components/functions/getInitials";
import { useNavigation } from "expo-router";

const StudyCard = () => {
  const navigation = useNavigation();

  const [answerShown, setAnswerShown] = useState(false);
  const [question_position, setPosition] = useState(0);
  const { lectureID, lecture_name } = useLocalSearchParams();
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
  useEffect(() => {
    navigation.setOptions({
      title: "Pamäťové karty " + lecture_name,
    });
  }, [navigation]);
  return (
    <View>
      {questions_status === "success" && answer_status === "success" && (
        <>
          <View style={{ height: "60%" }}>
            <StudyCardWindow
              question={questions[question_position].text}
              answer={getCorrectAnswers()}
              answer_shown={answerShown}
              setShown={() => setAnswerShown(!answerShown)}
            />
          </View>
          <Box className="w-[90%] mx-auto flex justify-center items-center">
            <Button
              className="h-12 w-[100%]"
              onPress={() => {
                getQuestionPosition(1);
              }}
            >
              <ButtonText>Ďalšia</ButtonText>
            </Button>
          </Box>

          <Box className="w-[90%] mx-auto flex justify-center items-center mt-2">
            <Button
              className="h-12 w-[100%]"
              onPress={() => {
                getQuestionPosition(-1);
              }}
            >
              <ButtonText>Predošlá</ButtonText>
            </Button>
          </Box>
        </>
      )}
    </View>
  );
};

export default StudyCard;
