import fetchLecturesForCourse from "@/components/downloaders/fetchLectureForCourse";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import { Okruh } from "@/components/props";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, router, useNavigation } from "expo-router";
import { View, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import getInitials from "@/components/functions/getInitials";
import { Avatar } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";

const LectureList = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { name } = useLocalSearchParams();
  const { user_name } = useLocalSearchParams();

  const { status: lecture_status, data: lectures } = useQuery({
    queryKey: ["lectures", id],
    enabled: !!id,
    queryFn: () => fetchLecturesForCourse(id[0]!),
  });
  useEffect(() => {
    navigation.setOptions({
      title: "Okruhy predmetu " + name,
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
    <View>
      <Box
        style={styles.buttonList}
        className="w-[90%] items-center justify-center  mx-auto flex"
      >
        {!!id && lecture_status === "success" && (
          <>
            {lectures!.map((lecture: Okruh) => (
              <Button
                className="h-12 w-[100%]"
                key={lecture.id}
                onPress={() =>
                  router.push({
                    pathname: "/study/lecture/lectureDetail",
                    params: { lectureID: lecture.id, courseID: id },
                  })
                }
              >
                <ButtonText>{lecture.name}</ButtonText>
              </Button>
            ))}
          </>
        )}
      </Box>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonList: {
    marginTop: 10,
    flexDirection: "column", // Usporiada prvky v riadku (name vľavo, zvyšok vpravo)
    gap: 10,
  },
});
export default LectureList;
