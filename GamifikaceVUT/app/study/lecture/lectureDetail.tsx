import CourseDetail from "@/app/courses/course_detail/[id]";
import ComponentWindow from "@/components/ComponentWindow";
import fetchLectureDetails from "@/components/downloaders/fetchLectureDetails";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import styles from "@/components/styles";
import { Button, ButtonText } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "expo-router";

const LectureDetail = () => {
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      // Táto akcia sa vykoná, keď sa užívateľ vráti na túto obrazovku
      // Vyprazdenie kontextu
    }, [])
  );
  const { lectureID, courseID } = useLocalSearchParams();
  console.log(lectureID);
  const { status: lecture_status, data: lecture } = useQuery({
    queryKey: [lectureID],
    queryFn: () =>
      fetchLectureDetails(
        typeof lectureID === "string" ? lectureID : lectureID.join(", ")
      ),
  });
  useEffect(() => {
    navigation.setOptions({
      title:
        lecture_status === "success"
          ? (lecture?.[0]?.name ?? "Default Name")
          : "Loading...",
    });
  }, [navigation, lecture]);
  return (
    <View>
      <ComponentWindow>
        {lecture_status === "success" && <Text>{lecture[0]!.description}</Text>}
        {lecture_status === "pending" && <Text>Loading</Text>}
        {lecture_status === "success" && lecture[0]!.description == "" && (
          <Text>Ešte nebol poskytnutý popis Okruhu</Text>
        )}
      </ComponentWindow>
      <Button
        style={styles.button}
        className="h-12"
        onPress={() =>
          router.push({
            pathname: "/study/lecture/studyCard",
            params: { lectureID: lectureID, lecture_name: lecture![0].name },
          })
        }
      >
        <ButtonText>Pamatove Karty</ButtonText>
      </Button>
      <Button
        className="h-12"
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/study/lecture/quizView",
            params: { lectureID: lectureID },
          })
        }
      >
        <ButtonText>Quiz</ButtonText>
      </Button>
      <Button
        className="h-12"
        style={styles.button}
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
        <ButtonText>Pridať Otázku</ButtonText>
      </Button>
    </View>
  );
};

export default LectureDetail;
