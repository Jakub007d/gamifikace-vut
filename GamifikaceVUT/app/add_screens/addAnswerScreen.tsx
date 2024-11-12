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
import { router } from "expo-router";
export default function addAnswerScreen() {
  const { answers, addAnswer } = useData();
  const [answer_text, setAnswerText] = useState("");
  const [answer_type, setAnswerType] = useState(false);
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
            onChange={() => {
              setAnswerType(answer_type!);
            }}
          />
        </HStack>
        <Button
          onPress={() => {
            addAnswer({
              answer_type: answer_type,
              id: answer_text,
              question: "1",
              text: answer_text,
            });
            router.back();
          }}
          style={{ marginTop: 10 }}
        >
          Pridať Odpoveď
        </Button>
      </FormControl>
    </Center>
  );
}
