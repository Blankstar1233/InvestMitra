import { useState, useCallback } from 'react';
import { Stock } from './use-market-data';
import { Portfolio, Position, Order } from './use-trading';
import { GoogleGenerativeAI } from '@google/generative-ai';

let geminiClient: GoogleGenerativeAI | null = null;

async function initializeGemini(): Promise<GoogleGenerativeAI | null> {
  if (geminiClient) return geminiClient;
  
  try {
    const res = await fetch('/api/gemini-key');
    if (!res.ok) {
      console.error('Failed to fetch Gemini API key');
      return null;
    }
    const data = await res.json();
    
    if (!data.geminiApiKey) {
      console.error('No Gemini API key received');
      return null;
    }
    
    geminiClient = new GoogleGenerativeAI(data.geminiApiKey);
    console.log('✅ Gemini AI initialized successfully with API key');
    return geminiClient;
  } catch (error) {
    console.error('❌ Error initializing Gemini:', error);
    return null;
  }
}

async function generateAIInsights(portfolio: Portfolio, stocks: Stock[], recentTrades: Order[]): Promise<Insight[]> {
  const genAI = await initializeGemini();
  if (!genAI) {
    console.warn('🔄 Gemini AI not available, using fallback insights');
    return generateFallbackInsights(portfolio, stocks, recentTrades);
  }

  try {
    console.log('🤖 Generating AI insights with Gemini...');
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const portfolioData = {
      totalValue: portfolio.totalValue,
      totalPnL: portfolio.totalPnL,
      availableCash: portfolio.availableCash,
      positions: portfolio.positions.map(pos => ({
        symbol: pos.symbol,
        quantity: pos.quantity,
        avgPrice: pos.avgPrice,
        currentValue: pos.currentValue,
        pnl: pos.pnl,
        pnlPercent: pos.pnlPercent
      })),
      positionCount: portfolio.positions.length
    };

    const marketData = stocks.slice(0, 10).map(stock => ({
      symbol: stock.symbol,
      price: stock.price,
      changePercent: stock.changePercent,
      volume: stock.volume,
      sector: stock.sector
    }));

    const prompt = `
    As an AI investment advisor, analyze this portfolio and market data to provide actionable insights:

    PORTFOLIO DATA:
    ${JSON.stringify(portfolioData, null, 2)}

    CURRENT MARKET DATA:
    ${JSON.stringify(marketData, null, 2)}

    RECENT TRADES: ${recentTrades.length} trades in recent period

    Please provide 3-5 specific insights in this exact JSON format:
    [
      {
        "type": "RECOMMENDATION",
        "priority": "HIGH",
        "title": "Brief title",
        "description": "Detailed explanation with specific numbers",
        "action": "Specific action to take",
        "stockSymbol": null,
        "category": "Category name",
        "confidence": 85
      }
    ]

    Focus on:
    1. Portfolio concentration risks
    2. Underperforming positions
    3. Market opportunities
    4. Risk management
    5. Diversification advice

    Return only valid JSON array without any markdown formatting.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    const aiInsights = JSON.parse(cleanedText);
    
    console.log('✅ AI insights generated successfully');
    
    return aiInsights.map((insight: any, index: number) => ({
      id: `ai-insight-${Date.now()}-${index}`,
      type: insight.type,
      priority: insight.priority,
      title: insight.title,
      description: insight.description,
      action: insight.action,
      stockSymbol: insight.stockSymbol,
      timestamp: Date.now(),
      category: insight.category,
      confidence: insight.confidence
    }));

  } catch (error) {
    console.error('❌ Error generating AI insights:', error);
    return generateFallbackInsights(portfolio, stocks, recentTrades);
  }
}

async function generateAIRecommendations(stocks: Stock[], portfolio: Portfolio): Promise<StockRecommendation[]> {
  const genAI = await initializeGemini();
  if (!genAI) {
    console.warn('🔄 Gemini AI not available, using fallback recommendations');
    return generateFallbackRecommendations(stocks, portfolio);
  }

  try {
    console.log('🤖 Generating AI recommendations with Gemini...');
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const topStocks = stocks.slice(0, 15);
    const portfolioSymbols = portfolio.positions.map(p => p.symbol);
    
    const prompt = `
    As an AI stock analyst, provide 3-5 stock recommendations based on:

    CURRENT MARKET DATA:
    ${JSON.stringify(topStocks.map(s => ({
      symbol: s.symbol,
      name: s.name,
      price: s.price,
      changePercent: s.changePercent,
      volume: s.volume,
      sector: s.sector
    })), null, 2)}

    CURRENT PORTFOLIO POSITIONS: ${portfolioSymbols.join(', ')}

    Return recommendations in this exact JSON format:
    [
      {
        "symbol": "STOCK_SYMBOL",
        "name": "Company Name",
        "action": "BUY",
        "confidence": 85,
        "targetPrice": 1234.56,
        "reasoning": "Detailed analysis with specific reasons",
        "timeHorizon": "SHORT",
        "riskLevel": "MEDIUM"
      }
    ]

    Consider:
    1. Momentum and technical indicators
    2. Sector rotation opportunities
    3. Diversification needs
    4. Risk-reward ratios

    Return only valid JSON array without any markdown formatting.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    const recommendations = JSON.parse(cleanedText);
    
    console.log('✅ AI recommendations generated successfully');
    
    return recommendations;

  } catch (error) {
    console.error('❌ Error generating AI recommendations:', error);
    return generateFallbackRecommendations(stocks, portfolio);
  }
}

function generateFallbackInsights(portfolio: Portfolio, stocks: Stock[], recentTrades: Order[]): Insight[] {
  console.log('🔄 Using fallback insights generation');
  const newInsights: Insight[] = [];
  
  if (portfolio.positions.length > 0) {
    const sectorExposure = calculateSectorExposure(portfolio.positions);
    const topSector = Object.entries(sectorExposure).sort(([,a], [,b]) => b - a)[0];
    
    if (topSector && topSector[1] > 40) {
      newInsights.push({
        id: `diversification-${Date.now()}`,
        type: 'RISK_ALERT',
        priority: 'HIGH',
        title: 'Portfolio Concentration Risk',
        description: `Your portfolio is heavily concentrated in ${topSector[0]} sector (${topSector[1].toFixed(1)}%). Consider diversifying to reduce risk.`,
        action: 'Explore stocks in other sectors',
        timestamp: Date.now(),
        category: 'Risk Management',
        confidence: 85,
      });
    }
  }

  const cashPercentage = (portfolio.availableCash / portfolio.totalValue) * 100;
  if (cashPercentage > 20) {
    newInsights.push({
      id: `cash-${Date.now()}`,
      type: 'RECOMMENDATION',
      priority: 'MEDIUM',
      title: 'High Cash Position',
      description: `You have ${cashPercentage.toFixed(1)}% cash. Consider investing in fundamentally strong stocks to generate returns.`,
      action: 'Explore investment opportunities',
      timestamp: Date.now(),
      category: 'Portfolio Optimization',
      confidence: 75,
    });
  }

  return newInsights;
}

function generateFallbackRecommendations(stocks: Stock[], portfolio: Portfolio): StockRecommendation[] {
  console.log('🔄 Using fallback recommendations generation');
  const newRecommendations: StockRecommendation[] = [];
  
  const momentumStocks = stocks
    .filter(stock => stock.changePercent > 1 && stock.volume > 100000)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 3);
  
  momentumStocks.forEach(stock => {
    newRecommendations.push({
      symbol: stock.symbol,
      name: stock.name,
      action: 'BUY',
      confidence: Math.min(75 + stock.changePercent * 2, 95),
      targetPrice: stock.price * 1.05,
      reasoning: `Strong momentum with ${stock.changePercent}% gain and high volume. Technical indicators suggest continued uptrend.`,
      timeHorizon: 'SHORT',
      riskLevel: 'MEDIUM',
    });
  });

  return newRecommendations.slice(0, 5);
}

export interface Insight {
  id: string;
  type: 'RECOMMENDATION' | 'RISK_ALERT' | 'MARKET_ANALYSIS' | 'PERFORMANCE' | 'EDUCATIONAL';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  action?: string;
  stockSymbol?: string;
  timestamp: number;
  category: string;
  confidence: number; 
}

export interface StockRecommendation {
  symbol: string;
  name: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  targetPrice: number;
  reasoning: string;
  timeHorizon: 'SHORT' | 'MEDIUM' | 'LONG';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface RiskAssessment {
  overallRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  diversificationScore: number; 
  volatilityRisk: number; 
  concentrationRisk: number; 
  sectorRisks: { sector: string; exposure: number; risk: string }[];
  recommendations: string[];
}

export interface PerformanceAnalysis {
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  avgGain: number;
  avgLoss: number;
  profitFactor: number;
  bestTrade: { symbol: string; pnl: number };
  worstTrade: { symbol: string; pnl: number };
  tradingFrequency: 'LOW' | 'MEDIUM' | 'HIGH';
  riskTolerance: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';
}

export function useAIInsights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [recommendations, setRecommendations] = useState<StockRecommendation[]>([]);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(null);
  const [performanceAnalysis, setPerformanceAnalysis] = useState<PerformanceAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const generateInsights = useCallback(async (
    portfolio: Portfolio,
    stocks: Stock[],
    recentTrades: Order[]
  ) => {
    setLoading(true);
    console.log('🚀 Starting AI insights generation...');
    
    try {
      const aiInsights = await generateAIInsights(portfolio, stocks, recentTrades);
      setInsights(aiInsights);
      console.log('✅ Insights updated in state');
    } catch (error) {
      console.error('❌ Failed to generate insights:', error);
      setInsights([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateRecommendations = useCallback(async (stocks: Stock[], portfolio: Portfolio) => {
    console.log('🚀 Starting AI recommendations generation...');
    
    try {
      const aiRecommendations = await generateAIRecommendations(stocks, portfolio);
      setRecommendations(aiRecommendations);
      console.log('✅ Recommendations updated in state');
    } catch (error) {
      console.error('❌ Failed to generate recommendations:', error);
      setRecommendations([]);
    }
  }, []);

  const calculateRiskAssessment = useCallback((portfolio: Portfolio) => {
    if (portfolio.positions.length === 0) {
      setRiskAssessment(null);
      return;
    }

    const sectorExposure = calculateSectorExposure(portfolio.positions);
    const maxSectorExposure = Math.max(...Object.values(sectorExposure));
    
    const diversificationScore = Math.max(0, 100 - (maxSectorExposure - 20) * 2);
    const concentrationRisk = maxSectorExposure > 50 ? 80 : maxSectorExposure > 30 ? 50 : 20;
    const avgPnLPercent = portfolio.positions.reduce((sum, pos) => sum + Math.abs(pos.pnlPercent), 0) / portfolio.positions.length;
    const volatilityRisk = Math.min(avgPnLPercent * 5, 100);
    const overallRiskScore = (concentrationRisk + volatilityRisk) / 2;
    const overallRisk = overallRiskScore > 60 ? 'HIGH' : overallRiskScore > 30 ? 'MEDIUM' : 'LOW';
    
    const sectorRisks = Object.entries(sectorExposure).map(([sector, exposure]) => ({
      sector,
      exposure,
      risk: exposure > 40 ? 'HIGH' : exposure > 25 ? 'MEDIUM' : 'LOW'
    }));

    const recommendations = [];
    if (maxSectorExposure > 40) {
      recommendations.push('Reduce concentration in dominant sector');
    }
    if (portfolio.positions.length < 5) {
      recommendations.push('Increase diversification with more positions');
    }
    if (volatilityRisk > 50) {
      recommendations.push('Consider defensive stocks to reduce volatility');
    }

    setRiskAssessment({
      overallRisk,
      diversificationScore,
      volatilityRisk,
      concentrationRisk,
      sectorRisks,
      recommendations,
    });
  }, []);

  const calculatePerformanceAnalysis = useCallback((portfolio: Portfolio, orders: Order[]) => {
    if (orders.length === 0) {
      setPerformanceAnalysis(null);
      return;
    }

    const completedOrders = orders.filter(order => order.status === 'EXECUTED');
    const trades = completedOrders.length;
    const profitableTrades = portfolio.positions.filter(pos => pos.pnl > 0).length;
    const winRate = trades > 0 ? (profitableTrades / portfolio.positions.length) * 100 : 0;
    const totalPnL = portfolio.totalPnL;
    const maxDrawdown = Math.abs(Math.min(...portfolio.positions.map(pos => pos.pnlPercent), 0));
    
    const avgGain = portfolio.positions
      .filter(pos => pos.pnl > 0)
      .reduce((sum, pos) => sum + pos.pnl, 0) / Math.max(profitableTrades, 1);
    
    const losingPositions = portfolio.positions.filter(pos => pos.pnl < 0);
    const avgLoss = losingPositions.length > 0 
      ? Math.abs(losingPositions.reduce((sum, pos) => sum + pos.pnl, 0) / losingPositions.length)
      : 0;

    const profitFactor = avgLoss > 0 ? avgGain / avgLoss : avgGain > 0 ? 5 : 1;
    const sharpeRatio = totalPnL > 0 ? Math.min(totalPnL / 10000, 3) : 0;

    const bestTrade = portfolio.positions.reduce((best, pos) => 
      pos.pnl > best.pnl ? { symbol: pos.symbol, pnl: pos.pnl } : best,
      { symbol: '', pnl: -Infinity }
    );

    const worstTrade = portfolio.positions.reduce((worst, pos) => 
      pos.pnl < worst.pnl ? { symbol: pos.symbol, pnl: pos.pnl } : worst,
      { symbol: '', pnl: Infinity }
    );

    const tradingFrequency = trades < 5 ? 'LOW' : trades < 15 ? 'MEDIUM' : 'HIGH';
    const riskTolerance = maxDrawdown < 5 ? 'CONSERVATIVE' : maxDrawdown < 15 ? 'MODERATE' : 'AGGRESSIVE';

    setPerformanceAnalysis({
      sharpeRatio,
      maxDrawdown,
      winRate,
      avgGain,
      avgLoss,
      profitFactor,
      bestTrade: bestTrade.pnl !== -Infinity ? bestTrade : { symbol: 'N/A', pnl: 0 },
      worstTrade: worstTrade.pnl !== Infinity ? worstTrade : { symbol: 'N/A', pnl: 0 },
      tradingFrequency,
      riskTolerance,
    });
  }, []);

  const clearInsights = useCallback(() => {
    setInsights([]);
  }, []);

  const dismissInsight = useCallback((insightId: string) => {
    setInsights(prev => prev.filter(insight => insight.id !== insightId));
  }, []);

  return {
    insights,
    recommendations,
    riskAssessment,
    performanceAnalysis,
    loading,
    generateInsights,
    generateRecommendations,
    calculateRiskAssessment,
    calculatePerformanceAnalysis,
    clearInsights,
    dismissInsight,
  };
}

function calculateSectorExposure(positions: Position[]): Record<string, number> {
  const totalValue = positions.reduce((sum, pos) => sum + pos.currentValue, 0);
  const sectorValues: Record<string, number> = {};
  
  
  const sectorMapping: Record<string, string> = {
    'RELIANCE': 'Oil & Gas',
    'TCS': 'Information Technology',
    'INFY': 'Information Technology',
    'HDFCBANK': 'Financial Services',
    'ICICIBANK': 'Financial Services',
    'HINDUNILVR': 'FMCG',
    'LT': 'Construction',
    'SBIN': 'Financial Services',
    'BHARTIARTL': 'Telecommunications',
    'KOTAKBANK': 'Financial Services',
    'ASIANPAINT': 'Consumer Goods',
    'WIPRO': 'Information Technology',
    'MARUTI': 'Automobile',
    'HCLTECH': 'Information Technology',
    'AXISBANK': 'Financial Services',
  };
  
  positions.forEach(position => {
    const sector = sectorMapping[position.symbol] || 'Other';
    sectorValues[sector] = (sectorValues[sector] || 0) + position.currentValue;
  });

  const sectorExposure: Record<string, number> = {};
  Object.entries(sectorValues).forEach(([sector, value]) => {
    sectorExposure[sector] = (value / totalValue) * 100;
  });

  return sectorExposure;
}