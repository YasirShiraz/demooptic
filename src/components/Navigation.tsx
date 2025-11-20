import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, Target, FileText, Radio, Crown, MessageSquare, Newspaper, Settings } from 'lucide-react';
import { t, Language } from '../utils/translations';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isVIP?: boolean;
  onLogout: () => void;
  openAuthModal: (mode: 'login' | 'signup') => void;
  language: Language;
}

export function Navigation({
  currentPage,
  setCurrentPage,
  isAuthenticated,
  isAdmin,
  isVIP,
  onLogout,
  openAuthModal,
  language
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('home', language), icon: Home },
    { id: 'predictions', label: t('predictions', language), icon: Target },
    { id: 'bulletin', label: t('bulletin', language), icon: FileText },
    { id: 'live', label: t('live', language), icon: Radio },
    { id: 'community', label: t('community', language), icon: MessageSquare },
    { id: 'news', label: t('news', language), icon: Newspaper },
  ];

  // Only show VIP page to non-VIP users (VIP members already have access)
  if (!isVIP) {
    navItems.splice(4, 0, { id: 'vip', label: t('vip', language), icon: Crown });
  }

  if (isAdmin) {
    navItems.push({ id: 'admin', label: t('admin', language), icon: Settings });
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-amber-500/20"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage('home')}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500 blur-xl opacity-50 rounded-full" />
                <Crown className="w-8 h-8 text-amber-500 relative" />
              </div>
              <span className="text-2xl bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
                OptikGoal
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all relative ${
                      isActive
                        ? 'text-amber-500'
                        : 'text-gray-300 hover:text-amber-500'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-amber-500/10 rounded-lg border border-amber-500/30"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className="w-5 h-5 relative" />
                    <span className="relative">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* VIP Badge */}
              {isVIP && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg shadow-purple-500/50"
                >
                  <Crown className="w-5 h-5 text-white animate-pulse" />
                  <span className="text-white">VIP Member</span>
                </motion.div>
              )}
              
              {!isAuthenticated ? (
                <>
                  <motion.button
                    onClick={() => openAuthModal('login')}
                    className="px-5 py-2 text-amber-500 hover:text-amber-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    onClick={() => openAuthModal('signup')}
                    className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up
                  </motion.button>
                </>
              ) : (
                <motion.button
                  onClick={onLogout}
                  className="px-5 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-amber-500 p-2"
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-20 left-0 right-0 bg-black/98 backdrop-blur-xl border-b border-amber-500/20 z-40 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-lg flex items-center space-x-3 transition-all ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                        : 'text-gray-300 hover:bg-amber-500/5 hover:text-amber-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
              
              <div className="pt-4 border-t border-amber-500/20 space-y-2">
                {/* VIP Badge Mobile */}
                {isVIP && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg"
                  >
                    <Crown className="w-5 h-5 text-white animate-pulse" />
                    <span className="text-white">VIP Member</span>
                  </motion.div>
                )}
                
                {!isAuthenticated ? (
                  <>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        openAuthModal('login');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all"
                    >
                      {t('login', language)}
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        openAuthModal('signup');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 border border-amber-500/30 rounded-lg hover:bg-amber-500/10 transition-all"
                    >
                      {t('signup', language)}
                    </motion.button>
                  </>
                ) : (
                  <>
                    {isAdmin && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setCurrentPage('admin');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center space-x-2"
                      >
                        <Settings className="w-5 h-5" />
                        <span>{t('admin', language)} Panel</span>
                      </motion.button>
                    )}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        onLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500/10 transition-all"
                    >
                      {t('logout', language)}
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}