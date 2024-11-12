import { Text } from "react-native";
import {
  Center,
  Square,
  Circle,
  Input,
  FormControl,
  WarningOutlineIcon,
  TextArea,
  Toast,
} from "native-base";
import { Button } from "native-base";
import { Select } from "native-base";
import { useToast } from 'native-base';
import { useData } from "./addQuestionScreenComponents/answers_context";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import postQuestionWithAnswers from "@/components/uploaders/uploadQuestion";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function addQuestionScreen() {
  const { answers, addAnswer } = useData();
  const { lectureID, lectureName } = useLocalSearchParams();
  const [question_name, setQuestionName] = useState("");
  const [question_text, setQuestionText] = useState("");
  const toast = useToast();
  return (
    <Center>
      <Text>{lectureName}</Text>
      <FormControl isInvalid w="75%" maxW="300px">
        <FormControl.Label>Názov Otázky</FormControl.Label>
        <Input
          placeholder="Názov Otázky"
          value={question_name} // Bind the state variable to the Input value
          onChangeText={(text) => setQuestionName(text)}
        />
        <FormControl.Label>Text otázky</FormControl.Label>
        <TextArea
          h={20}
          placeholder="Text Otázky"
          w="100%"
          maxW="300"
          height="200"
          autoCompleteType={undefined}
          value={question_text} // Bind the state variable to the Input value
          onChangeText={(text) => setQuestionText(text)}
        />
        {answers.map((answer) => (
          <Button
          style={{ marginTop: 10 }}
            key={answer.id}
            onPress={() => {
              // Add any function you want to execute when this button is pressed
              console.log("Selected answer:", answer.text);
            }}
          >
            {answer.text}
          </Button>
        ))}
        <Button
          onPress={() =>
            router.push({
              pathname: "/add_screens/addAnswerScreen",
              params: { lectureID: lectureID},
            })
          }
          style={{ marginTop: 10 }}
        >
          Pridať Odpoveď
        </Button>
        <Button
        style={{ marginTop: 10 }} 
        onPress={()=>{
            postQuestionWithAnswers(true,question_name,question_text,String(lectureID),answers)
            toast.show({description: "Otázka a odpovede úspešne pridané"})
            addAnswer(null)
            router.back()
        }
        }>
          Odoslať
        </Button>
      </FormControl>
    </Center>
  );
}
