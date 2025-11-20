import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Calendar, Download, Plus, Trash2, Share2, CheckSquare, Filter } from 'lucide-react';
import { BannerAd, SidebarAd } from './GoogleAds';

interface MatchBulletinProps {
  showAds?: boolean;
}

const matches = [
  { id: 1, homeTeam: 'Manchester United', awayTeam: 'Liverpool', league: 'Premier League', sport: 'Football', time: '15:00', date: 'Today', odds: { home: '2.50', draw: '3.20', away: '2.80' } },
  { id: 2, homeTeam: 'Real Madrid', awayTeam: 'Barcelona', league: 'La Liga', sport: 'Football', time: '20:00', date: 'Today', odds: { home: '2.10', draw: '3.40', away: '3.50' } },
  { id: 3, homeTeam: 'Bayern Munich', awayTeam: 'Dortmund', league: 'Bundesliga', sport: 'Football', time: '17:30', date: 'Today', odds: { home: '1.75', draw: '3.80', away: '4.50' } },
  { id: 4, homeTeam: 'Chelsea', awayTeam: 'Arsenal', league: 'Premier League', sport: 'Football', time: '18:30', date: 'Today', odds: { home: '2.65', draw: '3.10', away: '2.90' } },
  { id: 5, homeTeam: 'PSG', awayTeam: 'Lyon', league: 'Ligue 1', sport: 'Football', time: '21:00', date: 'Today', odds: { home: '1.60', draw: '4.00', away: '5.50' } },
  { id: 6, homeTeam: 'Lakers', awayTeam: 'Warriors', league: 'NBA', sport: 'Basketball', time: '19:00', date: 'Today', odds: { home: '1.90', draw: '-', away: '1.95' } },
  { id: 7, homeTeam: 'Juventus', awayTeam: 'Inter Milan', league: 'Serie A', sport: 'Football', time: '19:45', date: 'Tomorrow', odds: { home: '2.40', draw: '3.20', away: '3.00' } },
  { id: 8, homeTeam: 'Atletico Madrid', awayTeam: 'Sevilla', league: 'La Liga', sport: 'Football', time: '16:15', date: 'Tomorrow', odds: { home: '1.85', draw: '3.50', away: '4.20' } },
];

export function MatchBulletin({ showAds = true }: MatchBulletinProps) {
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedMatches, setSelectedMatches] = useState<number[]>([]);
  const [showCoupon, setShowCoupon] = useState(false);

  const sports = ['all', 'Football', 'Basketball', 'Tennis'];

  const filteredMatches = selectedSport === 'all' 
    ? matches 
    : matches.filter(m => m.sport === selectedSport);

  const toggleMatchSelection = (matchId: number) => {
    setSelectedMatches(prev => 
      prev.includes(matchId) 
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    );
  };

  const calculateTotalOdds = () => {
    if (selectedMatches.length === 0) return '0.00';
    const selectedMatchesData = matches.filter(m => selectedMatches.includes(m.id));
    const totalOdds = selectedMatchesData.reduce((acc, match) => acc * parseFloat(match.odds.home), 1);
    return totalOdds.toFixed(2);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-amber-500" />
            <div>
              <h1 className="text-4xl">Match Bulletin</h1>
              <p className="text-gray-400">Today's matches with odds</p>
            </div>
          </div>
          
          {selectedMatches.length > 0 && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setShowCoupon(!showCoupon)}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center space-x-2 hover:shadow-lg hover:shadow-amber-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CheckSquare className="w-5 h-5" />
              <span>View Coupon ({selectedMatches.length})</span>
            </motion.button>
          )}
        </motion.div>

        {/* Sport Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center space-x-3 mb-8"
        >
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {sports.map((sport) => (
              <motion.button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedSport === sport
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {sport === 'all' ? 'All Sports' : sport}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Matches List */}
        <div className="space-y-4 mb-8">
          {filteredMatches.map((match, index) => {
            const isSelected = selectedMatches.includes(match.id);
            return (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-gradient-to-br from-gray-900 to-black border rounded-xl p-6 transition-all ${
                  isSelected 
                    ? 'border-amber-500/50 shadow-lg shadow-amber-500/20' 
                    : 'border-amber-500/20 hover:border-amber-500/40'
                }`}
                whileHover={{ x: 4 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Match Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="px-3 py-1 bg-amber-500/20 text-amber-500 text-xs rounded-lg">
                        {match.league}
                      </span>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{match.date}</span>
                        <span>•</span>
                        <span>{match.time}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg text-white">{match.homeTeam}</span>
                      </div>
                      <div className="text-gray-500 text-sm">vs</div>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg text-white">{match.awayTeam}</span>
                      </div>
                    </div>
                  </div>

                  {/* Odds */}
                  <div className="grid grid-cols-3 gap-3 min-w-[280px]">
                    <div className="bg-black/50 rounded-lg p-3 text-center hover:bg-amber-500/10 transition-colors cursor-pointer">
                      <div className="text-xs text-gray-400 mb-1">Home</div>
                      <div className="text-xl text-amber-500">{match.odds.home}</div>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3 text-center hover:bg-amber-500/10 transition-colors cursor-pointer">
                      <div className="text-xs text-gray-400 mb-1">Draw</div>
                      <div className="text-xl text-amber-500">{match.odds.draw}</div>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3 text-center hover:bg-amber-500/10 transition-colors cursor-pointer">
                      <div className="text-xs text-gray-400 mb-1">Away</div>
                      <div className="text-xl text-amber-500">{match.odds.away}</div>
                    </div>
                  </div>

                  {/* Add to Coupon */}
                  <motion.button
                    onClick={() => toggleMatchSelection(match.id)}
                    className={`p-3 rounded-lg transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isSelected ? (
                      <CheckSquare className="w-6 h-6" />
                    ) : (
                      <Plus className="w-6 h-6" />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Coupon Summary */}
        {showCoupon && selectedMatches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-br from-gray-900 to-black border-t border-amber-500/30 p-6 z-40"
          >
            <div className="container mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Your Coupon</div>
                  <div className="text-2xl text-white">
                    {selectedMatches.length} {selectedMatches.length === 1 ? 'Selection' : 'Selections'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">Total Odds</div>
                  <div className="text-3xl text-amber-500">{calculateTotalOdds()}</div>
                </div>
                <div className="flex space-x-3">
                  <motion.button
                    onClick={() => setSelectedMatches([])}
                    className="px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear
                  </motion.button>
                  <motion.button
                    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Place Bet
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}