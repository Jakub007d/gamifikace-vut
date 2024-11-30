import CourseItem from "@/components/course_ui/course_item";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import { Link, router, useLocalSearchParams } from "expo-router";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useEffect, useLayoutEffect, useState } from "react";
import fetchCourseByID from "@/components/downloaders/fetchCourseByID";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { Course } from "@/components/props";

const HomePage = () => {
  const [user_id, setUserID] = useState<string | null>(null); // State for access token

  // Function to retrieve the access token from AsyncStorage
  const retrieveUserID = async () => {
    const userID = await AsyncStorage.getItem("user_id");
    setUserID(userID);
  };

  // Use effect to retrieve the access token when the component mounts
  useEffect(() => {
    retrieveUserID();
  }, []);
  const { status: course_status, data: courses } = useQuery({
    queryKey: ["coursesByID"],
    enabled: !!user_id,
    queryFn: () => fetchCourseByID(user_id!),
  });
  return (
    <View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {!!user_id && course_status === "success" && (
          <>
            {courses!.map((course: Course) => (
              <CourseItem
                key={course.id}
                course_id={course.id}
                description={course.full_name}
                name={course.name}
                grade="TBA"
                short_descripstion={course.full_name}
              ></CourseItem>
            ))}
          </>
        )}
        {/* Display the access token retrieved from AsyncStorage */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
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
    flex: 1,
    justifyContent: "center",
  },
  rightColumn: {
    flex: 2,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default HomePage;
