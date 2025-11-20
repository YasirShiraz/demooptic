import { motion } from 'motion/react';
import { Info, X, Settings, User } from 'lucide-react';
import { useState } from 'react';

export function InfoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-pink-900/50 border-b border-blue-500/30 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-shrink-0">
              <Info className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-200">
                <span className="font-semibold text-blue-400">🎯 Demo Guide:</span>
                {' '}<Settings className="w-4 h-4 inline text-purple-400" /> <span className="text-purple-400 font-semibold">Admin Panel</span> (site management) → login: <code className="px-2 py-0.5 bg-black/40 rounded text-amber-400">admin</code> / <code className="px-2 py-0.5 bg-black/40 rounded text-amber-400">admin123</code>
                {' • '}<User className="w-4 h-4 inline text-green-400" /> <span className="text-green-400 font-semibold">Regular User</span> (comments & free features) → login with any email/password
              </p>
            </div>
          </div>
          <motion.button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}