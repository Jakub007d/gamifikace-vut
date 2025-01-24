import fetchAnswers from "@/components/downloaders/fetchAnswers";
import fetchQuestions from "@/components/downloaders/fetchQuestions";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import { Answer } from "@/components/props";
import StudyCardWindow from "@/components/study_card_ui/StudyWindow";
import { Button, Center, FormControl, Input } from "native-base";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import React from "react";
import { baseFontSize } from "native-base/lib/typescript/theme/tools";

const QuizView = () => {
  const [question_position, setPosition] = useState(0);
  const [selected_answers, setSelectedAnswer] = useState<Answer[]>([]);
  const [textCorrectAnswers, setTextCorrectedAnswers] = useState(0);
  const [answers_sent, setAnswersSent] = useState(false);
  const { lectureID, courseID } = useLocalSearchParams();
  const [score, setScore] = useState(0);
  const [bad, setBad] = useState(0);
  const [correct_answers, setCorrectAnswers] = useState(0);
  const [answer_text, setAnswerText] = useState("");
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
      let correct = 0;
      let badAnswers = 0;
      answers.forEach((answer) => {
        if (answer.answer_type == true) {
          correct += 1;
          setCorrectAnswers(correct_answers + 1);
        } else {
          badAnswers += 1;
        }
      });
      setCorrectAnswers(correct);
      setBad(badAnswers);
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
      } else {
        setBad(bad + 1);
      }
    });
    answers?.slice(0, 4).forEach((answer) => {
      if (answer.answer_type) {
        corectAnswers += 1;
      }
    });
    setScore(correctSelectedAnswers / corectAnswers);
    setScore(score + textCorrectAnswers);
  }

  function getCorrectAnswers(): string[] {
    return answers!
      .filter((answer: Answer) => answer.answer_type === true) // Filtruje správne odpovede
      .map((answer: Answer) => answer.text); // Extrahuje text správnych odpovedí
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

  function handleTextAnswer(answer: string, input: string) {
    if (input == answer) {
      setTextCorrectedAnswers(textCorrectAnswers + 1);
    } else {
      setBad(bad + 1);
    }
  }

  return (
    <Center>
      <View style={{ width: "90%" }}>
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
            {answers.length > 1 && (
              <>
                <View style={{ height: "50%", marginTop: 15 }}>
                  {answers.slice(0, 4).map((answer: Answer, index) => (
                    <View style={{ padding: 10 }} key={index}>
                      <Button
                        style={{
                          backgroundColor: handleAnswerColor(answer),
                        }}
                        onPress={
                          !answers_sent
                            ? () => toggleAnswerSelection(answer)
                            : () => {}
                        }
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
                          router.push({
                            pathname: "/study/lecture/sumaryView",
                            params: { score: score, bad: bad, id: lectureID },
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
            {answers.length == 1 && (
              <>
                <View
                  style={{
                    height: "45%",
                    marginTop: 30,
                    width: "80%",
                    marginHorizontal: "auto",
                  }}
                >
                  <Input
                    placeholder="Zadaj odpoveď"
                    isDisabled={answers_sent}
                    backgroundColor={
                      answers_sent && answers[0]?.text === answer_text
                        ? "#90EE90" // Svetlozelená pri správnej odpovedi
                        : answers_sent && answers[0]?.text !== answer_text
                        ? "#FF6666" // Svetločervená pri nesprávnej odpovedi
                        : "transparent"
                    }
                    value={answer_text}
                    onChangeText={(text) => setAnswerText(text)}
                  />
                </View>
                <View style={{ padding: 10, height: "10%" }}>
                  {!answers_sent && (
                    <Button
                      onPress={() => {
                        setAnswersSent(true);
                        handleTextAnswer(answers[0].text, answer_text);
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
                          router.push({
                            pathname: "/study/lecture/sumaryView",
                            params: {
                              score: score,
                              bad: bad,
                              lectureID: lectureID,
                            },
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
          </>
        )}
      </View>
    </Center>
  );
};

export default QuizView;
