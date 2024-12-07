import React from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '../../types/github';
import GlassContainer from '../ui/GlassContainer';
import { Trophy, Star, GitBranch, Code, Users } from 'lucide-react';

interface AchievementsProps {
  achievements: Achievement[];
}

const iconMap: Record<string, React.ReactNode> = {
  trophy: <Trophy className="w-6 h-6" />,
  star: <Star className="w-6 h-6" />,
  branch: <GitBranch className="w-6 h-6" />,
  code: <Code className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
};

const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  return (
    <GlassContainer className="p-6">
      <h3 className="text-xl font-bold text-white mb-4">Achievements</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            className={`glass-card p-4 ${
              achievement.unlockedAt ? 'bg-white/10' : 'bg-white/5'
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`text-${achievement.unlockedAt ? 'yellow' : 'gray'}-300`}>
                {iconMap[achievement.icon]}
              </div>
              <span className="font-semibold text-white">{achievement.title}</span>
            </div>
            <p className="text-sm text-white/70">{achievement.description}</p>
            {achievement.progress !== undefined && (
              <div className="mt-2">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
                <span className="text-xs text-white/50 mt-1">
                  {achievement.progress}% complete
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </GlassContainer>
  );
};

export default Achievements;