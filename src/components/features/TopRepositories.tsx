import React from 'react';
import { motion } from 'framer-motion';
import { Repository } from '../../types/github';
import GlassContainer from '../ui/GlassContainer';
import { Star, GitFork, Code } from 'lucide-react';

interface TopRepositoriesProps {
  repositories: Repository[];
}

const TopRepositories: React.FC<TopRepositoriesProps> = ({ repositories }) => {
  return (
    <GlassContainer className="p-6">
      <h3 className="text-xl font-bold text-white mb-4">Top Repositories</h3>
      <div className="space-y-4">
        {repositories.map((repo, index) => (
          <motion.div
            key={repo.name}
            className="glass-card p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-white">{repo.name}</h4>
              <div className="flex items-center space-x-3">
                <span className="flex items-center text-yellow-300">
                  <Star className="w-4 h-4 mr-1" />
                  {repo.stars}
                </span>
                <span className="text-sm px-2 py-1 glass rounded-full text-white/70">
                  {repo.language}
                </span>
              </div>
            </div>
            <p className="text-sm text-white/70">{repo.description}</p>
          </motion.div>
        ))}
      </div>
    </GlassContainer>
  );
};

export default TopRepositories;