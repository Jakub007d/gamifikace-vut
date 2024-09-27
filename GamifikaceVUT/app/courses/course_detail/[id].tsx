import NavigationPanel from "@/components/navigation/NavigationPanel";
import ScoreBoard from "@/components/scoreboard_ui/scoreboard";
import ScoreboardItem from "@/components/scoreboard_ui/scoreboard_item";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const CourseDetail = () => {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <NavigationPanel course_name={id}></NavigationPanel>
      <View>
        <Text>Hello from {id}</Text>
        <ScoreBoard course_id="" user_id=""></ScoreBoard>
      </View>
      <View style={styles.button}>
        <Button
          title="Štúdium"
          onPress={() =>
            router.push({
              pathname: "/study/lecture/lectureList",
              params: { id: id },
            })
          }
        />
        <Button title="Výzva" />
        <Button title="Pridať otázky" />
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
