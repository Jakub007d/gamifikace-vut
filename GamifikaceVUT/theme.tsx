// theme.js
import { extendTheme } from "native-base";

// Definuj farebnú paletu s tyrkysovými a modrými odtieňmi
const customTheme = extendTheme({
  colors: {
    primary: {
      50: "#e0f7fa", // svetlý tyrkysový odtieň
      100: "#b2ebf2",
      200: "#80deea",
      300: "#4dd0e1", // svetlo modrý
      400: "#26c6da",
      500: "#00bcd4", // hlavná tyrkysová farba
      600: "#00acc1",
      700: "#0097a7",
      800: "#00838f",
      900: "#006064", // tmavý odtieň modrej
    },
    secondary: {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3", // hlavná modrá farba
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
    },
    // Pridaj ďalšie farby, ak ich potrebuješ
  },
  // Môžeš pridať aj ďalšie vlastné nastavenia
});

export default customTheme;
