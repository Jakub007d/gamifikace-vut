import CourseItem from "@/components/course_ui/course_item";
import NavigationButton from "@/components/navigation/NavigationButton";
import axios from "axios";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import fetchUserID from "@/components/downloaders/fetchUserID";
import { QueryClient } from "@tanstack/react-query";
import { Button } from "native-base";

interface User {
  username: string;
  password: string;
}

interface TokenResponse {
  access: string; // Change based on your API response
  refresh: string; // Change based on your API response
}
const queryClient = new QueryClient();
const [isLoggedIn, setIsLoggedIn] = useState(false);
useEffect(() => {
  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem("isLoggedIn");
      if (value !== null) {
        setIsLoggedIn(true); // Parse the value if it was stored as a string
      }
    } catch (error) {
      console.error("Error reading value from AsyncStorage:", error);
    }
  };

  checkLoginStatus();
}, []);
const HomePage = () => {
  const [isTokenSet, setIsTokenSet] = useState(false); // Track if token is set
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          setIsTokenSet(true);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    checkToken();
  }, []);
  return (
    <View style={styles.container}>
      <Button
        onPress={async () => {
          router.push({
            pathname: "/login/login",
          });
        }}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomePage;
