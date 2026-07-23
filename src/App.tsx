import { certifications, experiences, personalInfo, skills, projects } from "./data";

import Navbar from "./components/layout/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Certifications from "./components/sections/Certifications";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Hero data={personalInfo} />
      <About />
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      <Certifications certifications={certifications} />
      <Projects projects={projects} />
        <Contact 
        email={personalInfo.email} 
        linkedin={personalInfo.linkedin} 
        github={personalInfo.github} 
      />
       <Footer /> 
    </ThemeProvider>
  );
}

export default App;
