import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Footer, Navbar } from "./components";

function App() {
  return (
    <div>
      <Navbar />

      <Footer />
    </div>
  );
}

export default App;
