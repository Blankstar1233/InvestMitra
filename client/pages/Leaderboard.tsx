import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Medal,
  Crown,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Star,
  UserPlus,
  UserMinus,
  Calendar,
  Award,
  BarChart3,
  Search,
  Zap,
  Shield,
  ArrowUp,
  ArrowDown,
  Minus,
  Bot,
  Brain,
  Lightbulb,
  Eye,
  Filter,
  Timer,
  Flame,
  Gift
} from "lucide-react";

// Mock data - using the same structure as your original
const MOCK_USERS = [
  {
    id: 'user1',
    username: 'TradingPro',
    rank: 1,
    totalReturn: 25000,
    totalReturnPercent: 25.0,
    portfolioValue: 125000,
    winRate: 78,
    sharpeRatio: 2.1,
    maxDrawdown: 3.2,
    consistencyScore: 92,
    tradingFrequency: 'MEDIUM',
    riskProfile: 'MODERATE',
    joinedDate: Date.now() - 90 * 24 * 60 * 60 * 1000,
    achievements: ['first-trade', 'profitable-month', 'risk-master'],
    badges: [
      {
        id: 'top-trader',
        name: 'Top Trader',
        description: 'Ranked #1 for 30 days',
        icon: '👑',
        rarity: 'LEGENDARY',
        earnedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
      }
    ],
    followers: 1247,
    following: 23,
    avatar: '🏆',
    streak: 12,
    aiScore: 95
  },
  {
    id: 'user2',
    username: 'ValueInvestor',
    rank: 2,
    totalReturn: 22000,
    totalReturnPercent: 22.0,
    portfolioValue: 122000,
    winRate: 72,
    sharpeRatio: 1.8,
    maxDrawdown: 5.1,
    consistencyScore: 88,
    tradingFrequency: 'LOW',
    riskProfile: 'CONSERVATIVE',
    joinedDate: Date.now() - 120 * 24 * 60 * 60 * 1000,
    achievements: ['patient-investor', 'low-risk-master'],
    badges: [
      {
        id: 'value-hunter',
        name: 'Value Hunter',
        description: 'Expert at finding undervalued stocks',
        icon: '🔍',
        rarity: 'EPIC',
        earnedAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
      }
    ],
    followers: 892,
    following: 45,
    avatar: '📊',
    streak: 8,
    aiScore: 87
  },
  {
    id: 'user3',
    username: 'TechStockGuru',
    rank: 3,
    totalReturn: 20500,
    totalReturnPercent: 20.5,
    portfolioValue: 120500,
    winRate: 75,
    sharpeRatio: 1.9,
    maxDrawdown: 8.7,
    consistencyScore: 85,
    tradingFrequency: 'HIGH',
    riskProfile: 'AGGRESSIVE',
    joinedDate: Date.now() - 60 * 24 * 60 * 60 * 1000,
    achievements: ['tech-specialist', 'momentum-trader'],
    badges: [
      {
        id: 'tech-expert',
        name: 'Tech Expert',
        description: 'Specializes in technology stocks',
        icon: '💻',
        rarity: 'RARE',
        earnedAt: Date.now() - 21 * 24 * 60 * 60 * 1000,
      }
    ],
    followers: 634,
    following: 67,
    avatar: '⚡',
    streak: 15,
    aiScore: 82
  },
  {
    id: 'user4',
    username: 'ConservativeKevin',
    rank: 4,
    totalReturn: 18000,
    totalReturnPercent: 18.0,
    portfolioValue: 118000,
    winRate: 85,
    sharpeRatio: 2.5,
    maxDrawdown: 2.1,
    consistencyScore: 95,
    tradingFrequency: 'LOW',
    riskProfile: 'CONSERVATIVE',
    joinedDate: Date.now() - 180 * 24 * 60 * 60 * 1000,
    achievements: ['steady-eddie', 'low-risk-master'],
    badges: [
      {
        id: 'stability',
        name: 'Stability Master',
        description: 'Consistent low-risk returns',
        icon: '🛡️',
        rarity: 'EPIC',
        earnedAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
      }
    ],
    followers: 445,
    following: 12,
    avatar: '🛡️',
    streak: 25,
    aiScore: 91
  },
  {
    id: 'user5',
    username: 'AggressiveAnna',
    rank: 5,
    totalReturn: 17500,
    totalReturnPercent: 17.5,
    portfolioValue: 117500,
    winRate: 55,
    sharpeRatio: 1.2,
    maxDrawdown: 15.8,
    consistencyScore: 70,
    tradingFrequency: 'HIGH',
    riskProfile: 'AGGRESSIVE',
    joinedDate: Date.now() - 45 * 24 * 60 * 60 * 1000,
    achievements: ['risk-taker', 'high-volume'],
    badges: [
      {
        id: 'momentum',
        name: 'Momentum Trader',
        description: 'Masters high-frequency trading',
        icon: '⚡',
        rarity: 'RARE',
        earnedAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
      }
    ],
    followers: 723,
    following: 89,
    avatar: '⚡',
    streak: 6,
    aiScore: 76
  },
  {
    id: 'current-user',
    username: 'You',
    rank: 47,
    totalReturn: -1250,
    totalReturnPercent: -1.25,
    portfolioValue: 98750,
    winRate: 45,
    sharpeRatio: 0.3,
    maxDrawdown: 8.5,
    consistencyScore: 60,
    tradingFrequency: 'MEDIUM',
    riskProfile: 'MODERATE',
    joinedDate: Date.now() - 7 * 24 * 60 * 60 * 1000,
    achievements: ['first-trade'],
    badges: [
      {
        id: 'newcomer',
        name: 'Newcomer',
        description: 'Welcome to InvestMitra!',
        icon: '🌟',
        rarity: 'COMMON',
        earnedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
      }
    ],
    followers: 12,
    following: 8,
    avatar: '👤',
    streak: 3,
    aiScore: 45
  }
];

const MOCK_COMPETITIONS = [
  {
    id: 'ai-challenge',
    title: 'AI Trading Challenge 2024',
    description: 'Compete using AI-powered strategies for the highest returns',
    startDate: new Date(2024, 0, 1).getTime(),
    endDate: new Date(2024, 0, 31).getTime(),
    status: 'ACTIVE',
    participants: 3247,
    prize: '₹1,00,000 + AI Premium Access',
    rules: [
      'AI recommendations must be used for at least 50% of trades',
      'Portfolio must be at least 80% invested',
      'Maximum 20% allocation per stock'
    ],
    type: 'AI_POWERED',
    leaderboard: [
      { userId: 'user1', username: 'TradingPro', rank: 1, score: 12.5, change: 0, aiUsage: 85 },
      { userId: 'user2', username: 'ValueInvestor', rank: 2, score: 10.2, change: 1, aiUsage: 92 },
      { userId: 'user3', username: 'TechStockGuru', rank: 3, score: 8.8, change: -1, aiUsage: 78 },
      { userId: 'current-user', username: 'You', rank: 156, score: -0.8, change: 12, aiUsage: 45 },
    ],
  }
];

export default function EnhancedLeaderboard() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [competitions, setCompetitions] = useState(MOCK_COMPETITIONS);
  const [followedUsers, setFollowedUsers] = useState(['user1', 'user2']);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [aiInsights, setAiInsights] = useState(null);
  const [showAiPanel, setShowAiPanel] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const currentUser = users.find(user => user.id === 'current-user');

  // Filter users based on activeFilter
  const getFilteredUsers = () => {
    let filtered = users.filter(user => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'conservative') return user.riskProfile === 'CONSERVATIVE';
      if (activeFilter === 'moderate') return user.riskProfile === 'MODERATE';
      if (activeFilter === 'aggressive') return user.riskProfile === 'AGGRESSIVE';
      if (activeFilter === 'following') return followedUsers.includes(user.id);
      return true;
    });

    // Sort by rank
    return filtered.sort((a, b) => a.rank - b.rank);
  };

  const filteredUsers = getFilteredUsers();
  const topTraders = filteredUsers
    .filter(user => user.id !== 'current-user')
    .slice(0, 10);

  const handleFollow = (userId, username) => {
    setFollowedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = users.filter(user =>
        user.username.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'LEGENDARY': return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white';
      case 'EPIC': return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white';
      case 'RARE': return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      default: return 'bg-slate-600 text-slate-200';
    }
  };

  const generateAiInsights = () => {
    const insights = [
      {
        type: 'performance',
        title: 'Performance Analysis',
        description: `Based on your trading patterns, you're showing improvement in risk management. Your Sharpe ratio has increased by 15% this week.`,
        confidence: 87,
        icon: <BarChart3 className="h-4 w-4" />
      },
      {
        type: 'recommendation',
        title: 'Strategy Suggestion',
        description: 'Consider following ValueInvestor\'s conservative approach. Their risk profile matches your recent preferences.',
        confidence: 92,
        icon: <Lightbulb className="h-4 w-4" />
      },
      {
        type: 'opportunity',
        title: 'Ranking Opportunity',
        description: 'You could climb 12 positions by improving your consistency score by just 5 points.',
        confidence: 78,
        icon: <Target className="h-4 w-4" />
      }
    ];
    setAiInsights(insights);
    setShowAiPanel(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Enhanced Header - Theme Responsive */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-800 p-8 text-white border border-slate-700">
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  <Trophy className="h-10 w-10 text-green-600" />
                  InvestMitra Leaderboard
                </h1>
                <p className="text-xl text-slate-300">
                  Compete globally • Earn rewards • Grow together
                </p>
                {currentUser && (
                  <div className="mt-4 flex items-center gap-4">
                    <Badge className="bg-green-600 text-white border-green-500 text-lg px-4 py-2">
                      <Medal className="h-4 w-4 mr-2" />
                      Rank #{currentUser.rank}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-slate-300">Streak: {currentUser.streak} days</span>
                    </div>
                  </div>
                )}
              </div>

              {/* AI Assistant Button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={generateAiInsights}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  <Bot className="h-5 w-5 mr-2" />
                  AI Trading Assistant
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-slate-500 text-slate-300 hover:bg-slate-700"
                  size="lg"
                >
                  <Gift className="h-5 w-5 mr-2" />
                  Claim Rewards
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        {showAiPanel && aiInsights && (
          <Card className="border border-green-500/50 bg-white dark:bg-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-green-600" />
                <CardTitle className="text-green-600">AI Trading Insights</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAiPanel(false)}
                className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                ×
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-600">{insight.icon}</span>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-slate-200">{insight.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-slate-300 mb-3">
                      {insight.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-slate-400">Confidence</span>
                      <div className="flex items-center gap-2">
                        <Progress value={insight.confidence} className="w-16 h-2 bg-gray-200 dark:bg-slate-600" />
                        <span className="text-xs font-medium text-green-600">{insight.confidence}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Stats Grid - Theme Responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Global Rank',
              value: currentUser ? `#${currentUser.rank}` : '#--',
              change: '+3',
              icon: Trophy,
              color: 'text-yellow-600'
            },
            {
              title: 'AI Score',
              value: currentUser ? currentUser.aiScore : '--',
              change: '+12',
              icon: Brain,
              color: 'text-purple-600'
            },
            {
              title: 'Win Streak',
              value: currentUser ? `${currentUser.streak} days` : '--',
              change: '+2',
              icon: Flame,
              color: 'text-orange-600'
            },
            {
              title: 'Network',
              value: currentUser ? `${currentUser.followers}` : '--',
              change: '+24',
              icon: Users,
              color: 'text-blue-600'
            }
          ].map((stat, index) => (
            <Card key={index} className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <Badge className="text-xs bg-green-600 text-white">
                    {stat.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Tabs - Theme Responsive */}
        <Tabs defaultValue="global" className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <TabsList className="grid grid-cols-5 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl border border-gray-300 dark:border-slate-600">
              <TabsTrigger value="global" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-600 dark:text-slate-400">
                Global
              </TabsTrigger>
              <TabsTrigger value="ai-competitions" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-600 dark:text-slate-400">
                AI Contests
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-600 dark:text-slate-400">
                Achievements
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-600 dark:text-slate-400">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="social" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-600 dark:text-slate-400">
                Social
              </TabsTrigger>
            </TabsList>

            {/* Filter Controls */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500 dark:text-slate-400" />
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Traders</option>
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
                <option value="following">Following</option>
              </select>
            </div>
          </div>

          {/* Global Rankings Tab */}
          <TabsContent value="global" className="space-y-6">
            {/* Hall of Fame - Theme Responsive */}
            <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 border-b border-gray-200 dark:border-slate-600">
                <CardTitle className="flex items-center gap-2 text-2xl text-blue-600 dark:text-blue-400">
                  <Crown className="h-6 w-6" />
                  Hall of Fame
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-slate-300">Champions of InvestMitra trading platform</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topTraders.slice(0, 3).map((trader, index) => (
                    <Card
                      key={trader.id}
                      className={`border ${index === 0
                        ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-600/30 dark:to-blue-800/30 border-blue-300 dark:border-blue-500/60'
                        : index === 1
                          ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-600/25 dark:to-indigo-800/25 border-indigo-300 dark:border-indigo-500/50'
                          : 'bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-600/25 dark:to-cyan-800/25 border-cyan-300 dark:border-cyan-500/50'
                        }`}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="space-y-4">
                          {/* Rank Icon */}
                          <div className="flex items-center justify-center">
                            {index === 0 ? (
                              <Crown className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                            ) : index === 1 ? (
                              <Medal className="h-14 w-14 text-indigo-600 dark:text-indigo-300" />
                            ) : (
                              <Award className="h-12 w-12 text-cyan-600 dark:text-cyan-400" />
                            )}
                          </div>

                          {/* Trader Info */}
                          <div>
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <span className="text-2xl">{trader.avatar}</span>
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{trader.username}</h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-slate-300">Rank #{trader.rank}</p>
                          </div>

                          {/* Performance */}
                          <div className="space-y-2">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                              +{trader.totalReturnPercent}%
                            </div>
                            <div className="text-sm text-gray-700 dark:text-slate-200">
                              {formatCurrency(trader.portfolioValue)}
                            </div>
                            <div className="flex justify-center gap-4 text-xs text-gray-600 dark:text-slate-300">
                              <span>Win: {trader.winRate}%</span>
                              <span>AI: {trader.aiScore}</span>
                            </div>
                          </div>

                          {/* Follow Button */}
                          <Button
                            size="sm"
                            onClick={() => handleFollow(trader.id, trader.username)}
                            className={`w-full ${followedUsers.includes(trader.id)
                              ? 'bg-gray-500 text-white hover:bg-gray-600 dark:bg-slate-600 dark:text-slate-300 dark:hover:bg-slate-700'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                          >
                            {followedUsers.includes(trader.id) ? (
                              <>
                                <UserMinus className="h-3 w-3 mr-1" />
                                Unfollow
                              </>
                            ) : (
                              <>
                                <UserPlus className="h-3 w-3 mr-1" />
                                Follow
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Full Rankings - Theme Responsive */}
            <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-900 dark:text-white">
                  <span className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Global Rankings
                    {activeFilter !== 'all' && (
                      <Badge className="bg-green-600 text-white ml-2">
                        {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Filter
                      </Badge>
                    )}
                  </span>
                  <Badge variant="outline" className="border-gray-300 dark:border-slate-500 text-gray-600 dark:text-slate-300">{filteredUsers.length} traders</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredUsers.slice(0, 10).map((trader) => (
                    <div
                      key={trader.id}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 border ${trader.id === 'current-user'
                        ? 'bg-green-50 dark:bg-green-600/10 border-green-300 dark:border-green-500/50 shadow-lg shadow-green-500/10'
                        : 'bg-gray-50 dark:bg-slate-700/80 border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 hover:border-gray-300 dark:hover:border-slate-500'
                        }`}
                    >
                      {/* Rank & Avatar */}
                      <div className="text-center min-w-[60px]">
                        <div className={`text-xl font-bold ${trader.id === 'current-user' ? 'text-green-600' : 'text-gray-700 dark:text-slate-200'}`}>
                          #{trader.rank}
                        </div>
                        <span className="text-2xl">{trader.avatar}</span>
                      </div>

                      {/* Trader Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-bold text-lg truncate ${trader.id === 'current-user' ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                            {trader.username}
                          </h3>
                          {trader.badges.length > 0 && (
                            <span className="text-lg">{trader.badges[0].icon}</span>
                          )}
                          <Badge
                            variant="outline"
                            className={`text-xs ${trader.riskProfile === 'CONSERVATIVE' ? 'border-blue-300 text-blue-700 bg-blue-50 dark:border-blue-500/50 dark:text-blue-300 dark:bg-blue-900/30' :
                              trader.riskProfile === 'MODERATE' ? 'border-yellow-300 text-yellow-700 bg-yellow-50 dark:border-yellow-500/50 dark:text-yellow-300 dark:bg-yellow-900/30' :
                                'border-red-300 text-red-700 bg-red-50 dark:border-red-500/50 dark:text-red-300 dark:bg-red-900/30'
                              }`}
                          >
                            {trader.riskProfile}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-slate-300">
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            Win: {trader.winRate}%
                          </span>
                          <span className="flex items-center gap-1">
                            <Brain className="h-3 w-3" />
                            AI: {trader.aiScore}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {trader.followers}
                          </span>
                        </div>
                      </div>

                      {/* Performance & Actions */}
                      <div className="text-right">
                        <div className={`text-lg font-bold ${trader.totalReturnPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {trader.totalReturnPercent >= 0 ? '+' : ''}{trader.totalReturnPercent}%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-slate-400 mb-2">
                          {formatCurrency(trader.portfolioValue)}
                        </div>
                        {trader.id !== 'current-user' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleFollow(trader.id, trader.username)}
                            className={`text-xs ${followedUsers.includes(trader.id)
                              ? 'border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-slate-500 dark:text-slate-400 dark:hover:bg-slate-600'
                              : 'border-green-300 text-green-600 hover:bg-green-50 dark:border-green-500/50 dark:text-green-400 dark:hover:bg-green-900/20'
                              }`}
                          >
                            {followedUsers.includes(trader.id) ? 'Unfollow' : 'Follow'}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Competitions Tab */}
          <TabsContent value="ai-competitions" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/40 dark:to-blue-900/40 border-b border-gray-200 dark:border-slate-600">
                <CardTitle className="flex items-center gap-2 text-2xl text-purple-600 dark:text-purple-400">
                  <Bot className="h-6 w-6" />
                  AI Trading Competitions
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-slate-300">
                  Compete using AI-powered strategies and win exclusive prizes
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {competitions.map((competition) => (
                  <div key={competition.id} className="space-y-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Competition Details */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-purple-600 text-white px-3 py-1">
                            ACTIVE
                          </Badge>
                          <Badge variant="outline" className="border-purple-300 text-purple-700 dark:border-purple-500/50 dark:text-purple-300">
                            {competition.participants.toLocaleString()} participants
                          </Badge>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {competition.title}
                          </h3>
                          <p className="text-gray-600 dark:text-slate-300 mb-4">
                            {competition.description}
                          </p>

                          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-500/30">
                            <div className="flex items-center gap-2 mb-2">
                              <Gift className="h-5 w-5 text-yellow-600" />
                              <span className="font-semibold text-yellow-800 dark:text-yellow-300">Prize Pool</span>
                            </div>
                            <p className="text-lg font-bold text-yellow-800 dark:text-yellow-300">
                              {competition.prize}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">Competition Rules:</h4>
                          <ul className="space-y-1">
                            {competition.rules.map((rule, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-slate-300">
                                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                                {rule}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Competition Timer */}
                      <div className="lg:w-80">
                        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 border-purple-200 dark:border-purple-500/50">
                          <CardContent className="p-6 text-center">
                            <Timer className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600 dark:text-slate-300">Time Remaining</p>
                              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                24 Days 16 Hours
                              </div>
                              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4">
                                Join Competition
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Competition Leaderboard */}
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-600" />
                        Competition Leaderboard
                      </h4>
                      <div className="space-y-3">
                        {competition.leaderboard.map((entry, index) => (
                          <div
                            key={entry.userId}
                            className={`flex items-center gap-4 p-4 rounded-lg border ${entry.userId === 'current-user'
                              ? 'bg-green-50 dark:bg-green-600/10 border-green-300 dark:border-green-500/50'
                              : 'bg-gray-50 dark:bg-slate-700/80 border-gray-200 dark:border-slate-600'
                              }`}
                          >
                            <div className="text-center min-w-[40px]">
                              <div className={`font-bold ${index < 3 ? 'text-yellow-600' : 'text-gray-700 dark:text-slate-200'}`}>
                                #{entry.rank}
                              </div>
                              {entry.change > 0 && <ArrowUp className="h-3 w-3 text-green-600 mx-auto" />}
                              {entry.change < 0 && <ArrowDown className="h-3 w-3 text-red-600 mx-auto" />}
                              {entry.change === 0 && <Minus className="h-3 w-3 text-gray-400 mx-auto" />}
                            </div>

                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-white">{entry.username}</div>
                              <div className="text-sm text-gray-600 dark:text-slate-300">
                                AI Usage: {entry.aiUsage}%
                              </div>
                            </div>

                            <div className="text-right">
                              <div className={`font-bold ${entry.score >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {entry.score >= 0 ? '+' : ''}{entry.score}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Trading Tips */}
            <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  AI Trading Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      tip: "Use AI sentiment analysis to gauge market mood before making trades",
                      confidence: "High Impact"
                    },
                    {
                      tip: "Combine AI recommendations with your own research for better results",
                      confidence: "Proven Strategy"
                    },
                    {
                      tip: "Set stop-losses even when following AI predictions",
                      confidence: "Risk Management"
                    },
                    {
                      tip: "Monitor AI model performance regularly to ensure consistency",
                      confidence: "Best Practice"
                    }
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-600 dark:border-yellow-400">
                      <p className="text-sm mb-2 text-gray-700 dark:text-slate-200">{item.tip}</p>
                      <Badge variant="outline" className="text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 border-yellow-600 dark:border-yellow-400/50">
                        {item.confidence}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                  <Award className="h-6 w-6" />
                  Achievement Gallery
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-slate-300">Rare achievements and badges from the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      name: "AI Master",
                      description: "Achieved 90%+ AI trading score",
                      icon: "🤖",
                      rarity: "LEGENDARY",
                      holders: 3,
                      requirements: ["AI Score > 90", "50+ AI trades", "Positive returns"]
                    },
                    {
                      name: "Diamond Hands",
                      description: "Hold positions for 30+ days consistently",
                      icon: "💎",
                      rarity: "EPIC",
                      holders: 12,
                      requirements: ["30+ day holds", "3+ consecutive months", "Positive performance"]
                    },
                    {
                      name: "Risk Ninja",
                      description: "Maintain low drawdown with high returns",
                      icon: "🥷",
                      rarity: "RARE",
                      holders: 45,
                      requirements: ["Max drawdown < 5%", "Returns > 15%", "Sharpe ratio > 2.0"]
                    },
                    {
                      name: "Social Butterfly",
                      description: "Build a strong trading community",
                      icon: "🦋",
                      rarity: "RARE",
                      holders: 28,
                      requirements: ["1000+ followers", "Active engagement", "Helpful content"]
                    },
                    {
                      name: "Streak Master",
                      description: "Maintain winning streaks",
                      icon: "🔥",
                      rarity: "EPIC",
                      holders: 8,
                      requirements: ["30+ day win streak", "Consistent performance", "No major losses"]
                    },
                    {
                      name: "Market Prophet",
                      description: "Predict major market moves",
                      icon: "🔮",
                      rarity: "LEGENDARY",
                      holders: 1,
                      requirements: ["Predict 3 major events", "95%+ accuracy", "Community verified"]
                    }
                  ].map((achievement, index) => (
                    <Card key={index} className={`relative overflow-hidden ${getRarityColor(achievement.rarity)}`}>
                      <CardContent className="p-6">
                        <div className="text-center space-y-3">
                          <div className="text-4xl">{achievement.icon}</div>
                          <h3 className="font-bold text-lg">{achievement.name}</h3>
                          <p className="text-sm opacity-90">{achievement.description}</p>
                          <Badge className="bg-white/20 text-current border-white/30">
                            {achievement.rarity}
                          </Badge>
                          <div className="text-xs opacity-75">
                            {achievement.holders} holders
                          </div>
                          <div className="mt-4 text-left">
                            <p className="text-xs font-medium mb-2">Requirements:</p>
                            <ul className="text-xs space-y-1 opacity-90">
                              {achievement.requirements.map((req, i) => (
                                <li key={i} className="flex items-center gap-1">
                                  <span className="w-1 h-1 bg-current rounded-full"></span>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Distribution */}
              <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Performance Distribution</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-slate-400">How traders are performing across different ranges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { range: "25%+", count: 5, percentage: 8.3, color: "bg-green-500" },
                      { range: "15-25%", count: 12, percentage: 20, color: "bg-green-400" },
                      { range: "5-15%", count: 18, percentage: 30, color: "bg-yellow-400" },
                      { range: "0-5%", count: 15, percentage: 25, color: "bg-yellow-300" },
                      { range: "Below 0%", count: 10, percentage: 16.7, color: "bg-red-400" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-20 text-sm font-medium text-gray-700 dark:text-slate-300">{item.range}</div>
                        <div className="flex-1 bg-gray-200 dark:bg-slate-700 rounded-full h-6 relative overflow-hidden">
                          <div
                            className={`${item.color} h-full transition-all duration-1000`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                            {item.count} traders ({item.percentage}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trading Styles */}
              <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Popular Trading Styles</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-slate-400">Distribution of risk profiles in the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { style: "Conservative", count: 25, percentage: 41.7, color: "bg-blue-500", description: "Low risk, steady returns" },
                      { style: "Moderate", count: 20, percentage: 33.3, color: "bg-yellow-500", description: "Balanced approach" },
                      { style: "Aggressive", count: 15, percentage: 25, color: "bg-red-500", description: "High risk, high reward" }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">{item.style}</span>
                            <p className="text-xs text-gray-600 dark:text-slate-400">{item.description}</p>
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">{item.count} traders</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
                          <div
                            className={`${item.color} h-full rounded-full transition-all duration-1000`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Performance Metrics */}
            <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  AI Performance Analytics
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-slate-400">How AI-assisted trading performs vs manual trading</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-500/30">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">+18.5%</div>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Avg AI-assisted return</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600">
                    <div className="text-2xl font-bold text-gray-700 dark:text-slate-300">+12.3%</div>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Avg manual return</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-500/30">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">+50%</div>
                    <p className="text-sm text-gray-600 dark:text-slate-400">AI advantage</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Tab - Theme Responsive */}
          <TabsContent value="social" className="space-y-6">
            {/* Search Users */}
            <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                  <Search className="h-5 w-5" />
                  Discover Traders
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-slate-200">Find and connect with successful traders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Search by username, strategy, or performance..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-400 focus:border-green-500"
                  />

                  {searchResults.length > 0 && (
                    <div className="space-y-3">
                      {searchResults.map((trader) => (
                        <div key={trader.id} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/80 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-all">
                          <div className="text-2xl">{trader.avatar}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-cyan-600 dark:text-cyan-300">{trader.username}</span>
                              <Badge variant="outline" className="border-gray-300 dark:border-slate-500 text-gray-700 dark:text-slate-200">#{trader.rank}</Badge>
                              {trader.badges.length > 0 && (
                                <span>{trader.badges[0].icon}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-slate-300">
                              <span className={trader.totalReturnPercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {trader.totalReturnPercent >= 0 ? '+' : ''}{trader.totalReturnPercent}%
                              </span>
                              <span>{trader.followers} followers</span>
                              <span>AI: {trader.aiScore}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleFollow(trader.id, trader.username)}
                            className={followedUsers.includes(trader.id) ? 'bg-gray-500 text-white hover:bg-gray-600 dark:bg-slate-600 dark:text-slate-300 dark:hover:bg-slate-700' : 'bg-cyan-600 hover:bg-cyan-700 text-white'}
                          >
                            {followedUsers.includes(trader.id) ? 'Following' : 'Follow'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Your Network */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                    <Users className="h-5 w-5" />
                    Following ({followedUsers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users
                      .filter(user => followedUsers.includes(user.id))
                      .map((trader) => (
                        <div key={trader.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/80 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{trader.avatar}</span>
                            <div>
                              <span className="font-medium text-cyan-600 dark:text-cyan-300">{trader.username}</span>
                              <p className="text-xs text-gray-600 dark:text-slate-200">#{trader.rank} • {trader.totalReturnPercent >= 0 ? '+' : ''}{trader.totalReturnPercent}%</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleFollow(trader.id, trader.username)}
                            className="border-gray-300 dark:border-slate-500 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-600 hover:text-gray-900 dark:hover:text-white"
                          >
                            Unfollow
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                    <Star className="h-5 w-5" />
                    Trending Traders
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-slate-200">Most followed traders this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topTraders.slice(0, 5).map((trader, index) => (
                      <div key={trader.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/80 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="border-gray-300 dark:border-slate-500 text-gray-700 dark:text-slate-200">#{index + 1}</Badge>
                          <span className="text-xl">{trader.avatar}</span>
                          <div>
                            <span className="font-medium text-cyan-600 dark:text-cyan-300">{trader.username}</span>
                            <p className="text-xs text-gray-600 dark:text-slate-200">+{Math.floor(Math.random() * 100 + 50)} new followers</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleFollow(trader.id, trader.username)}
                          className={followedUsers.includes(trader.id) ? 'bg-gray-500 text-white hover:bg-gray-600 dark:bg-slate-600 dark:text-slate-300 dark:hover:bg-slate-700' : 'bg-cyan-600 hover:bg-cyan-700 text-white'}
                        >
                          {followedUsers.includes(trader.id) ? 'Following' : 'Follow'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}