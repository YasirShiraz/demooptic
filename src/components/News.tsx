import { useState } from 'react';
import { motion } from 'motion/react';
import { Newspaper, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  timestamp: string;
  trending: boolean;
}

export function News() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Football', 'Basketball', 'Tennis', 'Analysis'];

  const news: NewsArticle[] = [
    {
      id: 1,
      title: 'Manchester United Signs Star Midfielder in Record Deal',
      excerpt: 'In a groundbreaking transfer, Manchester United has secured the signature of...',
      category: 'Football',
      image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=600&fit=crop',
      timestamp: '2 hours ago',
      trending: true,
    },
    {
      id: 2,
      title: 'Lakers Dominate in Playoff Victory',
      excerpt: 'The Los Angeles Lakers showcased their championship form with a commanding...',
      category: 'Basketball',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop',
      timestamp: '3 hours ago',
      trending: true,
    },
    {
      id: 3,
      title: 'Wimbledon Champion Announces Retirement',
      excerpt: 'Tennis legend and multiple Wimbledon champion has announced their retirement...',
      category: 'Tennis',
      image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=600&fit=crop',
      timestamp: '5 hours ago',
      trending: false,
    },
    {
      id: 4,
      title: 'Premier League Title Race Heats Up',
      excerpt: 'With only five games remaining, the Premier League title race has never been...',
      category: 'Football',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=600&fit=crop',
      timestamp: '6 hours ago',
      trending: true,
    },
    {
      id: 5,
      title: 'Expert Analysis: Top Betting Strategies for This Weekend',
      excerpt: 'Our experts break down the best betting strategies and predictions for...',
      category: 'Analysis',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
      timestamp: '1 hour ago',
      trending: false,
    },
    {
      id: 6,
      title: 'NBA All-Star Weekend Highlights',
      excerpt: 'The annual NBA All-Star weekend brought spectacular performances and...',
      category: 'Basketball',
      image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&h=600&fit=crop',
      timestamp: '8 hours ago',
      trending: false,
    },
  ];

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(article => article.category === selectedCategory);

  const featuredNews = news.find(article => article.trending);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <Newspaper className="w-8 h-8 text-amber-500" />
          <div>
            <h1 className="text-4xl">Sports News</h1>
            <p className="text-gray-400">Latest updates from the world of sports</p>
          </div>
        </motion.div>

        {/* Featured News */}
        {featuredNews && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 relative group cursor-pointer overflow-hidden rounded-3xl"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative h-96 overflow-hidden rounded-3xl">
              <ImageWithFallback
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-3 py-1 bg-red-500 rounded-lg text-sm flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Trending</span>
                  </span>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-500 rounded-lg text-sm">
                    {featuredNews.category}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl mb-3">{featuredNews.title}</h2>
                <p className="text-gray-300 text-lg mb-4">{featuredNews.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{featuredNews.timestamp}</span>
                  </div>
                  <motion.button
                    className="flex items-center space-x-2 text-amber-500 hover:text-amber-400 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-lg transition-all ${
                selectedCategory === category
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/50'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-amber-500/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'all' ? 'All News' : category}
            </motion.button>
          ))}
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all group cursor-pointer"
              whileHover={{ y: -8 }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {article.trending && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-red-500 rounded-lg text-xs flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Trending</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-500 text-xs rounded-lg">
                    {article.category}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{article.timestamp}</span>
                  </div>
                </div>

                <h3 className="text-xl mb-2 text-white group-hover:text-amber-500 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>

                <motion.button
                  className="flex items-center space-x-2 text-amber-500 hover:text-amber-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trending Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-red-500" />
            <h2 className="text-3xl">Trending Stories</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {news.filter(article => article.trending).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-xl p-4 hover:border-amber-500/40 transition-all cursor-pointer flex items-center space-x-4 group"
                whileHover={{ x: 4 }}
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white mb-1 line-clamp-2 group-hover:text-amber-500 transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.timestamp}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
