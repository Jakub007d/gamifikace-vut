import NavigationPanel from "@/components/navigation/NavigationPanel";
import ScoreBoard from "@/components/scoreboard_ui/scoreboard";
import ScoreboardItem from "@/components/scoreboard_ui/scoreboard_item";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";

const CourseDetail = () => {
  const { id } = useLocalSearchParams();
  const { name } = useLocalSearchParams();
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View>
        <ScoreBoard course_id="" user_id=""></ScoreBoard>
      </View>
      <View style={styles.button}>
        <Button
          onPress={() =>
            router.push({
              pathname: "/study/lecture/lectureList",
              params: { id: id },
            })
          }
        >
          Štúdium
        </Button>
        <Button>Výzva</Button>
        <Button
          onPress={() =>
            router.push({
              pathname: "/add_screens/addQuestionScreen",
              params: { lectureID: "-1", lectureName: "-1", courseID: id },
            })
          }
        >
          Pridať otázky
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    margin: 10,
    display: "flex",
    gap: 10,
  },
});
export default CourseDetail;
