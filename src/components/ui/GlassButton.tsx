import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface GlassButtonProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

const GlassButton: React.FC<GlassButtonProps> = ({ 
  children, 
  icon: Icon, 
  onClick, 
  className = '' 
}) => {
  return (
    <motion.button 
      onClick={onClick}
      className={`glass-button flex items-center gap-2 hover:bg-white/20 transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
};

export default GlassButton;