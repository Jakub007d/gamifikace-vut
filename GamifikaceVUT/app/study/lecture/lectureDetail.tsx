import CourseDetail from "@/app/courses/course_detail/[id]";
import ComponentWindow from "@/components/ComponentWindow";
import fetchLectureDetails from "@/components/downloaders/fetchLectureDetails";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import { Button } from "@rneui/base";
import { useQuery } from "@tanstack/react-query";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { View, Text } from "react-native";

const LectureDetail = () => {
  useFocusEffect(
    useCallback(() => {
      // Táto akcia sa vykoná, keď sa užívateľ vráti na túto obrazovku
      // Vyprazdenie kontextu
    }, [])
  );
  const { lectureID, courseID } = useLocalSearchParams();
  const { status: lecture_status, data: lecture } = useQuery({
    queryKey: [lectureID],
    queryFn: () =>
      fetchLectureDetails(
        typeof lectureID === "string" ? lectureID : lectureID.join(", ")
      ),
  });
  return (
    <View>
      <ComponentWindow>
        {lecture_status === "success" && <Text>{lecture[0]!.description}</Text>}
        {lecture_status === "pending" && <Text>Loading</Text>}
      </ComponentWindow>
      <Button
        onPress={() =>
          router.push({
            pathname: "/study/lecture/studyCard",
            params: { lectureID: lectureID },
          })
        }
      >
        Pamatove Karty
      </Button>
      <Button
        onPress={() =>
          router.push({
            pathname: "/study/lecture/quizView",
            params: { lectureID: lectureID },
          })
        }
      >
        Quiz
      </Button>
      <Button
        onPress={() =>
          router.push({
            pathname: "/add_screens/addQuestionScreen",
            params: {
              lectureID: lectureID,
              lectureName: lecture![0].name,
              courseID: courseID,
            },
          })
        }
      >
        Pridať Otázku
      </Button>
    </View>
  );
};

export default LectureDetail;
