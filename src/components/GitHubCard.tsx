import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users, BookOpen, Trophy, Github } from "lucide-react";
import { formatDistance } from "date-fns";
import { GitHubUser } from "../types/github";
import { calculateTagline } from "../utils/tagline";
import GlassContainer from "./ui/GlassContainer";
import RepositoryCard from "./repositories/RepositoryCard";
import ProfileRating from "./ProfileRating";

interface GitHubCardProps {
  user: GitHubUser;
}

const GitHubCard: React.FC<GitHubCardProps> = ({ user }) => {
  const tagline = calculateTagline(user);
  const accountAge = formatDistance(new Date(user.created_at), new Date(), {
    addSuffix: true,
  });

  return (
    <div className="space-y-6 w-full max-w-4xl">
      <GlassContainer className="overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 to-blue-600/80 backdrop-blur-sm" />
          <div className="relative p-8">
            <motion.div
              className="flex flex-col md:flex-row items-center md:items-start gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-md transform -translate-x-1 translate-y-1" />
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="relative w-32 h-32 rounded-full border-4 border-white/30 shadow-xl"
                />
              </div>

              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {user.name || user.login}
                </h2>
                <p className="text-white/80 mb-4">@{user.login}</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-4 py-1.5 glass text-sm rounded-full">
                    {tagline}
                  </span>
                  {user.location && (
                    <span className="px-4 py-1.5 glass text-sm rounded-full text-white/70">
                      {user.location}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="p-6 bg-white/5">
          {user.bio && (
            <p className="text-white/90 mb-6 text-center md:text-left">
              {user.bio}
            </p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <motion.div
              className="glass-card p-4 text-white/90"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col items-center">
                <BookOpen className="w-6 h-6 text-purple-300 mb-2" />
                <span className="text-lg font-semibold">
                  {user.public_repos}
                </span>
                <span className="text-sm text-white/70">Repositories</span>
              </div>
            </motion.div>

            <motion.div
              className="glass-card p-4 text-white/90"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col items-center">
                <Users className="w-6 h-6 text-blue-300 mb-2" />
                <span className="text-lg font-semibold">{user.followers}</span>
                <span className="text-sm text-white/70">Followers</span>
              </div>
            </motion.div>

            {/* <motion.div 
              className="glass-card p-4 text-white/90"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col items-center">
                <Trophy className="w-6 h-6 text-yellow-300 mb-2" />
                <span className="text-lg font-semibold">{user.streak}</span>
                <span className="text-sm text-white/70">Day Streak</span>
              </div>
            </motion.div> */}

            <motion.div
              className="glass-card p-4 text-white/90"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col items-center">
                <Calendar className="w-6 h-6 text-green-300 mb-2" />
                <span className="text-sm text-white/70">
                  Joined {accountAge}
                </span>
              </div>
            </motion.div>
          </div>

          <ProfileRating user={user} />

          <motion.a
            href={`https://github.com/${user.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button w-full flex items-center justify-center space-x-2 py-3 mt-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github className="w-5 h-5" />
            <span>View GitHub Profile</span>
          </motion.a>
        </div>
      </GlassContainer>

      {user.repositories && user.repositories.length > 0 && (
        <GlassContainer className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Top Repositories
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {user.repositories.map((repo, index) => (
              <RepositoryCard key={repo.name} repository={repo} index={index} />
            ))}
          </div>
        </GlassContainer>
      )}
    </div>
  );
};

export default GitHubCard;
