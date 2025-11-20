import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Crown,
  LogOut,
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  Plus,
  Edit,
  Trash2,
  Bell,
  MessageSquare,
  Menu,
  X,
  ChevronRight,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Eye,
  Filter,
  Search,
  Check,
  XCircle,
  Clock,
  AlertCircle,
  Shield,
  Zap,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

interface AdminPanelProps {
  onLogout: () => void;
}

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'from-blue-500 to-blue-600' },
    { id: 'users', label: 'User Management', icon: Users, color: 'from-amber-500 to-amber-600' },
    { id: 'predictions', label: 'Predictions', icon: Target, color: 'from-green-500 to-green-600' },
    { id: 'comments', label: 'Comments', icon: MessageSquare, color: 'from-purple-500 to-purple-600' },
    { id: 'payouts', label: 'Payouts', icon: DollarSign, color: 'from-emerald-500 to-emerald-600' },
    { id: 'reports', label: 'Reports', icon: FileText, color: 'from-orange-500 to-orange-600' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'from-gray-500 to-gray-600' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'users':
        return <UserManagementContent />;
      case 'predictions':
        return <PredictionsContent />;
      case 'comments':
        return <CommentsContent />;
      case 'payouts':
        return <PayoutsContent />;
      case 'reports':
        return <ReportsContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed lg:sticky top-0 h-screen w-72 bg-gradient-to-b from-gray-900 via-black to-gray-900 border-r border-amber-500/20 z-50 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-amber-500/20">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-amber-500 blur-xl opacity-50"
              />
              <div className="relative w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                <Crown className="w-7 h-7 text-black" />
              </div>
            </div>
            <div>
              <h2 className="text-xl bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
                Admin Panel
              </h2>
              <p className="text-xs text-gray-400">OptikGoal Control Center</p>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveSection(item.id)}
                className={`w-full group relative overflow-hidden rounded-xl transition-all ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeSidebar"
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-xl`}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {!isActive && (
                  <div className="absolute inset-0 bg-gray-800/30 rounded-xl group-hover:bg-gray-800/50 transition-colors" />
                )}

                {/* Content */}
                <div className="relative flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-amber-500'} transition-colors`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  )}
                </div>

                {/* Glow effect */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-amber-500/20">
          <motion.button
            onClick={onLogout}
            className="w-full relative group overflow-hidden rounded-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 group-hover:from-red-500/30 group-hover:to-red-600/30 transition-all rounded-xl" />
            <div className="relative flex items-center justify-center space-x-2 p-4 text-red-400 group-hover:text-red-300 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Sidebar Toggle */}
      <motion.button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 lg:hidden z-50 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-xl shadow-amber-500/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {sidebarOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
      </motion.button>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Dashboard Content Component
function DashboardContent() {
  const stats = [
    { id: 1, label: 'Total Users', value: '12,486', change: '+12.5%', icon: Users, color: 'from-blue-500 to-blue-600', positive: true },
    { id: 2, label: 'VIP Members', value: '2,847', change: '+8.2%', icon: Crown, color: 'from-amber-500 to-amber-600', positive: true },
    { id: 3, label: 'Active Predictions', value: '156', change: '+23.1%', icon: Target, color: 'from-green-500 to-green-600', positive: true },
    { id: 4, label: 'Monthly Revenue', value: '$48,392', change: '+15.8%', icon: DollarSign, color: 'from-emerald-500 to-emerald-600', positive: true },
    { id: 5, label: 'Total Comments', value: '8,932', change: '+5.4%', icon: MessageSquare, color: 'from-purple-500 to-purple-600', positive: true },
    { id: 6, label: 'Success Rate', value: '87.4%', change: '+2.1%', icon: TrendingUp, color: 'from-green-500 to-green-600', positive: true },
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'Upgraded to VIP', time: '2 minutes ago', type: 'upgrade', icon: Crown },
    { id: 2, user: 'Jane Smith', action: 'Posted a comment', time: '5 minutes ago', type: 'comment', icon: MessageSquare },
    { id: 3, user: 'Mike Johnson', action: 'New user registered', time: '12 minutes ago', type: 'new', icon: UserCheck },
    { id: 4, user: 'Sarah Wilson', action: 'Made a prediction', time: '18 minutes ago', type: 'prediction', icon: Target },
    { id: 5, user: 'Tom Brown', action: 'Requested payout', time: '25 minutes ago', type: 'payout', icon: DollarSign },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl mb-2 bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-400">Welcome back, Admin. Here's what's happening today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative group overflow-hidden rounded-2xl"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-2xl" />
              
              {/* Glow effect */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className={`absolute -inset-1 bg-gradient-to-r ${stat.color} blur-2xl opacity-0 group-hover:opacity-30 transition-opacity`}
              />

              {/* Content */}
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <motion.div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      stat.positive 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 + 0.3 }}
                  >
                    {stat.change}
                  </motion.div>
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl text-white">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-2xl" />
        
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Activity className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl">Recent Activity</h2>
            </div>
            <motion.button
              className="text-sm text-amber-500 hover:text-amber-400 transition-colors"
              whileHover={{ x: 5 }}
            >
              View All
            </motion.button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-center space-x-4 p-4 bg-black/30 rounded-xl hover:bg-black/50 transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-lg flex items-center justify-center group-hover:from-amber-500/30 group-hover:to-amber-600/30 transition-colors">
                    <Icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white">
                      <span className="font-medium">{activity.user}</span>
                      {' '}
                      <span className="text-gray-400">{activity.action}</span>
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-amber-500 transition-colors" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// User Management Content Component
function UserManagementContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'VIP', joinDate: '2024-01-15', lastActive: '2 hours ago', avatar: '👤' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Regular', joinDate: '2024-02-20', lastActive: '1 day ago', avatar: '👤' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'VIP', joinDate: '2024-01-08', lastActive: '30 mins ago', avatar: '👤' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'Regular', joinDate: '2024-03-12', lastActive: '3 hours ago', avatar: '👤' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', status: 'Banned', joinDate: '2024-02-05', lastActive: '1 week ago', avatar: '👤' },
    { id: 6, name: 'Emma Davis', email: 'emma@example.com', status: 'VIP', joinDate: '2023-12-20', lastActive: '5 mins ago', avatar: '👤' },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl mb-2 bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-gray-400">Manage and monitor all registered users</p>
        </div>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center space-x-2 hover:shadow-xl hover:shadow-amber-500/50 transition-all"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          <span>Add User</span>
        </motion.button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-amber-500/20 rounded-xl text-white placeholder-gray-500 focus:border-amber-500/50 focus:outline-none transition-colors"
          />
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {['all', 'VIP', 'Regular', 'Banned'].map((status) => (
            <motion.button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-6 py-3 rounded-xl transition-all ${
                filterStatus === status
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
                  : 'bg-gray-900 text-gray-400 hover:text-white border border-amber-500/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status === 'all' ? 'All Users' : status}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-2xl" />
        
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-amber-500/20">
                <th className="text-left p-6 text-gray-400 font-medium">User</th>
                <th className="text-left p-6 text-gray-400 font-medium">Status</th>
                <th className="text-left p-6 text-gray-400 font-medium">Join Date</th>
                <th className="text-left p-6 text-gray-400 font-medium">Last Active</th>
                <th className="text-right p-6 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-800 hover:bg-black/30 transition-colors group"
                >
                  <td className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-2xl">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'VIP' 
                        ? 'bg-amber-500/20 text-amber-400' 
                        : user.status === 'Regular'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-6 text-gray-400">{user.joinDate}</td>
                  <td className="p-6 text-gray-400">{user.lastActive}</td>
                  <td className="p-6">
                    <div className="flex items-center justify-end space-x-2">
                      <motion.button
                        className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        className="p-2 bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

// Predictions Content Component
function PredictionsContent() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
        Predictions Management
      </h1>
      <p className="text-gray-400">Manage AI-powered predictions and categories</p>
      {/* Add prediction management content here */}
    </div>
  );
}

// Comments Content Component
function CommentsContent() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
        Comments Management
      </h1>
      <p className="text-gray-400">Monitor and moderate user comments</p>
      {/* Add comments management content here */}
    </div>
  );
}

// Payouts Content Component
function PayoutsContent() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
        Payouts Management
      </h1>
      <p className="text-gray-400">Process and track user payouts</p>
      {/* Add payouts management content here */}
    </div>
  );
}

// Reports Content Component
function ReportsContent() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
        Reports & Analytics
      </h1>
      <p className="text-gray-400">View detailed reports and statistics</p>
      {/* Add reports content here */}
    </div>
  );
}

// Settings Content Component
function SettingsContent() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
        System Settings
      </h1>
      <p className="text-gray-400">Configure system preferences and options</p>
      {/* Add settings content here */}
    </div>
  );
}
