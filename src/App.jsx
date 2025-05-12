import Services from "./sections/Services";
import Collaboration from "./sections/Collaboration";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
// import Pricing from "./sections/Pricing";
import Roadmap from "./sections/Roadmap";
// import Features from "./sections/Features";
import Testimonials from "./sections/Testimonials";
import FAQ from "./sections/FAQ";
import ContactForm from "./sections/ContactForm";

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Navbar />
        <Hero />
        <Services />
        <Collaboration />
        {/* <Features /> */}
        {/* <Pricing /> */}
        <Testimonials />
        <Roadmap />
        <ContactForm />
        <FAQ />
        <Footer />
      </div>
    </>
  );
};

export default App;
