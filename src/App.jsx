import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Shop from "./Shop";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/shop"
          element={isLoggedIn ? <Shop /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
