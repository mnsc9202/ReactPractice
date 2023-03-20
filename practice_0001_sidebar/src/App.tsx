import { ThemeProvider } from "@mui/material";
import "./App.css";
import MainPage from "./pages/mainPage";
import { theme } from "./style/Appstyle";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MainPage />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
