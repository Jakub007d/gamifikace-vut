import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { Box } from "./ui/box";

type ComponentWindowProps = {
  children: ReactNode;
};

const ComponentWindow = ({ children }: ComponentWindowProps) => {
  return (
    <Box className="bg-gray-200 p-4 rounded-lg w-9/10 mx-auto min-w-[90%] min-h-[40%] mt-5 flex items-center justify-center">
      {children}
    </Box>
  );
};

export default ComponentWindow;
