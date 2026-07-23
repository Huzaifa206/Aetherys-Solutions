import Cursor from '@/components/Cursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import AIShowcase from '@/components/AIShowcase';
import Process from '@/components/Process';
import CaseStudies from '@/components/CaseStudies';
import Founders from '@/components/Founders';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <AIShowcase />
        <Process />
        <CaseStudies />
        <Founders />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
