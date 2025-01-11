import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  Center,
  Icon,
  Input,
  Pressable,
  Spinner,
  Stack,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { loginUser } from "./loginScript";
import { router } from "expo-router";
interface User {
  username: string;
  password: string;
}

interface TokenResponse {
  access: string; // Change based on your API response
  refresh: string; // Change based on your API response
}

const login = () => {
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
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
  async function handleLogin(user: User) {
    setLoading(true);
    try {
      const result = await loginUser(user);

      if (result) {
        router.push({
          pathname: "/courses/course_selector/[user_id]",
          params: { user_id: username },
        });
      } else {
        setLoading(false);
        toast.show({ description: "Zle zadané údaje" });
      }
    } catch (error) {
      setLoading(false);
      toast.show({ description: "Chyba prihlásenia" });
    }
  }
  return (
    <Center flex={1} bg="white">
      {" "}
      {/* Centers content vertically and horizontally */}
      <Stack space={4} w="100%" alignItems="center">
        <Input
          w={{
            base: "75%",
            md: "25%",
          }}
          value={username}
          onChangeText={(text) => setUsername(text)}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="person" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Meno"
        />
        <Input
          w={{
            base: "75%",
            md: "25%",
          }}
          value={password}
          onChangeText={(text) => setPassword(text)}
          type={show ? "text" : "password"}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          placeholder="Heslo"
        />
        {isLoading ? (
          <Spinner color="blue.500" size="lg" /> // Adjust the size and color as needed
        ) : (
          <Button
            w="75%"
            onPress={() =>
              handleLogin({ username: username, password: password })
            }
          >
            Prihlásiť sa
          </Button>
        )}
      </Stack>
    </Center>
  );
};
export default login;
