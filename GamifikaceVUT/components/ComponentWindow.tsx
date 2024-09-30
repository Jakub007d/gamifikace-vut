import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

type ComponentWindowProps = {
  children: ReactNode;
};

const ComponentWindow = ({ children }: ComponentWindowProps) => {
  return <View style={styles.container}>{children}</View>;
};

export default ComponentWindow;
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
