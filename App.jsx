import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import ContactPage from '@/pages/ContactPage';
import AboutPage from '@/pages/AboutPage';
import CameraGuidePage from '@/pages/CameraGuidePage'; 
import RoutingAndSwitchingPage from '@/pages/RoutingAndSwitchingPage.jsx';
import FiberOpticPage from '@/pages/FiberOpticPage.jsx';
import WirelessNetworkingPage from '@/pages/WirelessNetworkingPage.jsx';
import CctvPage from '@/pages/CctvPage.jsx';
import CablingPage from '@/pages/CablingPage.jsx';
import AccessControlPage from '@/pages/AccessControlPage.jsx';
import BookingPage from '@/pages/BookingPage.jsx';
import SubmitReviewPage from '@/pages/SubmitReviewPage';
import { Home, ShieldCheck, Mail, Info, Menu, X, Camera, Router as RouterIcon, Cable, Wifi, ChevronDown, Network, Lock, CalendarCheck, MessageSquarePlus } from 'lucide-react';

const NavLinkItem = ({ link, location, isMobile, closeMobileMenu }) => (
  <Link
    to={link.path}
    onClick={() => isMobile && closeMobileMenu && closeMobileMenu()}
    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out
      ${location.pathname === link.path 
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'}
      ${isMobile ? 'w-full' : ''}
    `}
  >
    {link.icon}
    <span>{link.label}</span>
  </Link>
);

const DropdownMenu = ({ label, icon, items, location, isMobile, closeMobileMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleMouseEnter = () => {
    if (!isMobile) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsOpen(false);
  };
  
  const toggleOpen = () => {
    if (isMobile) setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (!isMobile) setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);


  const isActive = items.some(item => location.pathname === item.path);

  return (
    <div 
      className={`relative ${isMobile ? 'w-full' : ''}`} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
    >
      <button
        onClick={toggleOpen}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out w-full text-left
          ${isActive 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
            : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'}
        `}
      >
        {icon}
        <span>{label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isMobile ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className={`${isMobile ? 'pl-4 mt-1 space-y-1' : 'absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-gray-700 py-1 z-20'}`}
          >
            {items.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  setIsOpen(false);
                  if (isMobile && closeMobileMenu) closeMobileMenu();
                }}
                className={`flex items-center space-x-2 px-3 py-2 text-sm transition-colors duration-150
                  ${location.pathname === item.path 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}
                  ${isMobile ? 'w-full rounded-md' : 'block w-full hover:bg-gray-100 dark:hover:bg-gray-700'}
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const NavLinksContent = ({ isMobile, closeMobileMenu }) => {
  const location = useLocation();
  
  const networkingItems = [
    { path: '/routing-switching', label: 'Routing & Switching', icon: <RouterIcon className="w-5 h-5" /> },
    { path: '/fiber-optic', label: 'Fiber Optic', icon: <Cable className="w-5 h-5" /> },
    { path: '/wireless-networking', label: 'Wireless Networking', icon: <Wifi className="w-5 h-5" /> },
  ];

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/services', label: 'Services', icon: <ShieldCheck className="w-5 h-5" /> },
    { type: 'dropdown', label: 'Networking', icon: <Network className="w-5 h-5" />, items: networkingItems },
    { path: '/camera-guide', label: 'Camera Guide', icon: <Camera className="w-5 h-5" /> },
    { path: '/book-visit', label: 'Book a Visit', icon: <CalendarCheck className="w-5 h-5" /> },
    { path: '/contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> },
    { path: '/about', label: 'About Us', icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <nav className={`flex ${isMobile ? 'flex-col space-y-2 p-4' : 'space-x-1 items-center'}`}>
      {navLinks.map((link) => 
        link.type === 'dropdown' ? (
          <DropdownMenu 
            key={link.label}
            label={link.label}
            icon={link.icon}
            items={link.items}
            location={location}
            isMobile={isMobile}
            closeMobileMenu={closeMobileMenu}
          />
        ) : (
          <NavLinkItem 
            key={link.path}
            link={link}
            location={location}
            isMobile={isMobile}
            closeMobileMenu={closeMobileMenu}
          />
        )
      )}
    </nav>
  );
};

const AppContent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); 
  const companyName = "24/7 LiveView Security Inc.";
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/eebe7dbf-cd09-43fd-9ff6-5da9f6e00bf0/4f183b2e04adcac925bac56774954bc3.jpg";
  const companyPhoneNumber = "+16478700461";
  const companyEmail = "247liveview@gmail.com";

  useEffect(() => {
    const favicon = document.getElementById('favicon');
    if (favicon) {
      favicon.href = logoUrl;
    }
  }, [logoUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-blue-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logoUrl} alt={`${companyName} Logo`} className="h-12 w-12 object-contain rounded-sm" />
              <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500">
                {companyName}
              </span>
            </Link>
            <div className="hidden md:flex items-center">
              <NavLinksContent />
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-md"
            >
              <NavLinksContent isMobile={true} closeMobileMenu={() => setIsMobileMenuOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/cctv" element={<CctvPage />} />
            <Route path="/cabling" element={<CablingPage />} />
            <Route path="/access-control" element={<AccessControlPage />} />
            <Route path="/camera-guide" element={<CameraGuidePage />} />
            <Route path="/routing-switching" element={<RoutingAndSwitchingPage />} />
            <Route path="/fiber-optic" element={<FiberOpticPage />} />
            <Route path="/wireless-networking" element={<WirelessNetworkingPage />} />
            <Route path="/book-visit" element={<BookingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/submit-review" element={<SubmitReviewPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="font-semibold text-lg mb-2">{companyName}</p>
              <p className="text-sm text-gray-400">
                Your trusted partner for professional security and networking solutions.
              </p>
            </div>
            <div>
              <p className="font-semibold text-lg mb-2">Quick Links</p>
              <ul className="space-y-1">
                <li><Link to="/services" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Services</Link></li>
                <li><Link to="/camera-guide" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Camera Guide</Link></li>
                <li className="text-sm text-gray-400">Networking:</li>
                <ul className="pl-4">
                    <li><Link to="/routing-switching" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Routing & Switching</Link></li>
                    <li><Link to="/fiber-optic" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Fiber Optic</Link></li>
                    <li><Link to="/wireless-networking" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Wireless Networking</Link></li>
                </ul>
                <li><Link to="/book-visit" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Book a Visit</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">Contact</Link></li>
                <li><Link to="/submit-review" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center justify-center gap-1">Leave a Review <MessageSquarePlus className="w-4 h-4" /></Link></li>
                <li><Link to="/about" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-lg mb-2">Contact Us</p>
              <p className="text-sm text-gray-400">Email: {companyEmail}</p>
              <p className="text-sm text-gray-400">Phone: {companyPhoneNumber}</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
