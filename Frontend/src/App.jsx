import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Player from "./pages/Player/Player";

function App() {
  return (
    <Routes>
      {/* Default → open Login/Signup first */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth page */}
      <Route path="/login" element={<Login />} />

      {/* Home page */}
      <Route path="/home" element={<Home />} />
      <Route path="/player/:id" element={<Player />} />
    </Routes>
  );
}

export default App;