import { View, Text, StyleSheet, Button } from "react-native";
import { Avatar } from "@rneui/themed";
interface ScoreboardItem {
  score: number;
  user_name: string;
}
function getInitials(name: string): string {
  const splitted = name.split(" ");
  const initials = splitted[0][0] + splitted[1][0];
  return initials;
}
const ScoreboardItem = (props: ScoreboardItem) => {
  return (
    <View>
      <View style={styles.score_item}>
        <Avatar
          size={32}
          rounded
          title={getInitials(props.user_name)}
          containerStyle={{ backgroundColor: "gray" }}
        />
        <Text>{props.user_name}</Text>
        <Text>{props.score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  score_item: {
    width: "80%",
    marginHorizontal: "auto",
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "space-between", // Vertikálne vycentrovanie
    alignItems: "center", // Horizontálne vycentrovanie
  },
});
export default ScoreboardItem;
