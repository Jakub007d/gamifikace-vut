import { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

interface StudyCardWindowInterface {
  question: string;
  answer: string;
  answer_shown: boolean;
  setShown: () => void;
}

const StudyCardWindow = (props: StudyCardWindowInterface) => {
  return (
    <Pressable onPress={() => props.setShown()}>
      <View style={styles.container}>
        {props.answer_shown && <Text>{props.answer}</Text>}
        {!props.answer_shown && <Text>{props.question}</Text>}
      </View>
    </Pressable>
  );
};

export default StudyCardWindow;
const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    justifyContent: "center", // Vertikálne vycentrovanie
    alignItems: "center", // Horizontálne vycentrovanie
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "gray",
    padding: 5,
  },
});
