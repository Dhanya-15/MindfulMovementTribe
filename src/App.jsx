import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Certifications from "./components/Certifications";
import Experience from "./components/Experience";
import Classes from "./components/Classes";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-body">
      <Navbar />
      <Hero />
      <About />
      <Certifications />
      <Experience />
      <Classes />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
