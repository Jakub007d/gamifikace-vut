import CourseItem from "@/components/course_ui/course_item";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import { Link, router, useLocalSearchParams } from "expo-router";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
const HomePage = () => {
  const { user_id } = useLocalSearchParams();
  return (
    <View>
      <NavigationPanel course_name={""}></NavigationPanel>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Ahoj {user_id}</Text>
        <CourseItem
          course_id="IMA1"
          description="Matematická Analýza 1"
          grade="2BIT"
          name="IMA1"
          short_descripstion="Matematická Analýza 1"
        />
        <CourseItem
          course_id="IMA2"
          description="Matematická Analýza 2"
          grade="2BIT"
          name="IMA2"
          short_descripstion="Matematická Analýza 2"
        />
        <Link href={"/courses/course_detail/IMA1" as const}>IMA1</Link>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Usporiada prvky v riadku (name vľavo, zvyšok vpravo)
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  leftColumn: {
    flex: 1, // Name zaberá 1 podiel miesta
    justifyContent: "center",
  },
  rightColumn: {
    flex: 2, // Zvyšné texty zaberú 2 podiely miesta
    justifyContent: "center",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default HomePage;
