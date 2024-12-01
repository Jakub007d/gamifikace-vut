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
const loginUser = async (user: User): Promise<void> => {
  try {
    const response = await axios.post("https://gamifikace.lol/token/", user, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    });

    // Clear stored tokens
    {
      /*
      await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
    await AsyncStorage.removeItem("user_id");
      */
    }
    // Store tokens using AsyncStorage
    await AsyncStorage.setItem("access_token", response.data.access);
    await AsyncStorage.setItem("refresh_token", response.data.refresh);
    await AsyncStorage.setItem(
      "user_id",
      await fetchUserID(response.data.access)
    );

    // Set default authorization header for axios
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.access}`;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};

const HomePage = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("Heslo123123!");
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
  if (!isTokenSet) {
    return (
      <View style={styles.container}>
        <Button
          onPress={async () => {
            await loginUser({ username, password });
            router.push({
              pathname: "/courses/course_selector/[user_id]",
              params: { user_id: username },
            });
          }}
        >
          Login
        </Button>
      </View>
    );
  } else {
    router.push({
      pathname: "/courses/course_selector/[user_id]",
      params: { user_id: username },
    });
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomePage;
