import { Route, Routes } from 'react-router-dom';
import Services from "./sections/Services";
import Collaboration from "./sections/Collaboration";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Testimonials from "./sections/Testimonials";
import FAQ from "./sections/FAQ";
import CallForm from "./sections/CallForm";
import TermsAndConditions from './pages/TermsAndConditions';

const Home = () => (
  <>
    <Hero />
    <Services />
    <Collaboration />
    <Testimonials />
    <CallForm />
    <FAQ />
  </>
);

const App = () => {
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<TermsAndConditions />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
