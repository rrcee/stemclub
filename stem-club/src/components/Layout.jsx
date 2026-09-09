import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import FloatingContact from './FloatingContact';
import CookieBanner from './CookieBanner';
import SplashScreen from './SplashScreen';

export default function Layout() {
  const location = useLocation();
  const pageRef = useRef(null);

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
    </>
  );
}
