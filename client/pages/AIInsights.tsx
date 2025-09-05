import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Shield,
  Target,
  BarChart3,
  AlertTriangle,
  Lightbulb,
  X,
  RefreshCw,
  Star,
  Activity,
  PieChart,
} from "lucide-react";
import { useMarketData } from "@/hooks/use-market-data";
import { useTrading } from "@/hooks/use-trading";
import { useAIInsights } from "@/hooks/use-ai-insights";

export default function AIInsights() {
  const { stocks } = useMarketData();
  const { portfolio, getOrderHistory } = useTrading();
  const {
    insights,
    recommendations,
    riskAssessment,
    performanceAnalysis,
    loading,
    generateInsights,
    generateRecommendations,
    calculateRiskAssessment,
    calculatePerformanceAnalysis,
    dismissInsight,
  } = useAIInsights();

  const [isGenerating, setIsGenerating] = useState(false);
  const hasGeneratedInsights = useRef(false);

  useEffect(() => {
    if (stocks.length > 0 && !hasGeneratedInsights.current) {
      const orders = getOrderHistory(20);
      generateInsights(portfolio, stocks, orders);
      generateRecommendations(stocks, portfolio);
      calculateRiskAssessment(portfolio);
      calculatePerformanceAnalysis(portfolio, orders);
      hasGeneratedInsights.current = true;
    }
  }, [
    stocks,
    portfolio,
    generateInsights,
    generateRecommendations,
    calculateRiskAssessment,
    calculatePerformanceAnalysis,
    getOrderHistory,
  ]);

  const handleRefreshInsights = async () => {
    setIsGenerating(true);
    const orders = getOrderHistory(20);
    generateInsights(portfolio, stocks, orders);
    generateRecommendations(stocks, portfolio);
    setTimeout(() => setIsGenerating(false), 1500);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "RISK_ALERT":
        return <AlertTriangle className="h-4 w-4" />;
      case "RECOMMENDATION":
        return <Target className="h-4 w-4" />;
      case "MARKET_ANALYSIS":
        return <BarChart3 className="h-4 w-4" />;
      case "EDUCATIONAL":
        return <Lightbulb className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  return (
  <div className="min-h-screen bg-background p-3 sm:p-4 lg:p-6">
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
<div className="space-y-3 sm:space-y-4">
  <div className="flex items-center justify-between">
    <div className="text-left">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-2">
        <Brain className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
        AI Investment Insights
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground mt-1">
        AI-powered analysis of your portfolio
      </p>
    </div>
    <Button
      onClick={handleRefreshInsights}
      disabled={isGenerating || loading}
      className="sm:w-auto flex items-center justify-center gap-2 h-10 w-10 sm:w-auto sm:px-4"
    >
      <RefreshCw
        className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
      />
      <span className="hidden sm:inline">
        {isGenerating ? "Analyzing..." : "Refresh Insights"}
      </span>
    </Button>
  </div>
</div>

     <Tabs defaultValue="insights" className="space-y-4">
  <TabsList className="w-full p-1 h-auto bg-muted">
    <div className="flex overflow-x-auto scrollbar-hide w-full md:grid md:grid-cols-4 md:gap-1 md:overflow-visible snap-x snap-mandatory md:snap-none">
      <TabsTrigger
        value="insights"
        className="flex-shrink-0 px-3 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap min-w-max rounded-md snap-start md:snap-align-none transition-all duration-200 ease-in-out focus:outline-none"
        onClick={(e) => {
          // Only apply scroll behavior on mobile
          if (window.innerWidth < 768) {
            setTimeout(() => {
              (e.target as HTMLElement)
                .closest(".flex")
                ?.scrollTo({ left: 0, behavior: "smooth" });
            }, 50);
          }
        }}
      >
        <span className="flex items-center gap-1.5">
          <Brain className="h-3 w-3 sm:h-4 sm:w-4" />
          Live Insights
        </span>
      </TabsTrigger>
      <TabsTrigger
        value="recommendations"
        className="flex-shrink-0 px-3 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap min-w-max rounded-md snap-center md:snap-align-none transition-all duration-200 ease-in-out focus:outline-none"
        onClick={(e) => {
          // Only apply scroll behavior on mobile
          if (window.innerWidth < 768) {
            setTimeout(() => {
              const target = e.target as HTMLElement;
              const container = target.closest(".flex") as HTMLElement;
              const containerWidth = container.offsetWidth;
              const scrollLeft =
                target.offsetLeft -
                containerWidth / 2 +
                target.offsetWidth / 2;
              container.scrollTo({ left: scrollLeft, behavior: "smooth" });
            }, 50);
          }
        }}
      >
        <span className="flex items-center gap-1.5">
          <Target className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">Recommendations</span>
          <span className="xs:hidden">Recommendations</span>
        </span>
      </TabsTrigger>
      <TabsTrigger
        value="risk"
        className="flex-shrink-0 px-3 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap min-w-max rounded-md snap-center md:snap-align-none transition-all duration-200 ease-in-out focus:outline-none"
        onClick={(e) => {
          // Only apply scroll behavior on mobile
          if (window.innerWidth < 768) {
            setTimeout(() => {
              const target = e.target as HTMLElement;
              const container = target.closest(".flex") as HTMLElement;
              const containerWidth = container.offsetWidth;
              const scrollLeft =
                target.offsetLeft -
                containerWidth / 2 +
                target.offsetWidth / 2;
              container.scrollTo({ left: scrollLeft, behavior: "smooth" });
            }, 50);
          }
        }}
      >
        <span className="flex items-center gap-1.5">
          <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
          Risk Analysis
        </span>
      </TabsTrigger>
      <TabsTrigger
        value="performance"
        className="flex-shrink-0 px-3 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap min-w-max rounded-md snap-end md:snap-align-none transition-all duration-200 ease-in-out focus:outline-none"
        onClick={(e) => {
          // Only apply scroll behavior on mobile
          if (window.innerWidth < 768) {
            setTimeout(() => {
              const target = e.target as HTMLElement;
              const container = target.closest(".flex") as HTMLElement;
              container.scrollTo({
                left: container.scrollWidth,
                behavior: "smooth",
              });
            }, 50);
          }
        }}
      >
        <span className="flex items-center gap-1.5">
          <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
          Performance
        </span>
      </TabsTrigger>
    </div>
  </TabsList>
          {/* Live Insights */}
          <TabsContent value="insights" className="mt-4">
            <div className="space-y-3 sm:space-y-4">
              {loading || isGenerating ? (
                <Card>
                  <CardContent className="flex items-center justify-center py-8 sm:py-12">
                    <div className="text-center">
                      <Activity className="h-6 w-6 sm:h-8 sm:w-8 animate-spin mx-auto mb-2" />
                      <p className="text-sm sm:text-base">AI is analyzing your portfolio...</p>
                    </div>
                  </CardContent>
                </Card>
              ) : insights.length > 0 ? (
                insights.map((insight) => (
                  <Card key={insight.id} className="relative">
                    <CardHeader className="pb-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 min-w-0 flex-1">
                          {getInsightIcon(insight.type)}
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-base sm:text-lg leading-tight">
                              {insight.title}
                            </CardTitle>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              <Badge
                                variant={
                                  insight.priority === "HIGH"
                                    ? "destructive"
                                    : insight.priority === "MEDIUM"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="text-xs px-2 py-0.5"
                              >
                                {insight.priority}
                              </Badge>
                              <Badge variant="outline" className="text-xs px-2 py-0.5">
                                {insight.confidence}% confidence
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissInsight(insight.id)}
                          className="h-6 w-6 p-0 flex-shrink-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <CardDescription className="text-xs sm:text-sm">
                        {insight.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm leading-relaxed">{insight.description}</p>
                      {insight.action && (
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          {insight.action}
                        </Button>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {new Date(insight.timestamp).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-8 sm:py-12">
                    <Brain className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-base sm:text-lg font-semibold mb-2">
                      No Insights Available
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground px-4">
                      Start trading to receive AI-powered insights and recommendations.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Recommendations */}
          <TabsContent value="recommendations" className="mt-4">
            <div className="space-y-3 sm:space-y-4">
              {recommendations.length > 0 ? (
                recommendations.map((rec, index) => (
                  <Card key={`${rec.symbol}-${index}`}>
                    <CardHeader className="pb-3">
                      <div className="space-y-3">
                        {/* Mobile: Stack everything vertically, Desktop: Side by side */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-3 space-y-2 sm:space-y-0">
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-base sm:text-lg">{rec.symbol}</CardTitle>
                            <CardDescription className="text-xs sm:text-sm mt-1">{rec.name}</CardDescription>
                          </div>
                          {/* Star rating - full width on mobile */}
                          <div className="flex items-center gap-0.5 sm:flex-shrink-0">
                            <span className="text-xs text-muted-foreground mr-2 sm:hidden">Rating:</span>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${i < rec.confidence / 20 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">({rec.confidence}%)</span>
                          </div>
                        </div>
                        
                        {/* Badges row */}
                        <div className="flex flex-wrap gap-1.5">
                          <Badge
                            variant={
                              rec.action === "BUY"
                                ? "default"
                                : rec.action === "SELL"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className="text-xs px-2 py-0.5"
                          >
                            {rec.action}
                          </Badge>
                          <Badge variant="outline" className="text-xs px-2 py-0.5 sm:hidden">
                            {rec.confidence}% confidence
                          </Badge>
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            {rec.timeHorizon.toLowerCase().replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="flex items-center justify-between text-sm">
                            <span>Target Price:</span>
                            <span className="font-semibold">
                              {formatCurrency(rec.targetPrice)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Risk Level:</span>
                            <Badge
                              variant={
                                rec.riskLevel === "HIGH"
                                  ? "destructive"
                                  : rec.riskLevel === "MEDIUM"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="text-xs"
                            >
                              {rec.riskLevel}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {rec.reasoning}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-8 sm:py-12">
                    <Target className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-base sm:text-lg font-semibold mb-2">
                      No Recommendations Available
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground px-4">
                      Build your portfolio to receive personalized stock recommendations.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Risk Analysis */}
          <TabsContent value="risk" className="mt-4">
            {riskAssessment ? (
              <div className="space-y-4 sm:space-y-6">
                {/* Overall Risk */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                      Overall Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-accent/50 rounded-lg">
                        <div
                          className={`text-xl sm:text-2xl font-bold ${
                            riskAssessment.overallRisk === "HIGH"
                              ? "text-destructive"
                              : riskAssessment.overallRisk === "MEDIUM"
                                ? "text-warning"
                                : "text-success"
                          }`}
                        >
                          {riskAssessment.overallRisk}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          Overall Risk
                        </p>
                      </div>
                      <div className="text-center p-3 bg-accent/50 rounded-lg">
                        <div className="text-xl sm:text-2xl font-bold">
                          {riskAssessment.diversificationScore.toFixed(0)}/100
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          Diversification Score
                        </p>
                      </div>
                      <div className="text-center p-3 bg-accent/50 rounded-lg">
                        <div className="text-xl sm:text-2xl font-bold">
                          {riskAssessment.volatilityRisk.toFixed(0)}%
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          Volatility Risk
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sector Risk Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <PieChart className="h-4 w-4 sm:h-5 sm:w-5" />
                      Sector Risk Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {riskAssessment.sectorRisks.map((sector) => (
                        <div key={sector.sector} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              {sector.sector}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                {sector.exposure.toFixed(1)}%
                              </span>
                              <Badge
                                variant={
                                  sector.risk === "HIGH"
                                    ? "destructive"
                                    : sector.risk === "MEDIUM"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="text-xs"
                              >
                                {sector.risk}
                              </Badge>
                            </div>
                          </div>
                          <Progress value={sector.exposure} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Risk Mitigation Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {riskAssessment.recommendations.map(
                        (recommendation, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 p-3 bg-accent/50 rounded-lg"
                          >
                            <Lightbulb className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm leading-relaxed">{recommendation}</span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8 sm:py-12">
                  <Shield className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-base sm:text-lg font-semibold mb-2">
                    No Risk Data Available
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground px-4">
                    Build your portfolio to receive detailed risk analysis.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Performance Analysis */}
          <TabsContent value="performance" className="mt-4">
            {performanceAnalysis ? (
              <div className="space-y-4 sm:space-y-6">
                {/* Key Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      <div className="text-center p-3 bg-accent/50 rounded-lg">
                        <div className="text-lg sm:text-xl font-bold">
                          {performanceAnalysis.sharpeRatio.toFixed(2)}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          Sharpe Ratio
                        </p>
                      </div>
                      <div className="text-center p-3 bg-accent/50 rounded-lg">
                        <div className="text-lg sm:text-xl font-bold">
                          {performanceAnalysis.winRate.toFixed(0)}%
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Win Rate</p>
                      </div>
                      <div className="text-center p-3 bg-accent/50 rounded-lg">
                        <div className="text-lg sm:text-xl font-bold">
                          {performanceAnalysis.maxDrawdown.toFixed(1)}%
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          Max Drawdown
                        </p>
                      </div>
                      <div className="text-center p-3 bg-accent/50 rounded-lg">
                        <div className="text-lg sm:text-xl font-bold">
                          {performanceAnalysis.profitFactor.toFixed(2)}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          Profit Factor
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Trading Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">Trading Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Trading Frequency</span>
                          <Badge variant="outline" className="text-xs">
                            {performanceAnalysis.tradingFrequency}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Risk Tolerance</span>
                          <Badge variant="outline" className="text-xs">
                            {performanceAnalysis.riskTolerance}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Average Gain</span>
                          <span className="text-sm font-semibold text-green-600">
                            {formatCurrency(performanceAnalysis.avgGain)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Average Loss</span>
                          <span className="text-sm font-semibold text-red-600">
                            {formatCurrency(performanceAnalysis.avgLoss)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg">Best & Worst Trades</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium">
                              Best Performer
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">
                              {performanceAnalysis.bestTrade.symbol || "N/A"}
                            </span>
                            <span className="text-sm font-semibold text-green-600">
                              +{formatCurrency(performanceAnalysis.bestTrade.pnl)}
                            </span>
                          </div>
                        </div>

                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingDown className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium">
                              Worst Performer
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">
                              {performanceAnalysis.worstTrade.symbol || "N/A"}
                            </span>
                            <span className="text-sm font-semibold text-red-600">
                              {formatCurrency(performanceAnalysis.worstTrade.pnl)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8 sm:py-12">
                  <BarChart3 className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-base sm:text-lg font-semibold mb-2">
                    No Performance Data Available
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground px-4">
                    Complete some trades to see detailed performance analysis.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          /* Custom breakpoint for xs screens */
          @media (min-width: 475px) {
            .xs\\:inline { display: inline !important; }
            .xs\\:hidden { display: none !important; }
          }
          
          /* Ensure proper text wrapping on small screens */
          @media (max-width: 640px) {
            .text-wrap-balance {
              text-wrap: balance;
            }
          }
          
          /* Improved touch targets for mobile */
          @media (max-width: 768px) {
            button {
              min-height: 44px;
              min-width: 44px;
            }
            
            /* Better spacing for tabs on mobile */
            [data-state="active"] {
              background-color: hsl(var(--background));
              border: 1px solid hsl(var(--border));
            }
          }
          
          /* Custom scrollbar for desktop */
          @media (min-width: 1024px) {
            .custom-scroll {
              scrollbar-width: thin;
              scrollbar-color: hsl(var(--border)) transparent;
            }
            
            .custom-scroll::-webkit-scrollbar {
              width: 6px;
            }
            
            .custom-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            
            .custom-scroll::-webkit-scrollbar-thumb {
              background-color: hsl(var(--border));
              border-radius: 3px;
            }
            
            .custom-scroll::-webkit-scrollbar-thumb:hover {
              background-color: hsl(var(--muted-foreground));
            }
          }
        `
      }} />
    </div>
  );
}
