import { useState } from 'react';
import { motion } from 'motion/react';
import { Crown, Check, Zap, Star, Shield, CreditCard, Smartphone, DollarSign, Bitcoin, Target, TrendingUp } from 'lucide-react';

interface VIPMembershipProps {
  isAuthenticated: boolean;
  openAuthModal: (mode: 'login' | 'signup') => void;
}

export function VIPMembership({ isAuthenticated, openAuthModal }: VIPMembershipProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '29.99',
      period: 'month',
      color: 'from-blue-500 to-blue-600',
      popular: false,
      savings: null,
    },
    {
      id: 'quarterly',
      name: 'Quarterly',
      price: '74.99',
      period: '3 months',
      color: 'from-purple-500 to-purple-600',
      popular: true,
      savings: '17%',
    },
    {
      id: 'annual',
      name: 'Annual',
      price: '249.99',
      period: 'year',
      color: 'from-amber-500 to-amber-600',
      popular: false,
      savings: '30%',
    },
  ];

  const features = [
    { icon: Target, text: 'Exclusive VIP Predictions' },
    { icon: Zap, text: 'Priority Access to Banker Tips' },
    { icon: Star, text: 'Advanced Analytics & Statistics' },
    { icon: Shield, text: 'Higher Success Rate Predictions' },
    { icon: Crown, text: 'Dedicated VIP Support' },
    { icon: Smartphone, text: 'Mobile App Access' },
    { icon: Check, text: 'Early Access to New Features' },
    { icon: TrendingUp, text: 'Personalized Betting Strategies' },
  ];

  const paymentMethods = [
    { id: 'visa', name: 'Visa', icon: CreditCard, color: 'from-blue-600 to-blue-700' },
    { id: 'mastercard', name: 'Mastercard', icon: CreditCard, color: 'from-red-600 to-red-700' },
    { id: 'paypal', name: 'PayPal', icon: DollarSign, color: 'from-blue-500 to-blue-600' },
    { id: 'apple', name: 'Apple Pay', icon: Smartphone, color: 'from-gray-700 to-gray-800' },
    { id: 'google', name: 'Google Pay', icon: Smartphone, color: 'from-green-500 to-green-600' },
    { id: 'crypto', name: 'Crypto', icon: Bitcoin, color: 'from-orange-500 to-orange-600' },
  ];

  const handleSelectPlan = (planId: string) => {
    if (!isAuthenticated) {
      openAuthModal('signup');
      return;
    }
    setSelectedPlan(planId);
    setShowPayment(true);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-amber-500 blur-3xl opacity-50 rounded-full"
              />
              <Crown className="w-20 h-20 text-amber-500 relative" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
            VIP Membership
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock exclusive predictions and premium features to maximize your winning potential
          </p>
        </motion.div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-gradient-to-br from-gray-900 to-black border rounded-2xl p-8 ${
                plan.popular ? 'border-amber-500' : 'border-amber-500/20'
              }`}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-sm shadow-lg"
                >
                  Most Popular
                </motion.div>
              )}

              {/* Savings Badge */}
              {plan.savings && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 rounded-full text-sm">
                  Save {plan.savings}
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl mb-4">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-5xl text-amber-500">${plan.price}</span>
                </div>
                <div className="text-gray-400">per {plan.period}</div>
              </div>

              <motion.button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-4 rounded-xl mb-6 bg-gradient-to-r ${plan.color} hover:shadow-lg transition-all`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Choose Plan
              </motion.button>

              <div className="space-y-3">
                {features.slice(0, 5).map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="flex items-center space-x-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-amber-500" />
                      </div>
                      <span className="text-gray-300">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* All Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl text-center mb-8">Everything Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition-all"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-300">{feature.text}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Payment Methods */}
        {showPayment && selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-2xl p-8 mb-12"
          >
            <h2 className="text-3xl text-center mb-8">Choose Payment Method</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {paymentMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.button
                    key={method.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative group"
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`bg-gradient-to-br ${method.color} rounded-xl p-6 text-center`}>
                      <Icon className="w-8 h-8 text-white mx-auto mb-2" />
                      <div className="text-sm text-white">{method.name}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Payment Form */}
            <div className="max-w-md mx-auto space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg focus:border-amber-500 focus:outline-none text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg focus:border-amber-500 focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 bg-black/50 border border-amber-500/30 rounded-lg focus:border-amber-500 focus:outline-none text-white"
                  />
                </div>
              </div>
              
              <motion.button
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl text-lg hover:shadow-2xl hover:shadow-amber-500/50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Complete Payment
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Money-back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-500/30 rounded-2xl p-8 text-center"
        >
          <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl mb-2">30-Day Money-Back Guarantee</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Try OptikGoal VIP risk-free. If you're not completely satisfied within the first 30 days, 
            we'll refund your money—no questions asked.
          </p>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h2 className="text-3xl text-center mb-8">What Our VIP Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'John D.', rating: 5, text: 'Best investment I\'ve made! The VIP predictions are spot on.' },
              { name: 'Sarah M.', rating: 5, text: 'Increased my win rate by 40% since joining VIP. Highly recommended!' },
              { name: 'Mike R.', rating: 5, text: 'The exclusive tips and analytics are worth every penny. Amazing service!' },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-xl p-6"
              >
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                <p className="text-amber-500">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}