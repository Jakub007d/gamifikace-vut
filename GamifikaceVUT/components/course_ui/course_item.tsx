import { router } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
interface CourseInfoCardProps {
  course_id: string;
  name: string;
  description: string;
  short_descripstion: string;
  grade: string;
}
function CourseItem(props: CourseInfoCardProps) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/courses/course_detail/[id]",
          params: { id: props.course_id, name: props.name },
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text style={styles.nameText}>{props.name}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text>{props.short_descripstion}</Text>
          <Text>{props.grade}</Text>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Usporiada prvky v riadku (name vľavo, zvyšok vpravo)
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
    flex: 1, // Name zaberá 1 podiel miesta
    justifyContent: "center",
  },
  rightColumn: {
    flex: 2, // Zvyšné texty zaberú 2 podiely miesta
    justifyContent: "center",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default CourseItem;
