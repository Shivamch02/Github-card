import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import GitHubCard from "./components/GitHubCard";
import ShareButton from "./components/ShareButton";
import { fetchGitHubUser } from "./services/github";
import { GitHubUser } from "./types/github";
import "./styles/glass.css";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (username: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await fetchGitHubUser(username);
      setUser(userData);
    } catch (err) {
      setError("User not found!!");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Analytics />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800')] bg-cover bg-center opacity-10" />

      <div className="relative">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Github className="w-20 h-20 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              GitHub Profile Cards
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Generate beautiful cards from GitHub profiles. Search, share, and
              showcase your GitHub journey.
            </p>
          </motion.div>

          <SearchBar onSearch={handleSearch} isLoading={isLoading} />

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card p-4 mt-8 text-center text-red-300 max-w-2xl mx-auto"
              >
                {error}
              </motion.div>
            )}

            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12 flex flex-col items-center"
              >
                <div ref={cardRef}>
                  <GitHubCard user={user} />
                </div>
                <div className="mt-8">
                  <ShareButton cardRef={cardRef} username={user.login} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
