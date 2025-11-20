import { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Lock, Sparkles, TrendingUp, BarChart3, Shield, Zap } from 'lucide-react';
import { BannerAd, SidebarAd } from './GoogleAds';

interface PredictionsProps {
  isAuthenticated: boolean;
  showAds?: boolean;
}

interface Prediction {
  id: number;
  homeTeam: string;
  awayTeam: string;
  league: string;
  prediction: string;
  confidence: number;
  odds: string;
  time: string;
  category: 'banker' | 'surprise' | 'coupon' | 'vip';
  aiScore: number;
  stats: {
    homeForm: string;
    awayForm: string;
    h2h: string;
  };
}

const predictions: Prediction[] = [
  {
    id: 1,
    homeTeam: 'Manchester City',
    awayTeam: 'Chelsea',
    league: 'Premier League',
    prediction: 'Home Win',
    confidence: 92,
    odds: '1.65',
    time: '15:00',
    category: 'banker',
    aiScore: 95,
    stats: { homeForm: 'WWWWW', awayForm: 'WLWDL', h2h: '3-1-1' },
  },
  {
    id: 2,
    homeTeam: 'Liverpool',
    awayTeam: 'Arsenal',
    league: 'Premier League',
    prediction: 'Both Teams to Score',
    confidence: 88,
    odds: '1.80',
    time: '17:30',
    category: 'banker',
    aiScore: 91,
    stats: { homeForm: 'WWWDW', awayForm: 'WWLWW', h2h: '2-2-1' },
  },
  {
    id: 3,
    homeTeam: 'Nottingham',
    awayTeam: 'Tottenham',
    league: 'Premier League',
    prediction: 'Away Win',
    confidence: 76,
    odds: '2.40',
    time: '20:00',
    category: 'surprise',
    aiScore: 82,
    stats: { homeForm: 'LDLLW', awayForm: 'WWWWL', h2h: '1-3-1' },
  },
  {
    id: 4,
    homeTeam: 'Real Madrid',
    awayTeam: 'Atletico',
    league: 'La Liga',
    prediction: 'Over 2.5 Goals',
    confidence: 84,
    odds: '1.95',
    time: '21:00',
    category: 'coupon',
    aiScore: 87,
    stats: { homeForm: 'WWLWW', awayForm: 'WDWLW', h2h: '3-1-1' },
  },
  {
    id: 5,
    homeTeam: 'Bayern Munich',
    awayTeam: 'PSG',
    league: 'Champions League',
    prediction: 'Home Win & Over 2.5',
    confidence: 95,
    odds: '2.85',
    time: '20:00',
    category: 'vip',
    aiScore: 98,
    stats: { homeForm: 'WWWWW', awayForm: 'WWWLW', h2h: '2-1-2' },
  },
  {
    id: 6,
    homeTeam: 'Inter Milan',
    awayTeam: 'AC Milan',
    league: 'Serie A',
    prediction: 'Draw',
    confidence: 79,
    odds: '3.10',
    time: '18:00',
    category: 'surprise',
    aiScore: 85,
    stats: { homeForm: 'WDWDW', awayForm: 'DWWDL', h2h: '1-3-1' },
  },
  {
    id: 7,
    homeTeam: 'Barcelona',
    awayTeam: 'Sevilla',
    league: 'La Liga',
    prediction: 'Home Win',
    confidence: 91,
    odds: '1.55',
    time: '16:30',
    category: 'banker',
    aiScore: 93,
    stats: { homeForm: 'WWWWW', awayForm: 'LLWDL', h2h: '4-1-0' },
  },
  {
    id: 8,
    homeTeam: 'Juventus',
    awayTeam: 'Roma',
    league: 'Serie A',
    prediction: 'Under 2.5 Goals',
    confidence: 72,
    odds: '2.10',
    time: '19:45',
    category: 'coupon',
    aiScore: 78,
    stats: { homeForm: 'WDWDL', awayForm: 'DWLDW', h2h: '2-2-1' },
  },
];

export function Predictions({ isAuthenticated, showAds = true }: PredictionsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Predictions', icon: Target, color: 'from-gray-500 to-gray-600' },
    { id: 'banker', label: 'Banker', icon: Shield, color: 'from-green-500 to-green-600', description: 'High confidence' },
    { id: 'surprise', label: 'Surprise', icon: Zap, color: 'from-purple-500 to-purple-600', description: 'Dark horses' },
    { id: 'coupon', label: 'Coupon', icon: BarChart3, color: 'from-blue-500 to-blue-600', description: 'Accumulator tips' },
    { id: 'vip', label: 'VIP Only', icon: Lock, color: 'from-amber-500 to-amber-600', description: 'Exclusive predictions' },
  ];

  const filteredPredictions = selectedCategory === 'all' 
    ? predictions 
    : predictions.filter(p => p.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'banker': return 'from-green-500 to-green-600';
      case 'surprise': return 'from-purple-500 to-purple-600';
      case 'coupon': return 'from-blue-500 to-blue-600';
      case 'vip': return 'from-amber-500 to-amber-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'banker': return { icon: Shield, label: 'BANKER' };
      case 'surprise': return { icon: Zap, label: 'SURPRISE' };
      case 'coupon': return { icon: BarChart3, label: 'COUPON' };
      case 'vip': return { icon: Lock, label: 'VIP' };
      default: return { icon: Target, label: 'PICK' };
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-8 h-8 text-amber-500" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
              AI-Powered Predictions
            </h1>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-8 h-8 text-amber-500" />
            </motion.div>
          </div>
          <p className="text-gray-400 text-lg">Expert analysis backed by advanced AI algorithms</p>
        </motion.div>

        {/* Top Banner Ad - Only for regular users */}
        {showAds && (
          <div className="mb-8">
            <BannerAd />
          </div>
        )}

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative px-6 py-3 rounded-xl flex items-center space-x-2 transition-all overflow-hidden ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl`}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {!isActive && (
                  <div className="absolute inset-0 bg-gray-900 border border-amber-500/20 rounded-xl" />
                )}
                <Icon className="w-5 h-5 relative z-10" />
                <div className="relative z-10">
                  <div>{category.label}</div>
                  {category.description && (
                    <div className="text-xs opacity-75">{category.description}</div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Main Content with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Predictions Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-6">
              {filteredPredictions.map((prediction, index) => {
                const badge = getCategoryBadge(prediction.category);
                const BadgeIcon = badge.icon;
                const isVIP = prediction.category === 'vip' && !isAuthenticated;

                return (
                  <motion.div
                    key={prediction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-2xl p-6 hover:border-amber-500/40 transition-all overflow-hidden group ${
                      isVIP ? 'blur-sm' : ''
                    }`}
                    whileHover={{ y: -4 }}
                  >
                    {/* VIP Lock Overlay */}
                    {isVIP && (
                      <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 backdrop-blur-sm">
                        <div className="text-center">
                          <Lock className="w-12 h-12 text-amber-500 mx-auto mb-2" />
                          <p className="text-amber-500">VIP Members Only</p>
                        </div>
                      </div>
                    )}

                    {/* Glow Effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(prediction.category)} opacity-0 group-hover:opacity-5 transition-opacity`}
                    />

                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${getCategoryColor(prediction.category)} flex items-center space-x-2 text-sm`}>
                        <BadgeIcon className="w-4 h-4" />
                        <span>{badge.label}</span>
                      </div>
                      <div className="text-xs text-gray-500">{prediction.league}</div>
                    </div>

                    {/* AI Score Badge */}
                    <div className="absolute top-6 right-6">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-amber-500 blur-lg opacity-50 rounded-full" />
                        <div className="relative bg-black border-2 border-amber-500 rounded-full w-16 h-16 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs text-gray-400">AI</div>
                            <div className="text-lg text-amber-500">{prediction.aiScore}</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Teams */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg text-white">{prediction.homeTeam}</span>
                      </div>
                      <div className="flex items-center justify-center my-3">
                        <div className="text-gray-500">vs</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-white">{prediction.awayTeam}</span>
                      </div>
                    </div>

                    {/* Prediction */}
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="text-xs text-gray-400 mb-1">PREDICTION</div>
                          <div className="text-lg text-amber-500">{prediction.prediction}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400 mb-1">ODDS</div>
                          <div className="text-xl text-amber-500">{prediction.odds}</div>
                        </div>
                      </div>
                      
                      {/* Confidence Bar */}
                      <div>
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>Confidence</span>
                          <span className="text-amber-500">{prediction.confidence}%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${prediction.confidence}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-600"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-black/50 rounded-lg p-2 text-center">
                        <div className="text-xs text-gray-500 mb-1">Home Form</div>
                        <div className="text-xs text-green-500">{prediction.stats.homeForm}</div>
                      </div>
                      <div className="bg-black/50 rounded-lg p-2 text-center">
                        <div className="text-xs text-gray-500 mb-1">H2H</div>
                        <div className="text-xs text-amber-500">{prediction.stats.h2h}</div>
                      </div>
                      <div className="bg-black/50 rounded-lg p-2 text-center">
                        <div className="text-xs text-gray-500 mb-1">Away Form</div>
                        <div className="text-xs text-red-500">{prediction.stats.awayForm}</div>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-gray-500">Kick-off: {prediction.time}</span>
                      <motion.button
                        className="text-amber-500 hover:text-amber-400 transition-colors flex items-center space-x-1"
                        whileHover={{ x: 3 }}
                      >
                        <span>Details</span>
                        <TrendingUp className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Ad - Only for regular users */}
          {showAds && (
            <div className="hidden lg:block">
              <SidebarAd />
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Win Rate', value: '87%', color: 'from-green-500 to-green-600' },
            { label: 'Total Predictions', value: '1,247', color: 'from-blue-500 to-blue-600' },
            { label: 'Average Odds', value: '2.14', color: 'from-purple-500 to-purple-600' },
            { label: 'ROI', value: '+34%', color: 'from-amber-500 to-amber-600' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-xl p-6 text-center"
              whileHover={{ y: -4 }}
            >
              <div className={`text-3xl mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}