import { View, StyleSheet, ScrollView } from "react-native";
import ScoreboardItem from "./scoreboard_item";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchScore from "../downloaders/fetchScoreboard";
import { Heading, HStack, Spinner } from "native-base";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import React from "react";
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
        <Box className="bg-gray-200 p-4 rounded-lg w-9/10 mx-auto min-w-[90%] mt-5">
          <Center>
            <Text size="2xl" bold>
              Rebríček
            </Text>
          </Center>
          <VStack>
            {scores.map((score_1, index) => {
              if (
                index <= 2 ||
                String(score_1.user) === String(props.user_id)
              ) {
                return (
                  <ScoreboardItem
                    key={index}
                    score={score_1.points}
                    user_name={score_1.username}
                    user_id={score_1.user}
                    current_user={props.user_id}
                    possition={String(index + 1) + "."}
                  />
                );
              }
              return null;
            })}
          </VStack>
          <Button>
            <Text className="text-white" size="lg">
              Detail
            </Text>
          </Button>
        </Box>
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
