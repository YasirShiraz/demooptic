import { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ThumbsUp, Flag, Send, User } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  status: 'pending' | 'approved' | 'rejected';
}

interface CommunityProps {
  isAuthenticated: boolean;
  openAuthModal: (mode: 'login' | 'signup') => void;
}

export function Community({ isAuthenticated, openAuthModal }: CommunityProps) {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: 'John D.', content: 'Great predictions today! Won 3 out of 4 bets.', timestamp: '2 hours ago', likes: 24, status: 'approved' },
    { id: 2, author: 'Sarah M.', content: 'The banker tips are incredible. Thanks OptikGoal!', timestamp: '3 hours ago', likes: 18, status: 'approved' },
    { id: 3, author: 'Mike R.', content: 'Just joined VIP and already seeing results. Highly recommend!', timestamp: '5 hours ago', likes: 31, status: 'approved' },
    { id: 4, author: 'Emma L.', content: 'What do you think about the Liverpool game tonight?', timestamp: '1 hour ago', likes: 12, status: 'approved' },
    { id: 5, author: 'David K.', content: 'The live scores feature is amazing. Real-time updates are perfect!', timestamp: '4 hours ago', likes: 22, status: 'approved' },
  ]);

  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState<number[]>([]);

  const handleLike = (commentId: number) => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    
    if (likedComments.includes(commentId)) {
      setLikedComments(likedComments.filter(id => id !== commentId));
      setComments(comments.map(c => 
        c.id === commentId ? { ...c, likes: c.likes - 1 } : c
      ));
    } else {
      setLikedComments([...likedComments, commentId]);
      setComments(comments.map(c => 
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      ));
    }
  };

  const handleSubmitComment = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }

    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: 'You',
        content: newComment,
        timestamp: 'Just now',
        likes: 0,
        status: 'pending',
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <MessageSquare className="w-8 h-8 text-amber-500" />
          <div>
            <h1 className="text-4xl">Community</h1>
            <p className="text-gray-400">Join the discussion with other sports enthusiasts</p>
          </div>
        </motion.div>

        {/* Comment Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-xl mb-4">Share Your Thoughts</h2>
          <div className="space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={isAuthenticated ? "What's on your mind?" : "Login to join the conversation..."}
              className="w-full h-32 px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg focus:border-amber-500 focus:outline-none text-white resize-none"
              disabled={!isAuthenticated}
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">
                {isAuthenticated 
                  ? 'Your comment will be reviewed before appearing publicly.' 
                  : 'Please login to post a comment.'
                }
              </p>
              <motion.button
                onClick={handleSubmitComment}
                disabled={!isAuthenticated || !newComment.trim()}
                className={`px-6 py-3 rounded-xl flex items-center space-x-2 transition-all ${
                  isAuthenticated && newComment.trim()
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:shadow-lg hover:shadow-amber-500/50'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={isAuthenticated && newComment.trim() ? { scale: 1.05 } : {}}
                whileTap={isAuthenticated && newComment.trim() ? { scale: 0.95 } : {}}
              >
                <Send className="w-5 h-5" />
                <span>Post Comment</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-gradient-to-br from-gray-900 to-black border rounded-2xl p-6 ${
                comment.status === 'pending' 
                  ? 'border-yellow-500/30' 
                  : 'border-amber-500/20 hover:border-amber-500/40'
              } transition-all`}
            >
              {/* Comment Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white">{comment.author}</div>
                    <div className="text-sm text-gray-400">{comment.timestamp}</div>
                  </div>
                </div>
                
                {comment.status === 'pending' && (
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded-full">
                    Pending Review
                  </span>
                )}
              </div>

              {/* Comment Content */}
              <p className="text-gray-300 mb-4">{comment.content}</p>

              {/* Comment Actions */}
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={() => handleLike(comment.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    likedComments.includes(comment.id)
                      ? 'bg-amber-500/20 text-amber-500'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ThumbsUp className={`w-5 h-5 ${likedComments.includes(comment.id) ? 'fill-amber-500' : ''}`} />
                  <span>{comment.likes}</span>
                </motion.button>

                <motion.button
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Flag className="w-5 h-5" />
                  <span>Report</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-2xl p-6"
        >
          <h3 className="text-xl mb-4">Community Guidelines</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start space-x-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Be respectful and courteous to other members</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>No spam, advertising, or self-promotion</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Keep discussions relevant to sports and predictions</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>All comments are moderated before approval</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Report inappropriate content using the flag button</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
