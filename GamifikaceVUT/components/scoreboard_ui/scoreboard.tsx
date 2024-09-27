import { View, StyleSheet, ScrollView } from "react-native";
import ScoreboardItem from "./scoreboard_item";

interface ScoreBoardProps {
  user_id: string;
  course_id: string;
}
const ScoreBoard = (props: ScoreBoardProps) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ScoreboardItem score={200} user_name="Jakub Podnicinsky" />
        <ScoreboardItem score={198} user_name="Igor Podnicinsky" />
        <ScoreboardItem score={111} user_name="Fero Podnicinsky" />
        <ScoreboardItem score={90} user_name="Peter Podnicinsky" />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    justifyContent: "center", // Vertikálne vycentrovanie
    alignItems: "center", // Horizontálne vycentrovanie
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "gray",
    padding: 5,
  },
});
export default ScoreBoard;
