import { View, Text, StyleSheet, Button } from "react-native";
import { Avatar } from "@rneui/themed";
import getInitials from "../functions/getInitials";
interface ScoreboardItem {
  score: number;
  user_name: string;
  user_id: string;
  current_user: string;
}
const ScoreboardItem = (props: ScoreboardItem) => {
  return (
    //TODO Fix focus
    <View
      style={[
        props.current_user === props.user_id && { backgroundColor: "green" },
      ]}
    >
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
