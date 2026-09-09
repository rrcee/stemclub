import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import FloatingContact from './FloatingContact';
import CookieBanner from './CookieBanner';
import SplashScreen from './SplashScreen';
import MiniGameModal from './MiniGameModal';

export default function Layout() {
  const location = useLocation();
  const pageRef = useRef(null);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const keySequenceRef = useRef('');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 16, filter: 'blur(3px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.38, ease: 'power2.out' }
      );
    }
  }, [location.pathname]);

  // Global Easter Egg listeners
  useEffect(() => {
    const handleCustomOpen = () => {
      setIsGameOpen(true);
    };

    const handleKeydown = (e) => {
      // Ignore keystrokes inside input / textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      keySequenceRef.current = (keySequenceRef.current + e.key.toLowerCase()).slice(-10);

      // Secret triggers: "stem", "game", "rishi", or "joshua"
      if (
        keySequenceRef.current.endsWith('stem') ||
        keySequenceRef.current.endsWith('game') ||
        keySequenceRef.current.endsWith('rover')
      ) {
        setIsGameOpen(true);
        keySequenceRef.current = '';
      }
    };

    window.addEventListener('open-stem-game', handleCustomOpen);
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('open-stem-game', handleCustomOpen);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <>
      <SplashScreen />
      <ScrollProgress />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" style={{ minHeight: '100dvh' }}>
        <div ref={pageRef} key={location.pathname}>
          <Outlet />
        </div>
      </main>
      <FloatingContact />
      <CookieBanner />
      <Footer />
      <MiniGameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </>
  );
}

