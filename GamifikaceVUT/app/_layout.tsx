import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";
import customTheme from "@/theme";
import { DataProvider } from "./add_screens/addQuestionScreenComponents/answers_context";

// Create a Query Client
const queryClient = new QueryClient();

const Layout = () => {
  return (
    <NativeBaseProvider theme={customTheme}>
      <DataProvider>
        <QueryClientProvider client={queryClient}>
          <Stack />
        </QueryClientProvider>
      </DataProvider>
    </NativeBaseProvider>
  );
};

export default Layout;
