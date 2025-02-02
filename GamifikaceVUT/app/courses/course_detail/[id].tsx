import NavigationPanel from "@/components/navigation/NavigationPanel";
import ScoreBoard from "@/components/scoreboard_ui/scoreboard";
import ScoreboardItem from "@/components/scoreboard_ui/scoreboard_item";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import getInitials from "@/components/functions/getInitials";

const CourseDetail = () => {
  const navigation = useNavigation();
  const [user_id, setUserID] = useState<string | null>(null); // State for access token
  const { id } = useLocalSearchParams();
  const { name } = useLocalSearchParams();
  const { user_name } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const retrieveUserID = async () => {
    const userID = await AsyncStorage.getItem("user_id");
    setUserID(userID);
  };
  useFocusEffect(
    useCallback(() => {
      retrieveUserID();
      queryClient.invalidateQueries({
        queryKey: ["score", id],
      });
      return () => {};
    }, [id, queryClient]) // Dependencies
  );
  useEffect(() => {
    navigation.setOptions({
      title: "Detail predmetu " + name,
      headerRight: () => (
        <Avatar size="md">
          <Text size="lg" className="text-white">
            {getInitials(String(user_name))}
          </Text>
        </Avatar>
      ),
    });
  }, [navigation]);
  return (
    <>
      <VStack className="flex flex-col h-full">
        <View className="mb-auto">
          <ScoreBoard
            course_id={String(id)}
            user_id={String(user_id)}
          ></ScoreBoard>
        </View>
        <View style={styles.button} className="mb-auto">
          <Button
            className="h-12"
            onPress={() =>
              router.push({
                pathname: "/study/lecture/lectureList",
                params: { id: id, name: name, user_name: user_name },
              })
            }
          >
            <ButtonText>Štúdium</ButtonText>
          </Button>
          <Button
            onPress={() =>
              router.push({
                pathname: "/challenge",
                params: { id: String(id) },
              })
            }
            className="h-12"
          >
            <ButtonText>Výzva</ButtonText>
          </Button>
          <Button
            className="h-12"
            onPress={() =>
              router.push({
                pathname: "/add_screens/addQuestionScreen",
                params: { lectureID: "-1", lectureName: "-1", courseID: id },
              })
            }
          >
            <ButtonText>Pridať otázku</ButtonText>
          </Button>
        </View>
      </VStack>
    </>
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
