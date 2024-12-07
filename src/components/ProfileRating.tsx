import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Award } from 'lucide-react';
import { GitHubUser } from '../types/github';
import { calculateProfileRating } from '../utils/profileRating';

interface ProfileRatingProps {
  user: GitHubUser;
}

const ProfileRating: React.FC<ProfileRatingProps> = ({ user }) => {
  const { score, message, level } = calculateProfileRating(user);

  const levelIcons = {
    beginner: Award,
    intermediate: Star,
    advanced: Zap,
    expert: Trophy
  };

  const levelColors = {
    beginner: 'text-blue-400',
    intermediate: 'text-purple-400',
    advanced: 'text-pink-400',
    expert: 'text-yellow-400'
  };

  const Icon = levelIcons[level];

  return (
    <motion.div
      className="glass-card p-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-center mb-4">
        <Icon className={`w-8 h-8 ${levelColors[level]}`} />
      </div>
      
      <div className="mb-4">
        <div className="relative h-4 glass rounded-full overflow-hidden">
          <motion.div
            className={`absolute left-0 top-0 h-full ${level === 'expert' ? 'bg-yellow-400' : 'bg-blue-400'}`}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className="text-white/70 text-sm mt-2">Profile Score: {score}/100</p>
      </div>

      <p className="text-white text-lg">{message}</p>
    </motion.div>
  );
};

export default ProfileRating;