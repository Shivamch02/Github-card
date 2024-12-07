import React from 'react';
import { GitHubUser } from '../../types/github';
import { calculateTagline } from '../../utils/tagline';
import { Calendar, Users, BookOpen, Trophy, X } from 'lucide-react';
import { formatDistance } from 'date-fns';
import GlassContainer from '../ui/GlassContainer';
import GlassButton from '../ui/GlassButton';
import StatItem from './StatItem';

interface ComparisonCardProps {
  user: GitHubUser;
  isCurrentUser?: boolean;
  onRemove?: () => void;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ 
  user, 
  isCurrentUser = false,
  onRemove 
}) => {
  const tagline = calculateTagline(user);
  const accountAge = formatDistance(new Date(user.created_at), new Date(), { addSuffix: true });

  return (
    <GlassContainer className="relative overflow-hidden">
      {!isCurrentUser && onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-4 right-4 p-1 rounded-full glass-hover text-white/70 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="relative p-6 bg-gradient-to-br from-purple-600/80 to-blue-600/80">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-md transform -translate-x-1 translate-y-1" />
            <img
              src={user.avatar_url}
              alt={user.login}
              className="relative w-20 h-20 rounded-full border-4 border-white/30"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{user.name || user.login}</h3>
            <p className="text-white/80">@{user.login}</p>
            <span className="inline-block mt-2 px-3 py-1 glass text-sm rounded-full">
              {tagline}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <StatItem
          icon={BookOpen}
          label="Repositories"
          value={user.public_repos}
          iconColor="text-purple-300"
        />
        <StatItem
          icon={Users}
          label="Followers"
          value={user.followers}
          iconColor="text-blue-300"
        />
        <StatItem
          icon={Calendar}
          label="Account Age"
          value={accountAge}
          iconColor="text-green-300"
        />
        <StatItem
          icon={Trophy}
          label="Current Streak"
          value={`${user.streak || 0} days`}
          iconColor="text-yellow-300"
        />
      </div>
    </GlassContainer>
  );
};

export default ComparisonCard;