import React, { useState } from "react";
import { View, Text } from "react-native";
import { useData } from "./addQuestionScreenComponents/answers_context";
import {
  Center,
  Square,
  Circle,
  Input,
  FormControl,
  WarningOutlineIcon,
  TextArea,
  HStack,
  Switch,
} from "native-base";
import { Button } from "native-base";
import { Select } from "native-base";
import { router, useLocalSearchParams } from "expo-router";
export default function addAnswerScreen() {
  const { answers, addAnswer } = useData();
  const [answer_text, setAnswerText] = useState("");
  const [answer_type, setAnswerType] = useState(false);
  const { answerID, settingNewValue } = useLocalSearchParams();
  const [value_set, setValuseSet] = useState(false);
  if (String(settingNewValue) == "false" && !value_set) {
    setAnswerText(answers[Number(answerID)].text);
    setAnswerType(answers[Number(answerID)].answer_type);
    setValuseSet(true);
  }
  return (
    <Center style={{ marginTop: "10%", marginBottom: "auto" }}>
      <FormControl isInvalid w="75%" maxW="300px">
        <FormControl.Label>Text odpovede</FormControl.Label>
        <Input
          placeholder="Text odpovede"
          value={answer_text}
          onChangeText={(text) => setAnswerText(text)}
        />
        <HStack alignItems="center">
          <Text>Správna Odpoveď</Text>
          <Switch
            size="sm"
            value={answer_type}
            onToggle={() => {
              if (!answer_type) setAnswerType(true);
              if (answer_type) setAnswerType(false);
            }}
          />
        </HStack>
        <Button
          onPress={() => {
            if (String(settingNewValue) == "false") {
              addAnswer({
                answer_type: answer_type,
                id: String(answerID),
                question: "1",
                text: answer_text,
              });
              router.back();
            } else {
              addAnswer({
                answer_type: answer_type,
                id: String(answerID),
                question: "1",
                text: answer_text,
              });
              router.back();
            }
          }}
          style={{ marginTop: 10 }}
        >
          Pridať Odpoveď
        </Button>
      </FormControl>
    </Center>
  );
}
