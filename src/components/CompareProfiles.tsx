import React, { useState } from 'react';
import { GitHubUser } from '../types/github';
import { Search, ArrowLeftRight } from 'lucide-react';
import GlassContainer from './ui/GlassContainer';
import GlassButton from './ui/GlassButton';
import ComparisonCard from './comparison/ComparisonCard';
import SearchBar from './comparison/SearchBar';

interface CompareProfilesProps {
  currentUser: GitHubUser;
  users: GitHubUser[];
}

const CompareProfiles: React.FC<CompareProfilesProps> = ({ currentUser, users }) => {
  const [selectedUser, setSelectedUser] = useState<GitHubUser | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user => 
    user.login !== currentUser.login &&
    (user.login.toLowerCase().includes(searchQuery.toLowerCase()) ||
     user.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-6">
          <ArrowLeftRight className="w-10 h-10 text-blue-300" />
          Compare Profiles
        </h2>
        
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search users to compare..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <ComparisonCard user={currentUser} isCurrentUser />
        
        {selectedUser ? (
          <ComparisonCard 
            user={selectedUser} 
            onRemove={() => setSelectedUser(null)}
          />
        ) : (
          <GlassContainer className="flex flex-col items-center justify-center p-8 min-h-[200px]">
            <Search className="w-16 h-16 text-white/30 mb-4" />
            <p className="text-white/70 text-center">
              Select a user from the list below to compare
            </p>
          </GlassContainer>
        )}
      </div>

      {!selectedUser && filteredUsers.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold text-white/90 mb-4">Available Users</h3>
          {filteredUsers.map(user => (
            <div
              key={user.login}
              className="glass-card p-4 flex items-center space-x-4 glass-hover cursor-pointer"
              onClick={() => setSelectedUser(user)}
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-12 h-12 rounded-full border-2 border-white/30"
              />
              <div className="flex-grow">
                <h4 className="font-semibold text-white">{user.name}</h4>
                <p className="text-sm text-white/70">@{user.login}</p>
              </div>
              <GlassButton>Compare</GlassButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompareProfiles;