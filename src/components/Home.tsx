import { motion } from 'motion/react';
import { Crown, Target, TrendingUp, Zap, Radio, Users, BarChart3, Info, FileText, MessageSquare, Newspaper } from 'lucide-react';
import { BannerAd, SidebarAd } from './GoogleAds';

interface HomeProps {
  setCurrentPage: (page: string) => void;
  showAds?: boolean;
}

export function Home({ setCurrentPage, showAds = false }: HomeProps) {
  const liveMatches = [
    { id: 1, home: 'Manchester United', away: 'Liverpool', homeScore: 2, awayScore: 1, time: '67\'', league: 'Premier League', status: 'LIVE' },
    { id: 2, home: 'Real Madrid', away: 'Barcelona', homeScore: 1, awayScore: 1, time: '45\'', league: 'La Liga', status: 'LIVE' },
    { id: 3, home: 'Bayern Munich', away: 'Dortmund', homeScore: 3, awayScore: 2, time: '78\'', league: 'Bundesliga', status: 'LIVE' },
  ];

  const upcomingMatches = [
    { id: 1, home: 'Chelsea', away: 'Arsenal', time: '18:30', date: 'Today', league: 'Premier League' },
    { id: 2, home: 'PSG', away: 'Lyon', time: '20:00', date: 'Today', league: 'Ligue 1' },
    { id: 3, home: 'Juventus', away: 'Inter Milan', time: '19:45', date: 'Tomorrow', league: 'Serie A' },
  ];

  const featuredSports = [
    { name: 'Football', icon: Zap, matches: 156, color: 'from-amber-500 to-amber-600' },
    { name: 'Basketball', icon: BarChart3, matches: 89, color: 'from-orange-500 to-orange-600' },
    { name: 'Tennis', icon: Radio, matches: 45, color: 'from-green-500 to-green-600' },
  ];

  const quickLinks = [
    { id: 'predictions', name: 'Predictions', icon: Target, color: 'from-amber-500 to-amber-600' },
    { id: 'bulletin', name: 'Bulletin', icon: FileText, color: 'from-blue-500 to-blue-600' },
    { id: 'live', name: 'Live Scores', icon: Radio, color: 'from-red-500 to-red-600' },
    { id: 'vip', name: 'VIP', icon: Crown, color: 'from-purple-500 to-pink-600' },
    { id: 'community', name: 'Community', icon: MessageSquare, color: 'from-green-500 to-green-600' },
    { id: 'news', name: 'News', icon: Newspaper, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/5"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-amber-500 blur-3xl opacity-30"
                />
                <Crown className="w-20 h-20 text-amber-500 relative" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              OptikGoal
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              Your Premium Sports Prediction Platform
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.button
                onClick={() => setCurrentPage('predictions')}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Target className="w-5 h-5" />
                <span>View Predictions</span>
              </motion.button>
              <motion.button
                onClick={() => setCurrentPage('vip')}
                className="px-8 py-4 bg-black border-2 border-amber-500 rounded-xl hover:bg-amber-500/10 transition-all flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Crown className="w-5 h-5" />
                <span>Go VIP</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Top Banner Ad - Only for regular users */}
      {showAds && (
        <div className="container mx-auto px-4 py-6">
          <BannerAd />
        </div>
      )}

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Live Scores Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-red-500 blur-lg opacity-50 rounded-full"
                    />
                    <Radio className="w-6 h-6 text-red-500 relative" />
                  </div>
                  <h2 className="text-3xl">Live Matches</h2>
                </div>
                <motion.button
                  onClick={() => setCurrentPage('live')}
                  className="text-amber-500 hover:text-amber-400 transition-colors flex items-center space-x-1"
                  whileHover={{ x: 5 }}
                >
                  <span>View All</span>
                  <TrendingUp className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {liveMatches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-xl p-4 hover:border-amber-500/40 transition-all relative overflow-hidden group"
                    whileHover={{ y: -4 }}
                  >
                    <div className="absolute top-0 right-0 m-3">
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="px-2 py-1 bg-red-500 text-white text-xs rounded-full flex items-center space-x-1"
                      >
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        <span>{match.status}</span>
                      </motion.span>
                    </div>
                    
                    <div className="text-xs text-gray-400 mb-3">{match.league}</div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white">{match.home}</span>
                        <span className="text-2xl text-amber-500">{match.homeScore}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">{match.away}</span>
                        <span className="text-2xl text-amber-500">{match.awayScore}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-center text-sm text-gray-500">{match.time}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Matches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="text-2xl mb-4">Upcoming Matches</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingMatches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-900/50 border border-amber-500/20 rounded-xl p-4 hover:border-amber-500/40 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-xs text-amber-500 mb-2">{match.league}</div>
                    <div className="space-y-1 text-sm mb-3">
                      <div className="text-white">{match.home} vs {match.away}</div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{match.date}</span>
                      <span className="text-amber-500">{match.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Ads - Only for regular users on desktop */}
          {showAds && (
            <div className="hidden lg:block w-80">
              <SidebarAd />
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="container mx-auto px-4 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl mb-8 text-center"
        >
          Quick Access
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setCurrentPage(link.id)}
                className="relative group"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-2xl p-6 hover:border-amber-500/50 transition-all overflow-hidden">
                  {/* Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                  />
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-white text-sm">{link.name}</div>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Featured Sports */}
      <div className="container mx-auto px-4 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl mb-8 text-center"
        >
          Featured Sports
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSports.map((sport, index) => {
            const Icon = sport.icon;
            return (
              <motion.div
                key={sport.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-2xl p-8 overflow-hidden">
                  {/* Animated Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${sport.color} opacity-0 group-hover:opacity-20 transition-opacity`}
                  />
                  
                  <div className="relative z-10 text-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${sport.color} flex items-center justify-center shadow-2xl`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl mb-2 text-white">{sport.name}</h3>
                    <p className="text-gray-400">
                      <span className="text-3xl text-amber-500">{sport.matches}</span> Live Matches
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* VIP CTA */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-amber-600/20 to-amber-500/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.2),transparent_70%)]" />
          
          <div className="relative border border-amber-500/30 rounded-3xl p-12 text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block mb-6"
            >
              <Crown className="w-16 h-16 text-amber-500" />
            </motion.div>
            <h2 className="text-4xl mb-4">Unlock VIP Features</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get access to exclusive predictions, advanced analytics, and priority support with our VIP membership
            </p>
            <motion.button
              onClick={() => setCurrentPage('vip')}
              className="px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore VIP Plans
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}