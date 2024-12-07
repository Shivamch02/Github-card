import React from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Circle } from 'lucide-react';
import { Repository } from '../../types/github';

interface RepositoryCardProps {
  repository: Repository;
  index: number;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository, index }) => {
  return (
    <motion.a
      href={repository.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="glass-card p-4 h-full hover:bg-white/15 transition-all duration-300">
        <h3 className="font-semibold text-white text-lg mb-2 truncate">
          {repository.name}
        </h3>
        
        {repository.description && (
          <p className="text-white/70 text-sm mb-4 line-clamp-2">
            {repository.description}
          </p>
        )}
        
        <div className="flex items-center space-x-4">
          {repository.language && (
            <div className="flex items-center space-x-1">
              <Circle className="w-3 h-3 text-blue-400" fill="currentColor" />
              <span className="text-sm text-white/70">{repository.language}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white/70">{repository.stars}</span>
          </div>
          
          {repository.fork && (
            <div className="flex items-center space-x-1">
              <GitFork className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white/70">Fork</span>
            </div>
          )}
        </div>
      </div>
    </motion.a>
  );
};

export default RepositoryCard;