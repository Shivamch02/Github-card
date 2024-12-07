import React, { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username..."
            className="w-full glass-input pl-12 pr-4 py-4 text-lg text-white placeholder-white/50 rounded-2xl"
            disabled={isLoading}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search className="w-6 h-6 text-white/50" />
          </div>
        </div>

        <motion.button
          type="submit"
          className="absolute right-2 top-2.5 glass-button px-6 py-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2" />
              Searching...
            </div>
          ) : (
            "Search"
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default SearchBar;
