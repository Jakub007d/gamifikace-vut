import React, { useEffect } from "react";
import { Flex, VStack, Text, Divider, Avatar, HStack, Icon } from "native-base";
import { useLocalSearchParams } from "expo-router";
import getInitials from "@/components/functions/getInitials";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchAchievements from "@/components/downloaders/fetchUserAchivements";
import { Achievement } from "@/components/props";

export default function userProfile() {
  const { user_id, user_name } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const { status: achievements_status, data: achievements } = useQuery({
    queryKey: ["achievments", user_id],
    queryFn: () => fetchAchievements(String(user_id)),
  });
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["achievments", user_id],
    });
  });
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
        <Text>
          {user_name}
          {user_id}
        </Text>
      </Flex>
      <Divider bg="emerald.500" thickness="2" mx="2" orientation="horizontal" />
      <Text>Odmeny</Text>
      {achievements_status === "success" && (
        <>
          {achievements.map((achievement: Achievement) => (
            <HStack key={achievement.id} space={3} alignItems="center" mb={3}>
              {/* Ikona pre achievement */}
              <Icon as={<Icon name="trophy" />} size={6} color="yellow.400" />
              {/* Názov achievementu */}
              <Text fontSize="lg" fontWeight="bold">
                {achievement.name}
              </Text>
            </HStack>
          ))}
        </>
      )}
      {achievements_status === "pending" && (
        <>
          <Text>Nacitavam</Text>
        </>
      )}
      {achievements_status === "error" && (
        <>
          <Text>Cele sle</Text>
        </>
      )}
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
