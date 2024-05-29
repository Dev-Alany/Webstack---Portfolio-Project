
import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      grey: {
        100: "#e8e8e8",
        200: "#d1d1d1",
        300: "#bababa",
        400: "#a3a3a3",
        500: "#8c8c8c",
        600: "#737373",
        700: "#5a5a5a",
        800: "#414141",
        900: "#282828",
      },
      primary: {
        100: "#d9d9f2",
        200: "#b3b3e6",
        300: "#8c8cd9",
        600: "#6666cc",
        800: "#4040bf",
        400: "#333399",
        700: "#262673",
        500: "#1a1a4d",
        900: "#0d0d26",
      },
      greenAccent: {
        100: "#e6f9f0",
        200: "#ccf3e1",
        300: "#b3edd3",
        400: "#99e7c4",
        500: "#80e1b6",
        600: "#66c29c",
        700: "#4da383",
        800: "#338469",
        900: "#1a6550",
      },
      redAccent: {
        100: "#f9e6e6",
        200: "#f3cccc",
        300: "#edb3b3",
        400: "#e79999",
        500: "#e18080",
        600: "#b36666",
        700: "#854d4d",
        800: "#563333",
        900: "#291a1a",
      },
      blueAccent: {
        100: "#e6f0f9",
        200: "#cce1f3",
        300: "#b3d1ed",
        400: "#99c2e7",
        500: "#80b3e1",
        600: "#6690b3",
        700: "#4d6d85",
        800: "#334a56",
        900: "#1a2629",
      },
    }
    : {
      grey: {
        100: "#282828",
        200: "#414141",
        300: "#5a5a5a",
        400: "#737373",
        500: "#8c8c8c",
        600: "#a3a3a3",
        700: "#bababa",
        800: "#d1d1d1",
        900: "#e8e8e8",
      },
      primary: {
        100: "#0d0d26",
        200: "#1a1a4d",
        300: "#262673",
        400: "#f0f0f7", // manually changed
        500: "#4040bf",
        600: "#6666cc",
        700: "#8c8cd9",
        800: "#b3b3e6",
        900: "#d9d9f2",
      },
      greenAccent: {
        100: "#1a6550",
        200: "#338469",
        300: "#4da383",
        400: "#66c29c",
        500: "#80e1b6",
        600: "#99e7c4",
        700: "#b3edd3",
        800: "#ccf3e1",
        900: "#e6f9f0",
      },
      redAccent: {
        100: "#291a1a",
        200: "#563333",
        300: "#854d4d",
        400: "#b36666",
        500: "#e18080",
        600: "#e79999",
        700: "#edb3b3",
        800: "#f3cccc",
        900: "#f9e6e6",
      },
      blueAccent: {
        100: "#1a2629",
        200: "#334a56",
        300: "#4d6d85",
        400: "#6690b3",
        500: "#80b3e1",
        600: "#99c2e7",
        700: "#b3d1ed",
        800: "#cce1f3",
        900: "#e6f0f9",
      },
    }),
});

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};
// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#dedcd9",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
        [`@media (max-width:${breakpoints.values.sm}px)`]: {
          fontSize: 30,
        },
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
        [`@media (max-width:${breakpoints.values.sm}px)`]: {
          fontSize: 24,
        },
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
        [`@media (max-width:${breakpoints.values.sm}px)`]: {
          fontSize: 18,
        },
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
        [`@media (max-width:${breakpoints.values.sm}px)`]: {
          fontSize: 16,
        },
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
        [`@media (max-width:${breakpoints.values.sm}px)`]: {
          fontSize: 14,
        },
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
        [`@media (max-width:${breakpoints.values.sm}px)`]: {
          fontSize: 12,
        },
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};