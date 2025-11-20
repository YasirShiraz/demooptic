import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, Activity, Clock, Target, AlertCircle, TrendingUp } from 'lucide-react';

interface LiveMatch {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  league: string;
  time: number;
  status: string;
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  events: Array<{
    time: number;
    type: 'goal' | 'yellow' | 'red' | 'substitution';
    team: 'home' | 'away';
    player: string;
  }>;
}

export function LiveScores() {
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>([
    {
      id: 1,
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      homeScore: 2,
      awayScore: 1,
      league: 'Premier League',
      time: 67,
      status: 'LIVE',
      possession: { home: 58, away: 42 },
      shots: { home: 12, away: 8 },
      shotsOnTarget: { home: 6, away: 4 },
      corners: { home: 7, away: 3 },
      events: [
        { time: 15, type: 'goal', team: 'home', player: 'Rashford' },
        { time: 34, type: 'yellow', team: 'away', player: 'Van Dijk' },
        { time: 45, type: 'goal', team: 'away', player: 'Salah' },
        { time: 63, type: 'goal', team: 'home', player: 'Fernandes' },
      ],
    },
    {
      id: 2,
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeScore: 1,
      awayScore: 1,
      league: 'La Liga',
      time: 45,
      status: 'HT',
      possession: { home: 52, away: 48 },
      shots: { home: 8, away: 9 },
      shotsOnTarget: { home: 3, away: 4 },
      corners: { home: 4, away: 5 },
      events: [
        { time: 23, type: 'goal', team: 'home', player: 'Vinicius Jr' },
        { time: 38, type: 'goal', team: 'away', player: 'Lewandowski' },
      ],
    },
    {
      id: 3,
      homeTeam: 'Bayern Munich',
      awayTeam: 'Dortmund',
      homeScore: 3,
      awayScore: 2,
      league: 'Bundesliga',
      time: 78,
      status: 'LIVE',
      possession: { home: 65, away: 35 },
      shots: { home: 18, away: 11 },
      shotsOnTarget: { home: 10, away: 7 },
      corners: { home: 9, away: 4 },
      events: [
        { time: 12, type: 'goal', team: 'home', player: 'Kane' },
        { time: 25, type: 'goal', team: 'away', player: 'Adeyemi' },
        { time: 42, type: 'goal', team: 'home', player: 'Musiala' },
        { time: 58, type: 'goal', team: 'away', player: 'Fullkrug' },
        { time: 71, type: 'goal', team: 'home', player: 'Kane' },
        { time: 76, type: 'red', team: 'away', player: 'Hummels' },
      ],
    },
  ]);

  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMatches(prev =>
        prev.map(match => {
          if (match.status === 'LIVE' && match.time < 90) {
            return { ...match, time: match.time + 1 };
          }
          return match;
        })
      );
    }, 60000); // Update every minute (simulated)

    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal': return '⚽';
      case 'yellow': return '🟨';
      case 'red': return '🟥';
      case 'substitution': return '🔄';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-red-500 blur-xl opacity-50 rounded-full"
            />
            <Radio className="w-8 h-8 text-red-500 relative" />
          </div>
          <div>
            <h1 className="text-4xl">Live Scores</h1>
            <p className="text-gray-400">Real-time match updates</p>
          </div>
        </motion.div>

        {/* Live Matches */}
        <div className="space-y-6">
          {liveMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-2xl overflow-hidden"
            >
              {/* Match Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-amber-500/5 transition-colors"
                onClick={() => setSelectedMatch(selectedMatch === match.id ? null : match.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-500 text-sm rounded-lg">
                    {match.league}
                  </span>
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-red-500 text-sm">{match.status}</span>
                    <span className="text-gray-400 text-sm">{match.time}'</span>
                  </motion.div>
                </div>

                {/* Score */}
                <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
                  <div className="text-right">
                    <div className="text-2xl text-white mb-2">{match.homeTeam}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        key={`home-${match.homeScore}`}
                        initial={{ scale: 1.5, color: '#f59e0b' }}
                        animate={{ scale: 1, color: '#ffffff' }}
                        className="text-5xl"
                      >
                        {match.homeScore}
                      </motion.div>
                      <div className="text-2xl text-gray-500">-</div>
                      <motion.div
                        key={`away-${match.awayScore}`}
                        initial={{ scale: 1.5, color: '#f59e0b' }}
                        animate={{ scale: 1, color: '#ffffff' }}
                        className="text-5xl"
                      >
                        {match.awayScore}
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="text-left">
                    <div className="text-2xl text-white mb-2">{match.awayTeam}</div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-400 mb-1">Shots</div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-amber-500">{match.shots.home}</span>
                      <span className="text-gray-600">-</span>
                      <span className="text-amber-500">{match.shots.away}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400 mb-1">On Target</div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-amber-500">{match.shotsOnTarget.home}</span>
                      <span className="text-gray-600">-</span>
                      <span className="text-amber-500">{match.shotsOnTarget.away}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400 mb-1">Corners</div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-amber-500">{match.corners.home}</span>
                      <span className="text-gray-600">-</span>
                      <span className="text-amber-500">{match.corners.away}</span>
                    </div>
                  </div>
                </div>

                {/* Possession Bar */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>Possession</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-amber-500">{match.possession.home}%</span>
                      <span>-</span>
                      <span className="text-amber-500">{match.possession.away}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden flex">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${match.possession.home}%` }}
                      className="bg-gradient-to-r from-amber-500 to-amber-600"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${match.possession.away}%` }}
                      className="bg-gradient-to-r from-blue-500 to-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {selectedMatch === match.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-amber-500/20 overflow-hidden"
                  >
                    <div className="p-6 bg-black/30">
                      <h3 className="text-xl mb-4 flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-amber-500" />
                        <span>Match Events</span>
                      </h3>
                      
                      {/* Events Timeline */}
                      <div className="space-y-3">
                        {match.events.slice().reverse().map((event, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`flex items-center space-x-4 p-3 rounded-lg ${
                              event.team === 'home' 
                                ? 'bg-amber-500/10 justify-start' 
                                : 'bg-blue-500/10 justify-end'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{getEventIcon(event.type)}</span>
                              <div className={event.team === 'away' ? 'text-right' : ''}>
                                <div className="text-white">{event.player}</div>
                                <div className="text-xs text-gray-400">
                                  {event.time}' - {event.type}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Detailed Stats */}
                      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: 'Ball Possession', home: match.possession.home, away: match.possession.away, unit: '%' },
                          { label: 'Total Shots', home: match.shots.home, away: match.shots.away, unit: '' },
                          { label: 'Shots on Target', home: match.shotsOnTarget.home, away: match.shotsOnTarget.away, unit: '' },
                          { label: 'Corner Kicks', home: match.corners.home, away: match.corners.away, unit: '' },
                        ].map((stat, idx) => (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-black/50 rounded-lg p-4 text-center"
                          >
                            <div className="text-xs text-gray-400 mb-2">{stat.label}</div>
                            <div className="flex items-center justify-center space-x-3">
                              <span className="text-xl text-amber-500">{stat.home}{stat.unit}</span>
                              <span className="text-gray-600">-</span>
                              <span className="text-xl text-blue-500">{stat.away}{stat.unit}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Auto-refresh indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-900 border border-amber-500/20 rounded-lg">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Activity className="w-4 h-4 text-amber-500" />
            </motion.div>
            <span className="text-sm text-gray-400">Auto-refreshing live data</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
