import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signUp";
import Update from "./pages/update";
import Delete from "./pages/delete";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Signup" element={<Signup />} />
        <Route exact path="/update" element={<Update />} />
        <Route exact path="/delete" element={<Delete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
