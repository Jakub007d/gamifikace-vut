import { Text, View } from "react-native";
import {
  Center,
  Square,
  Circle,
  Input,
  FormControl,
  WarningOutlineIcon,
  TextArea,
  Toast,
  HStack,
  Switch,
  VStack,
  CheckIcon,
  Spinner,
} from "native-base";
import { Button } from "native-base";
import { Select } from "native-base";
import { useToast } from "native-base";
import { useData } from "./addQuestionScreenComponents/answers_context";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import postQuestionWithAnswers from "@/components/uploaders/uploadQuestion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Answer, Okruh } from "@/components/props";
import { useQuery } from "@tanstack/react-query";
import fetchLecturesForCourse from "@/components/downloaders/fetchLectureForCourse";

export default function addQuestionScreen() {
  const navigation = useNavigation();

  const { answers, addAnswer } = useData();
  const { lectureID, lectureName, courseID } = useLocalSearchParams();
  const [selectedLectureID, setSelectedLectureID] = useState("");
  const [question_name, setQuestionName] = useState("");
  const [question_text, setQuestionText] = useState("");
  const toast = useToast();
  const [question_pos, setQuestionPos] = useState(0);
  const { status: lecture_status, data: lectures } = useQuery({
    queryKey: ["lectures", courseID],
    enabled: !!courseID,
    queryFn: () => fetchLecturesForCourse(courseID[0]!),
  });
  const [answers_v2, setAnswers_v2] = useState<Answer[]>([
    {
      id: "",
      text: "",
      answer_type: false,
      question: "",
    },
  ]);
  const handleAddAnswer = () => {
    setAnswers_v2((prevAnswers) => [
      ...prevAnswers,
      {
        id: "",
        text: "",
        answer_type: false,
        question: "",
      },
    ]);
  };
  const handleOnAnswerNameChange = (text: string, index: number) => {
    const updatedAnswers = [...answers_v2];
    updatedAnswers[index].text = text;
    setAnswers_v2(updatedAnswers);
  };
  const handleOnAnswerTypeChange = (type: boolean, index: number) => {
    const updatedAnswers = [...answers_v2];
    updatedAnswers[index].answer_type = type;
    setAnswers_v2(updatedAnswers);
  };
  //TODO FIX THIS YOU STUPIT HUMAN
  useEffect(() => {
    if (lecture_status === "success" && lectures && lectures.length > 0) {
      if (lectureID !== "-1" && lectureID) {
        setSelectedLectureID(String(lectureID));
      } else {
        const defaultLecture = lectures.find((lecture) => lecture.available);
        if (defaultLecture) {
          setSelectedLectureID(defaultLecture.id);
        }
      }
    }
  }, [lecture_status, lectures, lectureID]);
  useEffect(() => {
    navigation.setOptions({
      title: "Pridavanie otázky",
    });
  }, [navigation]);

  return (
    <Center>
      {lecture_status === "success" && (
        <Select
          selectedValue={selectedLectureID}
          minWidth="200"
          placeholder="Vyber okruh"
          onValueChange={(value) => setSelectedLectureID(value)}
          _selectedItem={{
            bg: "primary.300",
            endIcon: <CheckIcon size="5" />,
          }}
        >
          {lectures.map((lecture) => (
            <Select.Item
              key={lecture.id}
              label={lecture.name} // Displays the lecture name
              value={String(lecture.id)} // Sets the lecture ID
              isDisabled={!lecture.available} // Disables if not available
            />
          ))}
        </Select>
      )}
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
        <View>
          <VStack>
            <HStack space="60%">
              <Text>Odpovede</Text>
              <Text>Je správna</Text>
            </HStack>

            {answers_v2.map((answer, index) => (
              <>
                <HStack alignItems="center">
                  <Input
                    placeholder="Odpoveď"
                    w="80%"
                    value={answer.text}
                    onChangeText={(text) =>
                      handleOnAnswerNameChange(text, index)
                    }
                  />
                  <Switch
                    size="m"
                    style={{ paddingTop: -15, paddingLeft: 10 }}
                    isChecked={answer.answer_type} // Bind the switch state to the answer_type boolean
                    onChange={(value) =>
                      handleOnAnswerTypeChange(value.nativeEvent.value, index)
                    }
                  />
                </HStack>
              </>
            ))}
            <Button
              variant="unstyled"
              style={{
                marginTop: 10,
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: "transparent",
              }}
              _text={{
                color: "black", // Text color
                fontSize: "lg", // Adjust text size if needed
              }}
              onPress={handleAddAnswer}
            >
              +
            </Button>
          </VStack>
        </View>
        {answers.map((answer) => (
          <Button
            style={{ marginTop: 10 }}
            key={answer.id}
            onPress={() => {
              console.log(answer.id);
              router.push({
                pathname: "/add_screens/addAnswerScreen",
                params: { answerID: answer.id, settingNewValue: "false" },
              });
            }}
          >
            {answer.text}
          </Button>
        ))}
        {/*
        <Button
          onPress={() => {
            setQuestionPos(question_pos + 1);
            router.push({
              pathname: "/add_screens/addAnswerScreen",
              params: { answerID: question_pos, settingNewValue: "true" },
            });
          }}
          style={{ marginTop: 10 }}
        >
          Pridať Odpoveď
        </Button>
        */}
        <Button
          style={{ marginTop: 10 }}
          onPress={() => {
            postQuestionWithAnswers(
              true,
              question_name,
              question_text,
              String(selectedLectureID),
              answers_v2
            );
            toast.show({ description: "Otázka a odpovede úspešne pridané" });
            //addAnswer(null);
            router.back();
          }}
        >
          Odoslať
        </Button>
      </FormControl>
    </Center>
  );
}
