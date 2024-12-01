import NavigationPanel from "@/components/navigation/NavigationPanel";
import ScoreBoard from "@/components/scoreboard_ui/scoreboard";
import ScoreboardItem from "@/components/scoreboard_ui/scoreboard_item";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CourseDetail = () => {
  const [user_id, setUserID] = useState<string | null>(null); // State for access token
  const { id } = useLocalSearchParams();
  const { name } = useLocalSearchParams();
  const retrieveUserID = async () => {
    const userID = await AsyncStorage.getItem("user_id");
    setUserID(userID);
  };
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View>
        <ScoreBoard
          course_id={String(id)}
          user_id={String(user_id)}
        ></ScoreBoard>
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
        <Button
          onPress={() =>
            router.push({
              pathname: "/challenge",
              params: { id: String(id) },
            })
          }
        >
          Výzva
        </Button>
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
