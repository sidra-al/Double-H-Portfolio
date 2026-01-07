// src/App.jsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PartnersSlider from "./components/PartnersSlider";
import CreativeShowcase from "./components/CreativeShowcase"; // Welcome Section
import ServicesSection from "./components/ServicesSection";   // ✅ Services Section
import ProjectsSection from "./components/ProjectsSection";   // ✅ Projects Section
import Footer from "./components/Footer";                     // ✅ Footer Section

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Partners Slider Section */}
      <PartnersSlider />

      {/* Welcome Section */}
      <section id="creative-showcase">
        <CreativeShowcase />
      </section>

      {/* Services Section */}
      <section id="services">
        <ServicesSection />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <ProjectsSection />
      </section>

      {/* ✅ Footer Section */}
      <Footer />
    </div>
  );
}

export default App;