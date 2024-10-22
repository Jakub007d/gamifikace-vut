import { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

interface StudyCardWindowInterface {
  question: string;
  answer: string | string[];
  answer_shown: boolean;
  setShown: () => void;
}

const StudyCardWindow = (props: StudyCardWindowInterface) => {
  return (
    <Pressable onPress={() => props.setShown()}>
      <View style={styles.container}>
        {props.answer_shown && (
          <View>
            {Array.isArray(props.answer) ? (
              props.answer.map((ans, index) => (
                <Text key={index} style={{ paddingBottom: 10 }}>
                  {index + 1}. {ans}
                </Text>
              ))
            ) : (
              <Text>{props.answer}</Text>
            )}
          </View>
        )}

        {!props.answer_shown && <Text>{props.question}</Text>}
      </View>
    </Pressable>
  );
};

export default StudyCardWindow;
const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    padding: 10,
    justifyContent: "center", // Vertikálne vycentrovanie
    alignItems: "center", // Horizontálne vycentrovanie
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "gray",
  },
});
