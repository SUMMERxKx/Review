import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Search, Filter, ChevronDown } from 'lucide-react';

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'new' | 'replied' | 'archived';
}

const initialReviews: Review[] = [
  {
    id: '1',
    customerName: 'John Smith',
    rating: 5,
    comment: 'Excellent service! The staff was very professional and friendly. Would definitely recommend to others.',
    date: '2024-03-15T10:30:00Z',
    status: 'new',
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    rating: 4,
    comment: 'Great experience overall. The only minor issue was the wait time, but everything else was perfect.',
    date: '2024-03-14T15:45:00Z',
    status: 'replied',
  },
  {
    id: '3',
    customerName: 'Michael Brown',
    rating: 3,
    comment: 'Average experience. There\'s room for improvement in customer service.',
    date: '2024-03-13T09:20:00Z',
    status: 'archived',
  },
];

const Reviews = () => {
  const [reviews] = useState<Review[]>(initialReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Reviews</h1>
        <div className="flex items-center gap-4">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {['all', 'new', 'replied', 'archived'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={clsx(
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap',
              selectedStatus === status
                ? 'bg-brand-100 text-brand-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <span className="text-brand-700 font-medium">
                    {review.customerName.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {review.customerName}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={clsx(
                              'h-4 w-4',
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            )}
                            fill="currentColor"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                  <span
                    className={clsx(
                      'px-2 py-1 text-xs font-medium rounded-full',
                      {
                        'bg-blue-100 text-blue-700': review.status === 'new',
                        'bg-green-100 text-green-700': review.status === 'replied',
                        'bg-gray-100 text-gray-700': review.status === 'archived',
                      }
                    )}
                  >
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                <div className="mt-4 flex items-center gap-4">
                  <button className="text-sm font-medium text-brand-600 hover:text-brand-700">
                    Reply
                  </button>
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-700">
                    Archive
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Reviews;