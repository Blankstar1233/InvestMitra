import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
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
  Minus
} from "lucide-react";
import { useLeaderboard } from "@/hooks/use-leaderboard";

export default function Leaderboard() {
  const {
    users,
    competitions,
    followedUsers,
    getTopTraders,
    getCurrentUserRank,
    getUsersNearCurrentRank,
    followUser,
    getActiveCompetitions,
    getUpcomingCompetitions,
    joinCompetition,
    getTopBadges,
    searchUsers,
    getPerformanceMetrics
  } = useLeaderboard();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const topTraders = getTopTraders(10);
  const currentUser = getCurrentUserRank();
  const nearbyUsers = getUsersNearCurrentRank(3);
  const activeCompetitions = getActiveCompetitions();
  const upcomingCompetitions = getUpcomingCompetitions();
  const topBadges = getTopBadges();
  const metrics = getPerformanceMetrics();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleFollow = (userId: string, username: string) => {
    followUser(userId);
    const isNowFollowing = !followedUsers.includes(userId);

    toast({
      title: isNowFollowing ? "Following" : "Unfollowed",
      description: `You ${isNowFollowing ? 'are now following' : 'unfollowed'} ${username}`,
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setSearchResults(searchUsers(query));
    } else {
      setSearchResults([]);
    }
  };

  const handleJoinCompetition = (competitionId: string, title: string) => {
    joinCompetition(competitionId);
    toast({
      title: "Competition Joined!",
      description: `You've successfully joined "${title}". Good luck!`,
    });
  };

  const getRankChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="h-3 w-3 text-success" />;
    if (change < 0) return <ArrowDown className="h-3 w-3 text-destructive" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'LEGENDARY': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      case 'EPIC': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'RARE': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getUserProfileColor = (profile: string) => {
    switch (profile) {
      case 'AGGRESSIVE': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'MODERATE': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'CONSERVATIVE': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="h-6 w-6 sm:h-8 sm:w-8" />
            Leaderboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Compete with traders worldwide and climb the rankings
          </p>
        </div>
        {currentUser && (
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 flex items-center gap-1 self-start">
            <Medal className="h-3 w-3" />
            Your Rank: #{currentUser.rank}
          </Badge>
        )}
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Traders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{metrics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Active users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{metrics.topPerformers}</div>
            <p className="text-xs text-muted-foreground">15%+ returns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Avg Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{metrics.averageReturn}%</div>
            <p className="text-xs text-muted-foreground">Community avg</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Avg Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{metrics.averageWinRate}%</div>
            <p className="text-xs text-muted-foreground">Success rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="global" className="space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="grid grid-cols-4 min-w-full w-max sm:w-full">
            <TabsTrigger value="global" className="text-xs sm:text-sm px-2 sm:px-4">
              Global
            </TabsTrigger>
            <TabsTrigger value="competitions" className="text-xs sm:text-sm px-2 sm:px-4">
              Contests
            </TabsTrigger>
            <TabsTrigger value="badges" className="text-xs sm:text-sm px-2 sm:px-4">
              Badges
            </TabsTrigger>
            <TabsTrigger value="social" className="text-xs sm:text-sm px-2 sm:px-4">
              Social
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Global Rankings */}
        <TabsContent value="global">
          <div className="space-y-6">
            {/* Top 3 Podium */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Crown className="h-5 w-5" />
                  Hall of Fame
                </CardTitle>
                <CardDescription className="text-sm">Top 3 performers of all time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {topTraders.slice(0, 3).map((trader, index) => (
                    <Card key={trader.id} className={`text-center p-4 sm:p-6 ${index === 0 ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200' : ''}`}>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center justify-center">
                          {index === 0 ? (
                            <Crown className="h-8 w-8 sm:h-12 sm:w-12 text-yellow-500" />
                          ) : index === 1 ? (
                            <Medal className="h-7 w-7 sm:h-10 sm:w-10 text-gray-400" />
                          ) : (
                            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold truncate">{trader.username}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">Rank #{trader.rank}</p>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <div className="text-lg sm:text-2xl font-bold text-success">
                            +{trader.totalReturnPercent}%
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            {formatCurrency(trader.portfolioValue)}
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                          <span>Win: {trader.winRate}%</span>
                          <span>Sharpe: {trader.sharpeRatio}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleFollow(trader.id, trader.username)}
                          className="w-full text-xs sm:text-sm"
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
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Full Rankings */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5" />
                  Global Rankings
                </CardTitle>
                <CardDescription className="text-sm">All traders ranked by performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topTraders.map((trader) => (
                    <div key={trader.id} className="flex flex-col sm:flex-row gap-3 p-3 sm:p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="text-center min-w-[2rem] flex-shrink-0">
                          <div className="font-bold text-sm sm:text-lg">#{trader.rank}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                            <span className="font-semibold text-sm sm:text-base truncate">{trader.username}</span>
                            {trader.badges.length > 0 && (
                              <span className="text-sm sm:text-lg">{trader.badges[0].icon}</span>
                            )}
                            <Badge className={getUserProfileColor(trader.riskProfile) + " text-xs px-1 py-0"}>
                              {trader.riskProfile.slice(0, 3)}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs sm:text-sm text-muted-foreground">
                              Portfolio: {formatCurrency(trader.portfolioValue)}
                            </div>
                            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-muted-foreground">
                              <span>Win: {trader.winRate}%</span>
                              <span>Sharpe: {trader.sharpeRatio}</span>
                              <span>Followers: {trader.followers}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <div className="text-left sm:text-right">
                          <div className={`text-base sm:text-lg font-bold ${trader.totalReturnPercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {trader.totalReturnPercent >= 0 ? '+' : ''}{trader.totalReturnPercent}%
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            {trader.totalReturnPercent >= 0 ? '+' : ''}{formatCurrency(trader.totalReturn)}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleFollow(trader.id, trader.username)}
                          className="h-8 w-8 p-0 flex-shrink-0"
                        >
                          {followedUsers.includes(trader.id) ? (
                            <UserMinus className="h-3 w-3" />
                          ) : (
                            <UserPlus className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Your Position */}
            {currentUser && (
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Your Position</CardTitle>
                  <CardDescription className="text-sm">See how you compare to nearby traders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {nearbyUsers.map((trader) => (
                      <div
                        key={trader.id}
                        className={`flex flex-col sm:flex-row gap-3 p-3 sm:p-4 rounded-lg border ${trader.id === 'current-user' ? 'bg-primary/10 border-primary/20' : 'hover:bg-accent/50'
                          } transition-colors`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="text-center min-w-[2rem] flex-shrink-0">
                            <div className="font-bold text-sm sm:text-base">#{trader.rank}</div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                              <span className={`font-semibold text-sm sm:text-base truncate ${trader.id === 'current-user' ? 'text-primary' : ''}`}>
                                {trader.username}
                              </span>
                              {trader.id === 'current-user' && (
                                <Badge variant="default" className="text-xs px-1 py-0">You</Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-muted-foreground">
                              <span>Win: {trader.winRate}%</span>
                              <span>Sharpe: {trader.sharpeRatio}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className={`text-base sm:text-lg font-bold ${trader.totalReturnPercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {trader.totalReturnPercent >= 0 ? '+' : ''}{trader.totalReturnPercent}%
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            {formatCurrency(trader.portfolioValue)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Competitions */}
        <TabsContent value="competitions">
          <div className="space-y-6">
            {/* Active Competitions */}
            {activeCompetitions.length > 0 && (
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="h-5 w-5" />
                    Active Competitions
                  </CardTitle>
                  <CardDescription className="text-sm">Join live competitions and win prizes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeCompetitions.map((competition) => (
                      <Card key={competition.id} className="p-3 sm:p-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base sm:text-lg font-semibold flex-1 min-w-0">{competition.title}</h3>
                              <Badge variant="default" className="bg-success text-xs px-1 py-0 flex-shrink-0">LIVE</Badge>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {competition.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            <div>
                              <p className="text-xs sm:text-sm font-medium">Prize Pool</p>
                              <p className="text-sm sm:text-lg font-bold text-primary">{competition.prize}</p>
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-medium">Participants</p>
                              <p className="text-sm sm:text-lg font-bold">{competition.participants.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-medium">Ends</p>
                              <p className="text-sm sm:text-lg font-bold">
                                {new Date(competition.endDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          {competition.leaderboard.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2 text-sm sm:text-base">Current Leaderboard</h4>
                              <div className="space-y-2">
                                {competition.leaderboard.slice(0, 5).map((entry) => (
                                  <div key={entry.userId} className="flex items-center justify-between p-2 bg-accent/50 rounded">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                      <span className="font-medium text-xs sm:text-sm">#{entry.rank}</span>
                                      <span className={`text-xs sm:text-sm truncate ${entry.userId === 'current-user' ? 'font-bold text-primary' : ''}`}>
                                        {entry.username}
                                      </span>
                                      {entry.change !== 0 && getRankChangeIcon(entry.change)}
                                    </div>
                                    <span className={`font-semibold text-xs sm:text-sm ${entry.score >= 0 ? 'text-success' : 'text-destructive'}`}>
                                      {entry.score >= 0 ? '+' : ''}{entry.score}%
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <Button
                            onClick={() => handleJoinCompetition(competition.id, competition.title)}
                            className="w-full text-sm"
                            size="sm"
                          >
                            <Trophy className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                            Join Competition
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Competitions */}
            {upcomingCompetitions.length > 0 && (
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5" />
                    Upcoming Competitions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingCompetitions.map((competition) => (
                      <Card key={competition.id} className="p-3 sm:p-4 opacity-75">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base sm:text-lg font-semibold flex-1 min-w-0">{competition.title}</h3>
                              <Badge variant="outline" className="text-xs px-1 py-0 flex-shrink-0">UPCOMING</Badge>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {competition.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            <div>
                              <p className="text-xs sm:text-sm font-medium">Prize Pool</p>
                              <p className="text-sm sm:text-lg font-bold text-primary">{competition.prize}</p>
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-medium">Pre-registered</p>
                              <p className="text-sm sm:text-lg font-bold">{competition.participants}</p>
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-medium">Starts</p>
                              <p className="text-sm sm:text-lg font-bold">
                                {new Date(competition.startDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <Button variant="outline" className="w-full text-sm" size="sm" disabled>
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                            Pre-register (Coming Soon)
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Badges & Awards */}
        <TabsContent value="badges">
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="h-5 w-5" />
                  Achievement Showcase
                </CardTitle>
                <CardDescription className="text-sm">Rare badges earned by top performers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Legendary Badges */}
                  {topBadges.legendary.length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
                        <span className="text-lg sm:text-xl">👑</span>
                        Legendary Badges
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {topBadges.legendary.map((badge) => (
                          <Card key={badge.id} className="p-3 sm:p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200">
                            <div className="text-center space-y-2">
                              <div className="text-2xl sm:text-3xl">{badge.icon}</div>
                              <h4 className="font-semibold text-sm sm:text-base">{badge.name}</h4>
                              <p className="text-xs text-muted-foreground">{badge.description}</p>
                              <Badge className={getRarityColor(badge.rarity) + " text-xs"}>
                                {badge.rarity}
                              </Badge>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Epic Badges */}
                  {topBadges.epic.length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
                        <span className="text-lg sm:text-xl">💜</span>
                        Epic Badges
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                        {topBadges.epic.map((badge) => (
                          <Card key={badge.id} className="p-2 sm:p-3 text-center">
                            <div className="text-lg sm:text-2xl mb-2">{badge.icon}</div>
                            <h4 className="font-medium text-xs sm:text-sm">{badge.name}</h4>
                            <Badge className={getRarityColor(badge.rarity) + " text-xs mt-1"}>
                              {badge.rarity}
                            </Badge>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Your Badges */}
            {currentUser && (
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Your Badge Collection</CardTitle>
                  <CardDescription className="text-sm">Badges you've earned on your trading journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {currentUser.badges.map((badge) => (
                      <Card key={badge.id} className="p-3 sm:p-4 text-center">
                        <div className="text-2xl sm:text-3xl mb-2">{badge.icon}</div>
                        <h4 className="font-semibold text-xs sm:text-sm">{badge.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{badge.description}</p>
                        <Badge className={getRarityColor(badge.rarity) + " mt-2 text-xs"}>
                          {badge.rarity}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          Earned: {new Date(badge.earnedAt).toLocaleDateString()}
                        </p>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Social */}
        <TabsContent value="social">
          <div className="space-y-6">
            {/* Search Users */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Search className="h-5 w-5" />
                  Find Traders
                </CardTitle>
                <CardDescription className="text-sm">Search and connect with other traders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Search by username..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="text-sm"
                  />

                  {searchResults.length > 0 && (
                    <div className="space-y-2">
                      {searchResults.map((trader) => (
                        <div key={trader.id} className="flex flex-col sm:flex-row gap-3 p-3 border rounded-lg">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                                <span className="font-semibold text-sm truncate">{trader.username}</span>
                                <Badge variant="outline" className="text-xs px-1 py-0">#{trader.rank}</Badge>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {trader.totalReturnPercent >= 0 ? '+' : ''}{trader.totalReturnPercent}% • {trader.followers} followers
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleFollow(trader.id, trader.username)}
                            className="h-8 w-8 p-0 flex-shrink-0 sm:w-auto sm:px-3"
                          >
                            <span className="sm:hidden">
                              {followedUsers.includes(trader.id) ? (
                                <UserMinus className="h-3 w-3" />
                              ) : (
                                <UserPlus className="h-3 w-3" />
                              )}
                            </span>
                            <span className="hidden sm:flex items-center">
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
                            </span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Following */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5" />
                  Following ({followedUsers.length})
                </CardTitle>
                <CardDescription className="text-sm">Traders you're following</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users
                    .filter(user => followedUsers.includes(user.id))
                    .map((trader) => (
                      <div key={trader.id} className="flex flex-col sm:flex-row gap-3 p-3 border rounded-lg">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                              <span className="font-semibold text-sm truncate">{trader.username}</span>
                              <Badge variant="outline" className="text-xs px-1 py-0">#{trader.rank}</Badge>
                              {trader.badges.length > 0 && (
                                <span className="text-sm">{trader.badges[0].icon}</span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {trader.totalReturnPercent >= 0 ? '+' : ''}{trader.totalReturnPercent}% • {trader.winRate}% win rate
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleFollow(trader.id, trader.username)}
                          className="h-8 w-8 p-0 flex-shrink-0 sm:w-auto sm:px-3 self-start sm:self-center"
                        >
                          <span className="sm:hidden">
                            <UserMinus className="h-3 w-3" />
                          </span>
                          <span className="hidden sm:flex items-center">
                            <UserMinus className="h-3 w-3 mr-1" />
                            Unfollow
                          </span>
                        </Button>
                      </div>
                    ))}
                  {followedUsers.length === 0 && (
                    <p className="text-center text-muted-foreground py-8 text-sm">
                      You're not following anyone yet. Search for traders above to start building your network!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}