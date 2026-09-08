import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import FloatingContact from './FloatingContact';
import CookieBanner from './CookieBanner';
import SplashScreen from './SplashScreen';

export default function Layout() {
  return (
    <>
      <SplashScreen />
      <ScrollProgress />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" style={{ minHeight: '100dvh' }}>
        <Outlet />
      </main>
      <FloatingContact />
      <CookieBanner />
      <Footer />
    </>
  );
}
