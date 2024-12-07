import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconColor?: string;
}

const StatItem: React.FC<StatItemProps> = ({ 
  icon: Icon, 
  label, 
  value, 
  iconColor = 'text-white' 
}) => {
  return (
    <div className="glass-card p-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <span className="text-white/70">{label}</span>
      </div>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
};

export default StatItem;