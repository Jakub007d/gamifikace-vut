import { View, StyleSheet, ScrollView } from "react-native";
import ScoreboardItem from "./scoreboard_item";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchScore from "../downloaders/fetchScoreboard";
import { Heading, HStack, Spinner } from "native-base";
import { Text } from "react-native";
interface ScoreBoardProps {
  user_id: string;
  course_id: string;
}
const ScoreBoard = (props: ScoreBoardProps) => {
  const { status, data: scores } = useQuery({
    queryKey: ["score", props.course_id],
    queryFn: () => fetchScore(props.course_id),
  });
  if (status === "success") {
    return (
      <>
        <View style={styles.container}>
          <ScrollView>
            {scores.map((score_1, index) => (
              <>
                <ScoreboardItem
                  score={score_1.points}
                  user_name={score_1.username}
                  user_id={score_1.user}
                  current_user={props.user_id}
                />
              </>
            ))}
          </ScrollView>
        </View>
      </>
    );
  }
  if (status === "pending") {
    return (
      <View style={styles.container}>
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            <Text>Loading</Text>
          </Heading>
        </HStack>
      </View>
    );
  }
  if (status === "error") return <View style={styles.container}></View>;
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
