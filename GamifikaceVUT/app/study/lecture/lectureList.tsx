import NavigationPanel from "@/components/navigation/NavigationPanel";
import { Button } from "@rneui/base";
import { useLocalSearchParams, router } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

const LectureList = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <NavigationPanel course_name={id}></NavigationPanel>
      <View style={{ marginHorizontal: "auto", padding: 10 }}>
        <Text>{id}</Text>
      </View>

      <View style={styles.buttonList}>
        <Button
          onPress={() =>
            router.push({
              pathname: "/study/lecture/studyCard",
              params: { id: "DvojnyIntegral" },
            })
          }
        >
          Dvojný Integrál
        </Button>
        <Button>Trojný Integrál</Button>
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
