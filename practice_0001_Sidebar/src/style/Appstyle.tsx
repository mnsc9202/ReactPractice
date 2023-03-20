import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    custom: Palette["primary"];
  }
  interface PaletteOptions {
    custom: PaletteOptions["primary"];
  }
  interface PaletteColor {
    text?: string;
  }
  interface SimplePaletteColorOptions {
    text?: string;
  }
}

// Custom 테마 (전체 스타일 적용)
export const theme = createTheme({
  palette: {
    primary: {
      main: "#2E4F4F",
    },
    secondary: {
      main: "#BBD6B8",
    },
    custom: {
      main: "#fff",
      text: "#40513B",
    },
  },
});
