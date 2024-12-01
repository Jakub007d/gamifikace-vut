import QuizView from "@/components/quiz/quizView";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Pressable, StyleSheet } from "react-native";

async function retrieveUserID(): Promise<string | null> {
  const userID = await AsyncStorage.getItem("user_id");
  console.log("Retrieved user ID:", userID); // Log the value to see if it's valid
  return userID;
}

export default function Chalange() {
  const { id, course_id } = useLocalSearchParams();
  const [userID, setUserID] = useState<string | null>(null); // State for user ID

  // Effect to fetch and set user ID
  useEffect(() => {
    const fetchUserID = async () => {
      const id = await retrieveUserID();
      setUserID(id); // Update state with retrieved user ID
    };
    fetchUserID();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  return (
    <>
      <QuizView
        is_challange={true}
        user_id={String(userID)}
        course_id={String(id)}
      />
    </>
  );
}
