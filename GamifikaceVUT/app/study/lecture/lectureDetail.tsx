import ComponentWindow from "@/components/ComponentWindow";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import { Button } from "@rneui/base";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const LectureDetail = () => {
  const { lectureID, courseID } = useLocalSearchParams();

  return (
    <View>
      <NavigationPanel course_name={courseID}></NavigationPanel>
      <ComponentWindow>
        <Text>Text about lecture</Text>
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
      <Button>Quiz</Button>
    </View>
  );
};

export default LectureDetail;
