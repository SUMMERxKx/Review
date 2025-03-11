import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const reviewTrends = [
  { month: 'Jan', positive: 45, neutral: 20, negative: 5 },
  { month: 'Feb', positive: 50, neutral: 15, negative: 8 },
  { month: 'Mar', positive: 55, neutral: 18, negative: 6 },
  { month: 'Apr', positive: 48, neutral: 22, negative: 7 },
  { month: 'May', positive: 60, neutral: 15, negative: 4 },
  { month: 'Jun', positive: 65, neutral: 12, negative: 3 },
];

const sentimentData = [
  { name: 'Positive', value: 65, color: '#22c55e' },
  { name: 'Neutral', value: 25, color: '#64748b' },
  { name: 'Negative', value: 10, color: '#ef4444' },
];

const metrics = [
  {
    name: 'Average Rating',
    value: '4.8',
    change: '+0.3',
    trend: 'up',
  },
  {
    name: 'Response Rate',
    value: '92%',
    change: '-2%',
    trend: 'down',
  },
  {
    name: 'Review Volume',
    value: '156',
    change: '0',
    trend: 'neutral',
  },
];

const Analytics = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card"
          >
            <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-gray-900">
                {metric.value}
              </span>
              <div className="flex items-center gap-1 text-sm">
                {getTrendIcon(metric.trend)}
                <span
                  className={clsx(
                    'font-medium',
                    metric.trend === 'up' && 'text-green-600',
                    metric.trend === 'down' && 'text-red-600',
                    metric.trend === 'neutral' && 'text-gray-600'
                  )}
                >
                  {metric.change}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Review Trends Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Review Trends
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reviewTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="positive" stackId="a" fill="#22c55e" />
              <Bar dataKey="neutral" stackId="a" fill="#64748b" />
              <Bar dataKey="negative" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Sentiment Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Sentiment Distribution
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 flex items-center justify-center gap-8">
          {sentimentData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">
                {item.name} ({item.value}%)
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;