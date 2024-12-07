import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ActivityData } from '../../types/github';
import GlassContainer from '../ui/GlassContainer';
import { format } from 'date-fns';

interface ActivityGraphProps {
  data: ActivityData[];
}

const ActivityGraph: React.FC<ActivityGraphProps> = ({ data }) => {
  return (
    <GlassContainer className="p-6">
      <h3 className="text-xl font-bold text-white mb-4">Activity Overview</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
              stroke="#fff"
              opacity={0.5}
            />
            <YAxis stroke="#fff" opacity={0.5} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff',
              }}
              labelFormatter={(date) => format(new Date(date), 'MMMM d, yyyy')}
            />
            <Area
              type="monotone"
              dataKey="contributions"
              stroke="#8B5CF6"
              fillOpacity={1}
              fill="url(#colorContributions)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassContainer>
  );
};

export default ActivityGraph;