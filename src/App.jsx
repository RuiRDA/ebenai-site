import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TermsAndConditions from "./pages/TermsAndConditions";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/terms" element={<div className="pt-[5rem] min-h-screen"><Navbar /><TermsAndConditions /><Footer /></div>} />
    <Route path="*" element={<LandingPage />} />
  </Routes>;
}
