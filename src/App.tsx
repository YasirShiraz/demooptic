import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home } from './components/Home';
import { Predictions } from './components/Predictions';
import { MatchBulletin } from './components/MatchBulletin';
import { LiveScores } from './components/LiveScores';
import { VIPMembership } from './components/VIPMembership';
import { Community } from './components/Community';
import { News } from './components/News';
import { AdminPanel } from './components/AdminPanel';
import { Navigation } from './components/Navigation';
import { AuthModal } from './components/AuthModal';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Footer } from './components/Footer';
import { InfoBanner } from './components/InfoBanner';
import { Language } from './utils/translations';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVIP, setIsVIP] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  // Handle page changes with scroll to top
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (email: string, password: string) => {
    // Check for admin credentials
    if (email === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setIsAdmin(true);
      setIsVIP(false);
      setShowAuthModal(false);
      handlePageChange('admin');
      return;
    }
    
    // Check for VIP demo credentials
    if (email === 'vip@demo.com' && password === 'vip123') {
      setIsAuthenticated(true);
      setIsAdmin(false);
      setIsVIP(true);
      setShowAuthModal(false);
      return;
    }
    
    // Regular user login (any other credentials)
    setIsAuthenticated(true);
    setIsAdmin(false);
    setIsVIP(false);
    setShowAuthModal(false);
  };

  const handleSignup = (email: string, password: string, name: string) => {
    // Mock signup
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsVIP(false);
    handlePageChange('home');
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const renderPage = () => {
    // Show ads only for authenticated regular users (not VIP, not admin)
    const showAds = isAuthenticated && !isVIP && !isAdmin;
    
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={handlePageChange} showAds={showAds} />;
      case 'predictions':
        return <Predictions isAuthenticated={isAuthenticated} showAds={showAds} />;
      case 'bulletin':
        return <MatchBulletin showAds={showAds} />;
      case 'live':
        return <LiveScores showAds={showAds} />;
      case 'vip':
        return <VIPMembership isAuthenticated={isAuthenticated} openAuthModal={openAuthModal} />;
      case 'community':
        return <Community isAuthenticated={isAuthenticated} openAuthModal={openAuthModal} showAds={showAds} />;
      case 'news':
        return <News showAds={showAds} />;
      case 'admin':
        return isAdmin ? <AdminPanel onLogout={handleLogout} /> : <Home setCurrentPage={handlePageChange} showAds={showAds} />;
      default:
        return <Home setCurrentPage={handlePageChange} showAds={showAds} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {currentPage !== 'admin' && (
        <>
          <Navigation
            currentPage={currentPage}
            setCurrentPage={handlePageChange}
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            isVIP={isVIP}
            onLogout={handleLogout}
            openAuthModal={openAuthModal}
            language={language}
          />
          
          <InfoBanner />
          
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {currentPage !== 'admin' && <Footer setCurrentPage={handlePageChange} language={language} />}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onLogin={handleLogin}
        onSignup={handleSignup}
        setMode={setAuthMode}
        language={language}
      />
    </div>
  );
}