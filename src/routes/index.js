import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";

export default function index() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route index element={<Home />} />
      </Routes>
    </>
  );
}
