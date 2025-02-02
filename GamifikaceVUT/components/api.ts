import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
const API_URL = "https://gamifikace.lol"; // Sem daj svoju API adresu

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000, // 5 sekúnd timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Automaticky pridá token do hlavičky
api.interceptors.request.use(async (config) => {
  const token = await getAuthToken(); // Funkcia na získanie tokenu (napr. z AsyncStorage)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funkcia na získanie tokenu
const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("access_token");
  } catch (error) {
    console.error("Error loading auth token", error);
    return null;
  }
};

export default api;