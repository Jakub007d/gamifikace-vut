// context/DataContext.tsx
import { Answer } from "@/components/props";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface AnswerContentType {
  answers: Answer[];
  addAnswer: (answer: Answer) => void; // Updated type to add a single Answer
}

// Initialize the context with an empty object
const DataContext = createContext<AnswerContentType | undefined>(undefined);

// Provider component
export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  // Function to add a single answer to the array
  const addAnswer = (answer: Answer) => {
    setAnswers((prevAnswers) => [...prevAnswers, answer]);
  };

  return (
    <DataContext.Provider value={{ answers, addAnswer }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the DataContext
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
