import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import VideoListPage from "./pages/videoListPage";
import VideoPlayPage from "./pages/videoPlayPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VideoListPage />} />
        <Route path="/videoPlay" element={<VideoPlayPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
