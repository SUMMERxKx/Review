import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, TrendingUp, QrCode } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', reviews: 4 },
  { name: 'Feb', reviews: 7 },
  { name: 'Mar', reviews: 12 },
  { name: 'Apr', reviews: 15 },
  { name: 'May', reviews: 18 },
  { name: 'Jun', reviews: 24 },
];

const stats = [
  {
    name: 'Total Reviews',
    value: '80',
    change: '+12.3%',
    icon: MessageSquare,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Average Rating',
    value: '4.8',
    change: '+2.1%',
    icon: Star,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    name: 'Response Rate',
    value: '92%',
    change: '+5.4%',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'QR Scans',
    value: '156',
    change: '+8.7%',
    icon: QrCode,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="glass-card"
            >
              <div className="flex items-center gap-4">
                <div className={`rounded-lg ${stat.bgColor} p-3`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <span className="text-sm font-medium text-green-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="glass-card"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Review Trends
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="reviews"
                stroke="#0284c7"
                fillOpacity={1}
                fill="url(#colorReviews)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Reviews Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="glass-card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Reviews</h2>
          <Link
            to="/dashboard/reviews"
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            View all
          </Link>
        </div>
        <div className="space-y-4">
          {/* Placeholder reviews - replace with real data */}
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-gray-50"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Customer Name</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < 4 ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  Great service! The staff was very friendly and professional...
                </p>
              </div>
              <p className="flex-shrink-0 text-sm text-gray-500">2h ago</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;