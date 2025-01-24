import CourseItem from "@/components/course_ui/course_item";
import NavigationPanel from "@/components/navigation/NavigationPanel";
import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import { View, Pressable, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useEffect, useLayoutEffect, useState } from "react";
import fetchCourseByID from "@/components/downloaders/fetchCourseByID";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { Course } from "@/components/props";
import {
  Actionsheet,
  Avatar,
  Button,
  Checkbox,
  FlatList,
  HStack,
  Text,
} from "native-base";
import removeVisitedCourse from "@/components/uploaders/removeVisitedCourse";
import uploadVisitedCourse from "@/components/uploaders/addVisitedCourse";
import fetchCourses from "@/components/downloaders/fetchAllCourses";
import getUserNameFromStorage from "@/components/functions/getUserName";
import getInitials from "@/components/functions/getInitials";
import fetchUserName from "@/components/downloaders/userNameDownloader";

const HomePage = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [user_id, setUserID] = useState<string>(""); // State for access token
  const [isOpen, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [visitedCoursesIds, setVisitedCoursesIds] = useState<string[]>([]);

  // Function to retrieve the access token from AsyncStorage
  const retrieveUserID = async () => {
    const userID = await AsyncStorage.getItem("user_id");
    setUserID(String(userID));
  };

  // Use effect to retrieve the access token when the component mounts
  useEffect(() => {
    retrieveUserID();
  }, []);
  const { status: usernStatus, data: user } = useQuery({
    queryKey: ["user"],
    enabled: !!user_id,
    queryFn: () => fetchUserName(user_id!),
  });
  const { status: allCoursesStatus, data: allCourses } = useQuery({
    queryKey: ["allCourses"],
    enabled: !!user_id,
    queryFn: () => fetchCourses(),
  });
  const { status: course_status, data: courses } = useQuery({
    queryKey: ["userCourses"],
    enabled: !!user_id,
    queryFn: () => fetchCourseByID(user_id!),
  });
  useEffect(() => {
    navigation.setOptions({
      title: "Navštevované predmety",
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {usernStatus === "success" && (
            <Pressable
              onPress={() => {
                router.push({
                  pathname: "/user/userProfile",
                  params: { user_id: user_id, user_name: user[0].username },
                });
              }}
            >
              <Avatar bg="green.500" mr="1" style={{ marginRight: 10 }}>
                {getInitials(String(user![0].username))}
              </Avatar>
            </Pressable>
          )}
          {/* Tlačidlo + */}
          <Button
            onPress={() => {
              setOpen(true);
            }}
            color="#000"
          >
            +
          </Button>
        </View>
      ),
    });
  }, [navigation, usernStatus]);
  useEffect(() => {
    if (course_status === "success" && courses) {
      const ids = courses.map((course) => course.id); // Extractovanie id navstevovaných kurzov
      setVisitedCoursesIds(ids);
      setSelectedItems(ids);
    }
  }, [course_status, courses]);
  const toggleSelection = (item: string) => {
    setSelectedItems((prevSelected: string[]) => {
      if (prevSelected.includes(item)) {
        removeVisitedCourse(user_id!, item, queryClient);
        return prevSelected.filter((i) => i !== item);
      } else {
        uploadVisitedCourse(user_id!, item, queryClient);
        return [...prevSelected, item];
      }
    });
  };

  return (
    <View>
      <Actionsheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Actionsheet.Content>
          <Text fontSize="xl" bold mb={4}>
            Vyberte predmety
          </Text>

          <FlatList
            data={allCourses!}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => (
              <HStack
                px={4}
                py={2}
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Text fontSize="md">{item.name}</Text>
                <Checkbox
                  isChecked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelection(item.id)}
                  aria-label={`Select ${item.name}`}
                  value={item.id}
                />
              </HStack>
            )}
          />

          <Button mt={4} onPress={() => setOpen(false)}>
            Potvrdiť výber
          </Button>
        </Actionsheet.Content>
      </Actionsheet>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {!!user_id &&
          course_status === "success" &&
          allCoursesStatus === "success" &&
          courses!.map((course: Course) => (
            <CourseItem
              key={course.id}
              course_id={course.id}
              description={course.full_name}
              name={course.name}
              grade="TBA"
              short_descripstion={course.full_name}
            ></CourseItem>
          ))}
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
