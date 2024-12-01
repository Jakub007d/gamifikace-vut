import fetchLecturesForCourse from "@/components/downloaders/fetchLectureForCourse";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import { Okruh } from "@/components/props";
import { Button } from "native-base";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, router } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

const LectureList = () => {
  const { id } = useLocalSearchParams();
  const { status: lecture_status, data: lectures } = useQuery({
    queryKey: ["lectures", id],
    enabled: !!id,
    queryFn: () => fetchLecturesForCourse(id[0]!),
  });
  return (
    <View>
      <View style={{ marginHorizontal: "auto", padding: 10 }}>
        <Text>{id}</Text>
      </View>

      <View style={styles.buttonList}>
        {!!id && lecture_status === "success" && (
          <>
            {lectures!.map((lecture: Okruh) => (
              <Button
                style={styles.buttonList}
                key={lecture.id}
                onPress={() =>
                  router.push({
                    pathname: "/study/lecture/lectureDetail",
                    params: { lectureID: lecture.id, courseID: id },
                  })
                }
              >
                {lecture.name}
              </Button>
            ))}
          </>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonList: {
    flexDirection: "column", // Usporiada prvky v riadku (name vľavo, zvyšok vpravo)
    gap: 10,
  },
});
export default LectureList;
