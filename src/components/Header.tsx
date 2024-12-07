import React from 'react';
import { motion } from 'framer-motion';
import { Github, Search, Share2, Code, Twitter, Globe } from 'lucide-react';
import GlassButton from './ui/GlassButton';

const Header: React.FC = () => {
  return (
    <header className="glass border-b border-white/10 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Github className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white">GitHub Cards</h1>
              <p className="text-sm text-white/70">Share your GitHub journey</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <GlassButton
              icon={Search}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Search
            </GlassButton>
            
            <GlassButton
              icon={Twitter}
              onClick={() => window.open('https://twitter.com/_cvam', '_blank')}
            >
              Twitter
            </GlassButton>
            
            <GlassButton
              icon={Globe}
              onClick={() => window.open('https://cvam.dev', '_blank')}
            >
              Portfolio
            </GlassButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;