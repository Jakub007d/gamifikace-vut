import React from "react";
import { Flex, VStack, Text, Divider, Avatar } from "native-base";
import { useLocalSearchParams } from "expo-router";
import getInitials from "@/components/functions/getInitials";

export default function userProfile() {
  const { user_id, user_name } = useLocalSearchParams();
  return (
    <VStack space={4} alignItems="center">
      <Flex
        direction="row"
        h="79"
        p="4"
        alignItems="center"
        justifyContent="center"
      >
        <Avatar bg="green.500" mr="1" style={{ height: "100%" }}>
          {getInitials(String(user_name))}
        </Avatar>
        <Divider bg="emerald.500" thickness="2" mx="2" orientation="vertical" />
        <Text>{user_name}</Text>
      </Flex>
      <Divider bg="emerald.500" thickness="2" mx="2" orientation="horizontal" />
      <Text>Odmeny</Text>
      <Flex direction="row" h="58" p="4">
        <Avatar bg="green.500" mr="1">
          RS
        </Avatar>
      </Flex>
      <Divider bg="emerald.500" thickness="2" mx="2" orientation="horizontal" />
      <Text>Štatistiky</Text>
      <Flex direction="column" h="58" p="4">
        <Text>Stats:</Text>
      </Flex>
    </VStack>
  );
}
