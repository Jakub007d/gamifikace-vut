import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

import { View, Text } from "react-native";
import { API_URL } from "@/components/constants";

const SumaryView = () => {
  const { score, bad, lectureID } = useLocalSearchParams(); // Hook musí byť vnútri komponenty
  const [token, setToken] = useState("");
  const [isLectureCompleted, setIsLectureCompleted] = useState(false);

  // Funkcia na načítanie tokenu
  const retrieveToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("access_token");
      if (userToken) {
        setToken(userToken);
        console.log(userToken);
      } else {
        alert("Chyba pri získavaní tokenu.");
      }
    } catch (error) {
      console.error("Chyba pri získavaní tokenu:", error);
    }
  };

  // Funkcia na dokončenie okruhu
  const handleCompleteLecture = async (accessToken: string) => {
    try {
      const response = await axios.post(
        API_URL + `/lecture/${String(lectureID)}/complete/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setIsLectureCompleted(true);
        alert(response.data.message);
      } else {
        alert("Neočakávaná odpoveď");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(
          `Error: ${
            error.response?.data?.message || "An unknown error occurred"
          }`
        );
      } else {
        alert("Error: Unable to complete the lecture.");
      }
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await retrieveToken();
    };
    initialize();
  }, []);

  useEffect(() => {
    if (token && !isLectureCompleted) {
      handleCompleteLecture(token);
    }
  }, [token]);

  if (Number(String(bad)) > 0 || Number(String(score)) === 0)
    return (
      <>
        <Text>
          Mal si viacej ako jednu nesprávnu odpoved. Skús to znovu aby si
          dokončil okruh úspešne.
        </Text>
        <Text>Počet nesprávnych odpovedí: {bad}</Text>
      </>
    );
  else
    return (
      <View>
        <Text>
          Skore je: {score} {bad}
        </Text>
      </View>
    );
};

export default SumaryView;
