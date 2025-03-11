import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, BarChart3, QrCode, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Star className="w-6 h-6 text-yellow-500" />,
    title: 'Collect Reviews',
    description: 'Gather authentic feedback from your customers with our easy-to-use platform.'
  },
  {
    icon: <QrCode className="w-6 h-6 text-blue-500" />,
    title: 'QR Code Integration',
    description: 'Generate unique QR codes for seamless customer feedback collection.'
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-green-500" />,
    title: 'AI-Powered Insights',
    description: 'Get intelligent analysis of customer feedback with our advanced AI technology.'
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-purple-500" />,
    title: 'Detailed Analytics',
    description: 'Track and analyze customer satisfaction with comprehensive analytics.'
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white pt-16 pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-8 h-8 text-brand-600" />
              <span className="text-xl font-bold text-gray-900">ReviewPro</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
              <Link to="/register" className="btn-primary">Get Started</Link>
            </div>
          </nav>

          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Transform Customer Feedback into Business Growth
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Collect, analyze, and leverage customer reviews to improve your business with our AI-powered platform.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/register" className="btn-primary w-full sm:w-auto">
                Start Free Trial
              </Link>
              <Link to="/demo" className="btn-secondary w-full sm:w-auto">
                Watch Demo
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to manage customer feedback</h2>
            <p className="text-lg text-gray-600">Powerful features to help you collect and analyze customer reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to improve your business?</h2>
            <p className="text-xl text-gray-600 mb-10">Join thousands of businesses using ReviewPro to collect and analyze customer feedback.</p>
            <Link 
              to="/register" 
              className="btn-primary inline-flex items-center"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <MessageSquare className="w-6 h-6 text-brand-600" />
              <span className="text-lg font-bold text-gray-900">ReviewPro</span>
            </div>
            <div className="flex items-center space-x-6 text-gray-600">
              <Link to="/about" className="hover:text-gray-900">About</Link>
              <Link to="/privacy" className="hover:text-gray-900">Privacy</Link>
              <Link to="/terms" className="hover:text-gray-900">Terms</Link>
              <Link to="/contact" className="hover:text-gray-900">Contact</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500">
            © {new Date().getFullYear()} ReviewPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;