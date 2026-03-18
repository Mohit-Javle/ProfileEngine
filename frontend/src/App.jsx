import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/get-one`);
        const user = await response.json();
        setUserId(user._id);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing userId={userId} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
