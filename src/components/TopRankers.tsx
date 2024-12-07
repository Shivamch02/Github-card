import React from 'react';
import { GitHubUser } from '../types/github';
import { Trophy, Medal, Award } from 'lucide-react';
import GlassContainer from './ui/GlassContainer';

interface TopRankersProps {
  users: GitHubUser[];
}

const TopRankers: React.FC<TopRankersProps> = ({ users }) => {
  const sortedUsers = [...users].sort((a, b) => (b.streak || 0) - (a.streak || 0));

  return (
    <GlassContainer className="max-w-4xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <Trophy className="w-10 h-10 text-yellow-300" />
          Top Rankers
        </h2>
      </div>

      <div className="space-y-4">
        {sortedUsers.map((user, index) => (
          <div
            key={user.login}
            className="glass-card p-4 flex items-center space-x-4 glass-hover"
          >
            <div className="flex-shrink-0 w-12 text-center">
              {index === 0 && <Medal className="w-8 h-8 text-yellow-300 mx-auto" />}
              {index === 1 && <Medal className="w-8 h-8 text-gray-300 mx-auto" />}
              {index === 2 && <Medal className="w-8 h-8 text-amber-600 mx-auto" />}
              {index > 2 && <Award className="w-8 h-8 text-blue-300 mx-auto" />}
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md transform -translate-x-0.5 translate-y-0.5" />
              <img
                src={user.avatar_url}
                alt={user.login}
                className="relative w-14 h-14 rounded-full border-2 border-white/30"
              />
            </div>

            <div className="flex-grow">
              <h3 className="font-semibold text-white">{user.name || user.login}</h3>
              <p className="text-sm text-white/70">@{user.login}</p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-white">{user.streak || 0}</p>
              <p className="text-sm text-white/70">day streak</p>
            </div>
          </div>
        ))}
      </div>
    </GlassContainer>
  );
};

export default TopRankers;