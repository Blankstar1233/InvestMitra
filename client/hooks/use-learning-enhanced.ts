import { useState, useCallback } from "react";

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category:
    | "BASICS"
    | "ANALYSIS"
    | "STRATEGY"
    | "RISK"
    | "INDIAN_MARKETS"
    | "ADVANCED";
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  duration: number; // minutes
  reward: number; // coins
  lessons: Lesson[];
  quiz: Quiz;
  completed: boolean;
  progress: number; // 0-100
  unlocked: boolean;
  prerequisites?: string[]; // IDs of modules that must be completed first
  tier: "FOUNDATIONAL" | "INTERMEDIATE" | "ADVANCED"; // Learning path tier
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  type: "TEXT" | "VIDEO" | "INTERACTIVE" | "CASE_STUDY" | "SIMULATION";
  completed: boolean;
  duration: number; // minutes
  keyTakeaways?: string[]; // Key points to remember
  actionItems?: string[]; // Action items for practical application
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  passed: boolean;
  score: number;
  attempts: number;
  minPassingScore: number; // Minimum score needed to pass (percent)
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "EASY" | "MEDIUM" | "HARD"; // Question difficulty level
  type: "RECALL" | "COMPREHENSION" | "APPLICATION" | "SCENARIO"; // Type of cognitive skill tested
  scenario?: string; // Optional scenario context for application questions
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  reward: {
    coins: number;
    xp: number;
    bonusUnlock?: string; // ID of bonus content unlocked
  };
  unlocked: boolean;
  unlockedAt?: number;
  category: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "MASTERY" | "SPECIAL";
  progress: number;
  target: number;
  tier: number; // 1-5 tier level for badge display
  displayBadge: string; // Badge image or emoji to display
  milestoneType: "COMPLETION" | "ACCURACY" | "STREAK" | "TIME" | "SPECIAL";
}

export interface LearningProgress {
  totalCoinsEarned: number;
  modulesCompleted: number;
  quizzesPassed: number;
  currentStreak: number;
  longestStreak: number;
  totalTimeSpent: number; // minutes
  achievements: Achievement[];
  level: number;
  experiencePoints: number;
  lastActiveDate?: number; // Timestamp for streak tracking
  moduleCompletionsByCategory: {
    BASICS: number;
    ANALYSIS: number;
    STRATEGY: number;
    RISK: number;
    INDIAN_MARKETS: number;
    ADVANCED: number;
  };
  unlockedBonusContent: string[]; // IDs of unlocked bonus content
  learningPath: {
    current: string; // ID of current recommended module
    next: string; // ID of next recommended module
    completed: string[]; // IDs of completed modules in sequence
  };
}

const COMPREHENSIVE_LEARNING_MODULES: LearningModule[] = [
  // TIER 1: FOUNDATIONAL MODULES (Beginner)
  {
    id: "investing-fundamentals",
    title: "Investing Fundamentals",
    description:
      "Master the core concepts of investing and build a solid foundation for your investment journey",
    category: "BASICS",
    difficulty: "BEGINNER",
    duration: 45,
    reward: 500,
    completed: false,
    progress: 0,
    unlocked: true,
    tier: "FOUNDATIONAL",
    lessons: [
      {
        id: "what-is-investing",
        title: "What is Investing?",
        type: "TEXT",
        duration: 12,
        completed: false,
        content: `
# What is Investing?

Imagine you're planting a tree. You plant a small seed today, water it regularly, and over time it grows into a mighty oak that provides shade, beauty, and even fruit. **Investing works similarly** - you put money into assets today with the expectation they'll grow in value over time.

## The Core Concept
Investing is the act of allocating money or capital to assets with the expectation of generating income or profit. Unlike saving money in a bank account, investing involves putting your money to work in ways that can potentially grow wealth over time.

## Real-World Example
Let's say you buy a share of a popular coffee chain for ₹100. Over the next year, the company opens 500 new stores, increases profits by 25%, and your share is now worth ₹125. You've made a 25% return on your investment!

## Types of Investments
- **Stocks**: Ownership shares in companies
- **Bonds**: Loans to companies or governments  
- **Mutual Funds**: Professionally managed investment pools
- **Real Estate**: Property investments
- **Gold**: Precious metals as a store of value

## Investing vs Saving vs Speculation
- **Saving**: Low risk, low return (₹100 → ₹106 in 1 year)
- **Investing**: Medium risk, medium-high return (₹100 → ₹112 in 1 year)
- **Speculation**: High risk, very high potential return (₹100 → ₹150 or ₹50 in 1 year)
        `,
        keyTakeaways: [
          "Investing is about putting money to work for long-term growth",
          "Different investment types carry different levels of risk and return",
          "Starting early gives you the power of compound growth",
          "Patience and consistency are key to successful investing",
        ],
        actionItems: [
          "Set aside a small amount monthly for investments",
          "Learn about different investment options available",
          "Consider starting with low-risk options like mutual funds",
          "Never invest money you can't afford to lose",
        ],
      },
      {
        id: "stocks-fundamentals",
        title: "Understanding Stocks",
        type: "INTERACTIVE",
        duration: 15,
        completed: false,
        content: `
# Understanding Stocks: Your Ownership Certificate

Think of stocks as **ownership certificates** in a business. When you buy a stock, you're not just buying a piece of paper - you're buying a tiny slice of a real company with real assets, employees, and profits.

## What Exactly is a Stock?
A stock represents a claim on a company's assets and earnings. If a company has 1,000 shares outstanding and you own 10 shares, you own 1% of that company.

## Stock Price Movement Factors
Stock prices move based on:
- **Company Performance**: Earnings, revenue growth, new products
- **Market Sentiment**: Investor optimism or pessimism
- **Economic Factors**: Interest rates, inflation, GDP growth
- **Supply & Demand**: More buyers than sellers drives prices up

## Real-World Case Study: Tata Consultancy Services (TCS)
In 2004, TCS went public at ₹850 per share. By 2024, it trades at over ₹3,500 - a 300%+ return! Investors who held TCS benefited from:
- Consistent profit growth
- Global expansion
- Digital transformation boom
- Regular dividend payments

## Types of Stocks by Market Cap
- **Large Cap**: Established companies (₹20,000+ crore market cap)
- **Mid Cap**: Growing companies (₹5,000-20,000 crore market cap)  
- **Small Cap**: Emerging companies (₹500-5,000 crore market cap)

## Interactive Challenge
**Scenario**: You have ₹10,000 to invest. Would you choose:
A) 10 shares of Reliance (₹1,000 each) - stable, dividend-paying
B) 50 shares of a small tech company (₹200 each) - high growth potential
C) A mix of both

**Analysis**: Option C provides diversification - some stability from large cap and growth potential from small cap.
        `,
        keyTakeaways: [
          "Stocks represent real ownership in companies",
          "Price movements reflect company performance and market sentiment",
          "Long-term holding often rewards patient investors",
          "Diversification across different types of stocks reduces risk",
        ],
        actionItems: [
          "Research 3 companies you use products/services from daily",
          "Check their stock performance over the last 5 years",
          "Read their latest annual report summary",
          "Start following financial news to understand market movements",
        ],
      },
      {
        id: "risk-return-fundamentals",
        title: "Risk vs Return: The Fundamental Trade-off",
        type: "TEXT",
        duration: 18,
        completed: false,
        content: `
# Risk vs Return: The Golden Rule of Investing

Imagine you're offered two deals:
- **Deal A**: Guaranteed ₹100 return on ₹1,000 investment (10% return, no risk)
- **Deal B**: Possible ₹300 return on ₹1,000 investment, but you might lose ₹200 (30% potential return, high risk)

This illustrates the **fundamental principle**: Higher potential returns come with higher risk.

## Understanding Different Types of Risk

### Market Risk (Systematic Risk)
Risk that affects the entire market. Example: COVID-19 pandemic caused widespread market decline in March 2020.

### Company-Specific Risk (Unsystematic Risk)  
Risk specific to individual companies. Example: When Jet Airways went bankrupt, shareholders lost everything despite aviation industry growth.

### Inflation Risk
Risk that inflation erodes purchasing power. If you earn 6% return but inflation is 7%, you're actually losing money!

### Liquidity Risk
Risk of not being able to sell investments quickly. Small-cap stocks often have liquidity risk.

## Risk-Return Spectrum (Indian Context)
1. **Fixed Deposits**: 6-7% return, very low risk
2. **Government Bonds**: 7-8% return, low risk
3. **Blue-chip Stocks**: 12-15% average return, medium risk
4. **Small-cap Stocks**: 18-25% potential return, high risk
5. **Cryptocurrency**: 50%+ potential return, very high risk

## Risk Management Strategies

### 1. Diversification
Don't put all eggs in one basket. Spread investments across:
- Different sectors (IT, Banking, Pharma)
- Different market caps (Large, Mid, Small)
- Different asset classes (Stocks, Bonds, Gold)

### 2. Asset Allocation by Age
**Age 25**: 70% Stocks, 20% Bonds, 10% Cash
**Age 45**: 50% Stocks, 35% Bonds, 15% Cash  
**Age 65**: 30% Stocks, 50% Bonds, 20% Cash

### 3. Time Horizon Strategy
- **Short-term (1-3 years)**: Low risk investments
- **Medium-term (3-10 years)**: Balanced approach
- **Long-term (10+ years)**: Higher risk tolerance acceptable

## Case Study: Portfolio Comparison
**Conservative Portfolio (Age 55)**:
- Asset Mix: 30% Stocks, 50% Bonds, 20% FD
- Expected Return: 8-10% annually
- Volatility: Low
- Goal: Capital preservation

**Aggressive Portfolio (Age 25)**:
- Asset Mix: 70% Stocks, 20% Bonds, 10% Cash
- Expected Return: 12-15% annually  
- Volatility: High
- Goal: Wealth accumulation
        `,
        keyTakeaways: [
          "Risk and return are positively correlated in investing",
          "Your risk tolerance should match your investment timeline",
          "Younger investors can afford more risk for higher returns",
          "Diversification is the most effective risk management tool",
        ],
        actionItems: [
          "Assess your risk tolerance using online questionnaires",
          "Determine your investment timeline and financial goals",
          "Create an appropriate asset allocation strategy",
          "Start with lower-risk investments and gradually increase exposure",
        ],
      },
      {
        id: "compound-growth-power",
        title: "The Magic of Compound Growth",
        type: "INTERACTIVE",
        duration: 20,
        completed: false,
        content: `
# The Magic of Compound Growth: Your Money's Best Friend

Albert Einstein allegedly called compound interest "the eighth wonder of the world." Here's why this concept can transform your financial future.

## What is Compounding?
Compounding occurs when your investment earnings generate their own earnings. It's like a snowball rolling down a hill - starts small but grows exponentially.

## The Compounding Formula in Action
**Initial Investment**: ₹1,00,000  
**Annual Return**: 12%  
**Time Period**: 20 years

- Year 1: ₹1,00,000 → ₹1,12,000
- Year 5: ₹1,76,234
- Year 10: ₹3,10,585
- Year 15: ₹5,47,357
- Year 20: ₹9,64,629

**Your ₹1 lakh became ₹9.6 lakhs!**

## The Power of Starting Early: A Tale of Two Investors

### Rajesh (Smart Starter)
- Starts investing: Age 25
- Monthly SIP: ₹5,000
- Investing period: 35 years (until age 60)
- Total investment: ₹21,00,000

### Priya (Late Beginner)  
- Starts investing: Age 35
- Monthly SIP: ₹10,000 (double the amount!)
- Investing period: 25 years (until age 60)
- Total investment: ₹30,00,000

**Results at 12% annual return:**
- **Rajesh**: Final corpus ₹2.1 crores
- **Priya**: Final corpus ₹1.8 crores

*Despite investing ₹9 lakhs LESS, Rajesh ends up with ₹30 lakhs MORE!*

## Real-World Compounding Success Stories

### Warren Buffett's Journey
- Net worth at age 30: $1 million
- Net worth at age 60: $376 million  
- Net worth at age 90: $100+ billion
- **99% of his wealth was created after age 50** - pure compounding power!

### Indian SIP Success Story
An investor started ₹1,000 monthly SIP in Nifty 50 index fund in January 2000:
- Total investment (24 years): ₹2,88,000
- Current value (2024): ₹12+ lakhs
- **Returns from compounding**: ₹9+ lakhs
- **Annual return**: ~17%

## Factors That Supercharge Compounding

### 1. Time (Most Critical)
- 10 years: Good results
- 20 years: Great results  
- 30+ years: Life-changing results

### 2. Rate of Return
- 8% return: Money doubles every 9 years
- 12% return: Money doubles every 6 years
- 15% return: Money doubles every 5 years

### 3. Frequency of Compounding
- Annual: Good
- Monthly: Better
- Daily: Best (though difference is marginal)

### 4. Consistency
Regular investments amplify compounding through rupee-cost averaging.

## Interactive Simulation: The Penny Doubling Exercise
Would you rather have:
- **Option A**: ₹1 crore today, OR
- **Option B**: ₹1 doubled every day for 30 days?

**Answer**: Option B results in ₹53+ crores!  
Day 1: ₹1, Day 10: ₹512, Day 20: ₹5.2 lakhs, Day 30: ₹53+ crores

## Common Compounding Mistakes to Avoid

❌ **Waiting for "perfect timing"** → Start immediately
❌ **Stopping during market downturns** → Stay consistent  
❌ **Frequently switching investments** → Patience pays
❌ **Taking profits too early** → Let compounding work

✅ **Start today with any amount** → Time beats timing
✅ **Automate your investments** → Discipline guaranteed
✅ **Increase investments annually** → Accelerate growth
✅ **Stay invested for decades** → Maximum compounding benefit

## The 10-20-30 Rule
- **10% annual return** for **20 years** = **30x growth**
- ₹1 lakh → ₹30 lakhs
- This is the power of patient, long-term investing

## Compounding Beyond Money
The principle applies to:
- **Skills**: Daily practice compounds expertise
- **Relationships**: Small consistent efforts build strong bonds
- **Health**: Regular exercise compounds fitness benefits
- **Knowledge**: Daily learning compounds wisdom
        `,
        keyTakeaways: [
          "Time is more powerful than timing in investing",
          "Starting early beats investing larger amounts later",
          "Consistency in investing multiplies compounding benefits",
          "Patience and discipline are your greatest wealth-building assets",
        ],
        actionItems: [
          "Calculate your financial goals using compound interest calculators",
          "Start a SIP immediately, even if just ₹500/month",
          "Set up automatic investments to ensure consistency",
          "Increase your investment amount annually by 10-15%",
        ],
      },
    ],
    quiz: {
      id: "investing-fundamentals-quiz",
      passed: false,
      score: 0,
      attempts: 0,
      minPassingScore: 70,
      questions: [
        {
          id: "q1",
          question: "What is the primary purpose of investing?",
          options: [
            "To guarantee immediate profits",
            "To allocate money for potential long-term growth",
            "To avoid paying taxes",
            "To keep money safe from inflation",
          ],
          correctAnswer: 1,
          explanation:
            "Investing is primarily about allocating money to assets with the expectation of generating income or profit over time, focusing on long-term wealth building rather than immediate gains.",
          difficulty: "EASY",
          type: "RECALL",
        },
        {
          id: "q2",
          question:
            "In the TCS case study, what was the approximate return for investors who bought shares at IPO in 2004 and held till 2024?",
          options: ["100%", "200%", "300%+", "500%+"],
          correctAnswer: 2,
          explanation:
            "TCS went public at ₹850 in 2004 and trades at over ₹3,500 in 2024, representing a 300%+ return over 20 years, demonstrating the power of long-term investing in quality companies.",
          difficulty: "MEDIUM",
          type: "COMPREHENSION",
        },
        {
          id: "q3",
          question:
            "According to the risk-return spectrum, which investment typically offers 12-15% average returns?",
          options: [
            "Fixed Deposits",
            "Government Bonds",
            "Blue-chip Stocks",
            "Small-cap Stocks",
          ],
          correctAnswer: 2,
          explanation:
            "Blue-chip stocks typically offer 12-15% average returns with medium risk, positioned between safer bonds and riskier small-cap stocks in the risk-return spectrum.",
          difficulty: "MEDIUM",
          type: "RECALL",
        },
        {
          id: "q4",
          question:
            "In the compounding example, ₹1 lakh invested at 12% annual return for 20 years becomes approximately:",
          options: ["₹3.1 lakhs", "₹5.5 lakhs", "₹9.6 lakhs", "₹12 lakhs"],
          correctAnswer: 2,
          explanation:
            "With compound interest at 12% annually for 20 years, ₹1 lakh grows to approximately ₹9.6 lakhs, demonstrating the exponential power of compounding over time.",
          difficulty: "MEDIUM",
          type: "APPLICATION",
        },
        {
          id: "q5",
          question:
            "Why did Rajesh end up with more money than Priya despite investing less total amount?",
          options: [
            "He chose better investments",
            "He started 10 years earlier",
            "He invested in riskier assets",
            "He had better luck",
          ],
          correctAnswer: 1,
          explanation:
            "Rajesh started investing 10 years earlier than Priya, giving his money more time to compound. Time is the most powerful factor in wealth building through compounding.",
          difficulty: "HARD",
          type: "COMPREHENSION",
        },
        {
          id: "q6",
          question:
            "What type of risk affected the entire market during the COVID-19 pandemic in March 2020?",
          options: [
            "Company-specific risk",
            "Market risk",
            "Inflation risk",
            "Liquidity risk",
          ],
          correctAnswer: 1,
          explanation:
            "Market risk (systematic risk) affects the entire market simultaneously. COVID-19 was a market-wide event that caused broad-based declines across all sectors and stocks.",
          difficulty: "EASY",
          type: "COMPREHENSION",
        },
        {
          id: "q7",
          question:
            "According to the asset allocation strategy, a 25-year-old investor should typically have what percentage in stocks?",
          options: ["30%", "50%", "70%", "90%"],
          correctAnswer: 2,
          explanation:
            "Young investors (age 25) can typically allocate 70% to stocks due to their long investment horizon, allowing them to weather short-term volatility for potentially higher long-term returns.",
          difficulty: "MEDIUM",
          type: "APPLICATION",
        },
        {
          id: "q8",
          question:
            "If inflation is 6% and your investment returns 8%, what is your real return?",
          options: ["14%", "8%", "6%", "2%"],
          correctAnswer: 3,
          explanation:
            "Real return = Nominal return - Inflation rate. So 8% - 6% = 2%. This represents the actual increase in purchasing power after accounting for inflation.",
          difficulty: "HARD",
          type: "APPLICATION",
        },
        {
          id: "q9",
          question:
            "In the penny doubling exercise, approximately how much would you have after 30 days?",
          options: ["₹1 crore", "₹10 crores", "₹53+ crores", "₹100 crores"],
          correctAnswer: 2,
          explanation:
            "Starting with ₹1 and doubling it every day for 30 days results in ₹53+ crores (2^30 = over 1 billion), demonstrating exponential growth power.",
          difficulty: "HARD",
          type: "APPLICATION",
        },
        {
          id: "q10",
          question:
            "You have ₹50,000 to invest. Based on diversification principles, which approach is BEST?",
          scenario:
            "You are 30 years old, have stable income, and this is your first investment. You want to balance growth with some safety.",
          options: [
            "Put all ₹50,000 in one promising small-cap stock",
            "Split equally between 5 different large-cap stocks",
            "Invest in a diversified mutual fund",
            "Keep it all in a fixed deposit",
          ],
          correctAnswer: 2,
          explanation:
            "For a first-time investor, a diversified mutual fund provides instant diversification across multiple stocks and sectors, professional management, and is suitable for the long-term growth goal while managing risk.",
          difficulty: "HARD",
          type: "SCENARIO",
        },
      ],
    },
  },

  // Continue with more comprehensive modules...
  {
    id: "indian-markets-mastery",
    title: "Indian Financial Markets Deep Dive",
    description:
      "Master the Indian financial ecosystem, market structure, and regulatory framework",
    category: "INDIAN_MARKETS",
    difficulty: "BEGINNER",
    duration: 40,
    reward: 750,
    completed: false,
    progress: 0,
    unlocked: false,
    tier: "FOUNDATIONAL",
    prerequisites: ["investing-fundamentals"],
    lessons: [
      {
        id: "market-structure",
        title: "Indian Stock Exchanges: NSE vs BSE",
        type: "TEXT",
        duration: 15,
        completed: false,
        content: `
# Indian Stock Exchanges: The Backbone of Indian Capital Markets

India's stock market ecosystem facilitates over ₹50,000 crores of daily trading through two primary exchanges.

## National Stock Exchange (NSE)
**Founded**: 1992  
**Headquarters**: Mumbai  
**Market Share**: ~90% of equity trading volume

### Key Features:
- Fully electronic trading since inception
- Home to Nifty 50 and Nifty indices
- Advanced technology infrastructure
- Faster order execution

### Popular NSE Indices:
- **Nifty 50**: Top 50 companies by market cap
- **Nifty Next 50**: Companies ranked 51-100
- **Nifty Bank**: Banking sector index
- **Nifty IT**: Information Technology index

## Bombay Stock Exchange (BSE)
**Founded**: 1875 (Asia's oldest stock exchange)  
**Headquarters**: Mumbai  
**Market Share**: ~10% of equity trading volume

### Key Features:
- Rich historical legacy of 149+ years
- Home to Sensex (BSE 30)
- Largest number of listed companies (5,000+)
- Strong presence in SME segment

### Popular BSE Indices:
- **Sensex**: Top 30 companies by market cap
- **BSE 100**: Top 100 companies
- **BSE Midcap**: Mid-sized companies
- **BSE Smallcap**: Smaller companies

## Detailed Comparison

| Feature | NSE | BSE |
|---------|-----|-----|
| **Daily Turnover** | ₹45,000+ crores | ₹4,000+ crores |
| **Listed Companies** | 2,000+ | 5,000+ |
| **Flagship Index** | Nifty 50 | Sensex |
| **Derivative Volume** | Very High | Moderate |
| **Technology** | Advanced | Good |
| **SME Platform** | NSE Emerge | BSE SME |

## Market Segments Overview

### 1. Equity Segment (Cash Market)
- **Normal Market**: Regular buy/sell of stocks
- **Auction Market**: For settlement defaults
- **Odd Lot Market**: For quantities less than market lot

### 2. Derivatives Segment  
- **Futures**: Contracts to buy/sell at future date
- **Options**: Right (not obligation) to buy/sell
- **Currency Derivatives**: INR pairs trading

### 3. Debt Segment
- **Government Securities**: T-Bills, G-Secs
- **Corporate Bonds**: Company debt instruments
- **Commercial Papers**: Short-term corporate debt

### 4. Mutual Fund Segment
- **NFO**: New Fund Offers
- **SIP**: Systematic Investment Plans
- **Switch/Redemption**: Fund management

## Real-World Trading Flow
When you place an order to buy 100 shares of Infosys:

1. **Order Placement**: Through broker's app/platform
2. **Order Routing**: Sent to NSE/BSE matching engine
3. **Price Discovery**: Matched with best sell order
4. **Trade Execution**: Confirmed within milliseconds
5. **Settlement**: T+1 (Trade + 1 day)
6. **Delivery**: Shares credited to demat account

## Market Timings Deep Dive

### Pre-Opening Session (9:00 AM - 9:15 AM)
- **9:00-9:08 AM**: Order collection period
- **9:08-9:12 AM**: Order matching and trade confirmation  
- **9:12-9:15 AM**: Buffer period (no price changes)

### Regular Session (9:15 AM - 3:30 PM)
- Continuous order matching
- Real-time price discovery
- Highest liquidity period

### Post-Market Session (3:40 PM - 4:00 PM)  
- Limited trading window
- Price band: ±10% from closing price
- Lower liquidity, mainly retail-focused

## Technology Infrastructure

### Trading Systems
- **NSE**: NEAT (National Exchange for Automated Trading)
- **BSE**: BOLT (BSE Online Trading)
- **Speed**: Order execution in microseconds
- **Capacity**: Handle millions of orders daily

### Risk Management
- **Circuit Breakers**: 10%, 15%, 20% limits
- **Position Limits**: Prevent excessive concentration
- **Margin Requirements**: Risk-based margins
- **Surveillance**: Real-time monitoring for manipulation

## Global Integration
Indian markets are connected globally through:
- **ADRs/GDRs**: Indian companies on foreign exchanges
- **FII Investment**: Foreign institutional participation
- **Currency Markets**: INR trading pairs
- **Commodity Linkages**: Gold, crude oil correlations
        `,
        keyTakeaways: [
          "NSE dominates trading volume (90%), BSE has more listed companies (5,000+)",
          "Both exchanges offer equity, derivatives, debt, and mutual fund segments",
          "Electronic trading ensures transparent price discovery and fast execution",
          "Understanding market timings helps optimize trading strategies",
        ],
        actionItems: [
          "Open trading accounts with brokers having access to both NSE and BSE",
          "Compare liquidity of same stocks on both exchanges",
          "Practice placing orders during different market sessions",
          "Monitor circuit breaker triggers and their market impact",
        ],
      },
      // More lessons would continue here...
    ],
    quiz: {
      id: "indian-markets-quiz",
      passed: false,
      score: 0,
      attempts: 0,
      minPassingScore: 70,
      questions: [
        {
          id: "q1",
          question:
            "What are the regular trading hours for Indian stock markets?",
          options: [
            "9:00 AM - 4:00 PM",
            "9:15 AM - 3:30 PM",
            "10:00 AM - 4:00 PM",
            "9:30 AM - 4:00 PM",
          ],
          correctAnswer: 1,
          explanation:
            "Indian stock markets operate from 9:15 AM to 3:30 PM IST, Monday to Friday, with pre-market (9:00-9:15 AM) and post-market (3:40-4:00 PM) sessions extending the trading window.",
          difficulty: "EASY",
          type: "RECALL",
        },
        {
          id: "q2",
          question: "Which exchange has the higher daily trading volume?",
          options: ["BSE", "NSE", "Both are equal", "It varies daily"],
          correctAnswer: 1,
          explanation:
            "NSE has approximately 90% market share with daily turnover of ₹45,000+ crores compared to BSE's ₹4,000+ crores, making NSE the dominant exchange by volume.",
          difficulty: "EASY",
          type: "RECALL",
        },
        {
          id: "q3",
          question:
            "During the pre-opening session, when does order matching occur?",
          options: [
            "9:00-9:08 AM",
            "9:08-9:12 AM",
            "9:12-9:15 AM",
            "Throughout 9:00-9:15 AM",
          ],
          correctAnswer: 1,
          explanation:
            "Order matching and trade confirmation happens during 9:08-9:12 AM, after the order collection period (9:00-9:08 AM) and before the buffer period (9:12-9:15 AM).",
          difficulty: "MEDIUM",
          type: "COMPREHENSION",
        },
        // More questions would continue...
      ],
    },
  },

  // TIER 2: INTERMEDIATE MODULES
  {
    id: "market-analysis",
    title: "Market Analysis",
    description:
      "Master fundamental and technical analysis to make informed investment decisions in the Indian market",
    category: "ANALYSIS",
    difficulty: "INTERMEDIATE",
    duration: 60,
    reward: 800,
    completed: false,
    progress: 0,
    unlocked: false,
    prerequisites: ["investing-fundamentals", "indian-markets-mastery"],
    tier: "INTERMEDIATE",
    lessons: [
      {
        id: "fundamental-analysis",
        title: "Fundamental Analysis: Understanding Company Value",
        type: "TEXT",
        duration: 15,
        completed: false,
        content: `
# Fundamental Analysis: Understanding Company Value

Imagine you're buying a house. You wouldn't just look at the asking price, right? You'd check the neighborhood, structural condition, market trends, and compare similar properties. **Fundamental analysis works the same way for stocks** - it's about determining the true value of a company.

## What is Fundamental Analysis?

Fundamental analysis is the method of evaluating a company's intrinsic value by examining its financial health, business model, competitive position, and growth prospects. It answers the question: "Is this stock worth its current price?"

## Key Financial Ratios to Master

### Price-to-Earnings (P/E) Ratio
**Formula**: Current Share Price ÷ Earnings Per Share (EPS)

**Real Example**: If Infosys trades at ₹1,500 and has an EPS of ₹60, its P/E ratio is 25. This means investors are willing to pay ₹25 for every ₹1 of earnings.

**Industry Comparison**:
- IT Sector Average P/E: 20-25
- Banking Sector Average P/E: 12-18
- FMCG Sector Average P/E: 30-40

### Return on Equity (ROE)
**Formula**: Net Income ÷ Shareholders' Equity × 100

**What it means**: How efficiently a company generates profits from shareholders' investments.

**Benchmark**: ROE > 15% is considered excellent in Indian markets.

### Debt-to-Equity Ratio
**Formula**: Total Debt ÷ Total Equity

**Red Flags**: D/E ratio > 2 indicates high leverage and potential risk.

## Real-World Case Study: HDFC Bank vs Competitors

Let's analyze HDFC Bank using fundamental analysis:

**Financial Strength (2023 data)**:
- ROE: 17.2% (Excellent - above 15% benchmark)
- Net NPA: 0.31% (Very Low - indicates good asset quality)
- CASA Ratio: 41% (Strong - low-cost deposits)
- Credit Growth: 20% YoY (Healthy expansion)

**Competitive Moats**:
- Strong brand recognition and customer trust
- Extensive branch and digital network
- Superior risk management practices
- Consistent dividend payment history

**Valuation Analysis**:
- P/E Ratio: 18x (Reasonable for a quality bank)
- P/B Ratio: 3.2x (Premium but justified by quality)
- Dividend Yield: 1.2% (Consistent payout)

**Investment Thesis**: HDFC Bank demonstrates strong fundamentals with consistent profitability, low NPAs, and robust capital adequacy, justifying its premium valuation.

## The 5-Step Fundamental Analysis Process

### Step 1: Industry Analysis
Understand the sector dynamics, growth prospects, and regulatory environment.

### Step 2: Company Business Model
Analyze revenue streams, competitive advantages, and market position.

### Step 3: Financial Statement Analysis
Deep dive into Income Statement, Balance Sheet, and Cash Flow Statement.

### Step 4: Management Quality Assessment
Evaluate leadership track record, corporate governance, and strategic vision.

### Step 5: Valuation and Price Target
Calculate intrinsic value using DCF, P/E multiples, and peer comparison.

## Fundamental Analysis Tools for Indian Markets

### Free Resources:
- **BSE/NSE websites**: Annual reports and financial data
- **Screener.in**: Comprehensive ratio analysis
- **MoneyControl**: Industry comparisons and peer analysis
- **Value Research**: Mutual fund and stock research

### Key Documents to Read:
- Annual Report (comprehensive business overview)
- Quarterly Results (recent performance trends)
- Investor Presentations (management outlook)
- Credit Rating Reports (debt assessment)
        `,
        keyTakeaways: [
          "Fundamental analysis determines intrinsic value by examining financial health and business fundamentals",
          "Key ratios include P/E (valuation), ROE (profitability), and D/E (leverage) for comprehensive assessment",
          "Industry comparison is crucial - same P/E ratio means different things in different sectors",
          "Quality companies with strong moats can justify premium valuations over time",
          "Combine quantitative metrics with qualitative factors like management quality and competitive position"
        ],
        actionItems: [
          "Practice calculating P/E, ROE, and D/E ratios for 3 companies in different sectors",
          "Read the annual report of one company you're interested in investing in",
          "Compare financial ratios of 3 companies within the same industry",
          "Set up stock screeners to filter companies based on fundamental criteria"
        ],
      },
      {
        id: "technical-analysis",
        title: "Technical Analysis: Reading Market Patterns",
        type: "INTERACTIVE",
        duration: 18,
        completed: false,
        content: `
# Technical Analysis: Reading Market Patterns

While fundamental analysis tells you **what** to buy, technical analysis tells you **when** to buy. Think of it as reading the market's pulse - understanding crowd psychology and price movements through charts and patterns.

## Core Principles of Technical Analysis

### 1. Price Discounts Everything
All known information - earnings, news, sentiment - is already reflected in the stock price. The chart tells the complete story.

### 2. Price Moves in Trends
Markets move in predictable patterns: uptrends, downtrends, and sideways trends. The key is identifying and riding these trends.

### 3. History Repeats Itself
Human psychology drives market behavior, and patterns tend to repeat because emotions like fear and greed are constant.

## Essential Technical Indicators

### Moving Averages (MA)
**Simple Moving Average (SMA)**: Average price over a specific period
**Exponential Moving Average (EMA)**: Gives more weight to recent prices

**Trading Signals**:
- **Golden Cross**: 50-day MA crosses above 200-day MA (Bullish)
- **Death Cross**: 50-day MA crosses below 200-day MA (Bearish)

**Real Example**: Reliance Industries in 2020
- Golden Cross in June 2020 at ₹1,200 level
- Stock rallied to ₹2,400 by August 2020 (100% gain)
- Death Cross in February 2021, followed by correction to ₹1,800

### Relative Strength Index (RSI)
**Purpose**: Measures momentum and identifies overbought/oversold conditions
**Range**: 0-100
**Signals**:
- RSI > 70: Overbought (potential selling opportunity)
- RSI < 30: Oversold (potential buying opportunity)

### MACD (Moving Average Convergence Divergence)
**Components**:
- MACD Line: 12-day EMA minus 26-day EMA
- Signal Line: 9-day EMA of MACD line
- Histogram: MACD minus Signal line

**Trading Signals**:
- MACD crosses above Signal line: Bullish
- MACD crosses below Signal line: Bearish

## Chart Patterns that Work in Indian Markets

### 1. Head and Shoulders (Reversal Pattern)
**Formation**: Three peaks with the middle one being the highest
**Significance**: Strong bearish reversal signal
**Target**: Distance from head to neckline, projected downward

**Case Study**: Bajaj Finance in 2021
- Formed Head and Shoulders pattern at ₹6,500 levels
- Neckline break at ₹5,800 triggered selling
- Target achieved at ₹4,500 (18% decline as projected)

### 2. Double Bottom (Reversal Pattern)
**Formation**: Two equal lows with a peak in between
**Significance**: Bullish reversal after downtrend
**Target**: Distance from bottom to peak, projected upward

### 3. Ascending Triangle (Continuation Pattern)
**Formation**: Horizontal resistance with rising support
**Significance**: Bullish continuation pattern
**Entry**: Breakout above resistance with volume

## Support and Resistance: The Foundation

### Support Levels
Price levels where buying interest emerges, preventing further decline.

**Psychological Levels**: Round numbers like ₹100, ₹500, ₹1,000
**Previous Highs/Lows**: Historical turning points
**Moving Average Levels**: Dynamic support/resistance

### Resistance Levels
Price levels where selling pressure emerges, preventing further rise.

**Example**: Nifty 50 Resistance Levels
- 18,000 (Psychological resistance - round number)
- 17,850 (Previous all-time high)
- 200-day MA at 17,650 (Dynamic resistance)

## Volume Analysis: The Secret Ingredient

Volume confirms price movements and pattern validity.

**Key Principles**:
- **Breakouts with high volume**: More reliable
- **Price rise with increasing volume**: Healthy uptrend
- **Price rise with decreasing volume**: Weak rally (potential reversal)

**Real-World Application**:
When Titan Company broke above ₹2,800 resistance:
- With high volume: Rally continued to ₹3,200 (14% gain)
- With low volume: False breakout, fell back to ₹2,600

## Risk Management in Technical Trading

### Position Sizing
Never risk more than 2% of your portfolio on a single trade.

**Example**: ₹1,00,000 portfolio
- Maximum risk per trade: ₹2,000
- If stop-loss is 5%, position size = ₹40,000

### Stop-Loss Placement
- **Support/Resistance**: Place stop-loss below support or above resistance
- **Percentage Rule**: 3-5% for short-term trades, 10-15% for swing trades
- **ATR-based**: Use Average True Range for dynamic stop-losses

## Technical Analysis Tools and Platforms

### Free Platforms:
- **TradingView**: Advanced charting with Indian market data
- **NSE/BSE Charts**: Basic technical analysis tools
- **Screener.in**: Technical screeners and charts

### Popular Indicators Combo:
- Moving Averages + RSI + Volume (for trend following)
- MACD + Bollinger Bands + Support/Resistance (for momentum trading)
        `,
        keyTakeaways: [
          "Technical analysis focuses on price action and timing rather than company fundamentals",
          "Moving averages help identify trends, while RSI and MACD provide momentum signals",
          "Chart patterns like Head & Shoulders and Double Bottom offer high-probability trading setups",
          "Support and resistance levels act as key decision points for entry and exit",
          "Volume confirmation is crucial for validating breakouts and pattern reliability",
          "Proper risk management with stop-losses is essential for technical trading success"
        ],
        actionItems: [
          "Practice identifying support and resistance levels on 5 different stock charts",
          "Set up moving average crossover alerts for stocks in your watchlist",
          "Study one major chart pattern formation in recent Indian market history",
          "Calculate position sizes using the 2% risk rule for your portfolio"
        ],
      },
      {
        id: "market-cycles",
        title: "Understanding Market Cycles and Timing",
        type: "TEXT",
        duration: 12,
        completed: false,
        content: `
# Understanding Market Cycles and Timing

Markets don't move in straight lines. Like seasons in nature, financial markets follow predictable cycles driven by economic factors, investor psychology, and liquidity flows. Understanding these cycles can significantly improve your investment timing and returns.

## The Four Phases of Market Cycles

### Phase 1: Accumulation (Market Bottom)
**Characteristics**:
- Pessimism is widespread, media coverage is negative
- Valuations are attractive, but few investors are buying
- Trading volumes are low, institutional buying begins quietly
- Economic indicators start showing early signs of recovery

**Indian Market Example**: March 2020 COVID Crash
- Nifty fell from 12,400 to 7,600 (39% decline)
- PE ratio dropped to 14x (significantly below historical average of 20x)
- FII selling was ₹61,000 crores, but smart money started accumulating
- Companies like Reliance, TCS were available at 30-40% discounts

**Investment Strategy**: This is the best time to invest for long-term wealth creation.

### Phase 2: Markup (Bull Market)
**Characteristics**:
- Prices begin to rise, economic data improves
- Media sentiment shifts from negative to cautiously optimistic
- Retail participation increases, mutual fund inflows surge
- Corporate earnings growth accelerates

**Indian Market Example**: April 2020 - October 2021
- Nifty rallied from 7,600 to 18,600 (145% gain in 18 months)
- New demat accounts opened: 14 million (record high)
- SIP inflows reached ₹10,000 crores monthly
- IPO market boomed with 63 listings raising ₹1.2 lakh crores

**Investment Strategy**: Continue systematic investments, book partial profits on overvalued stocks.

### Phase 3: Distribution (Market Top)
**Characteristics**:
- Euphoria peaks, everyone is talking about stock markets
- Valuations become stretched, PE ratios above historical averages
- New investors enter market at high prices
- Institutional investors start taking profits

**Indian Market Example**: October 2021 - January 2022
- Nifty PE reached 24x (20% above long-term average)
- Retail investor participation at all-time high
- Small-cap and mid-cap valuations became extremely expensive
- FII started net selling ₹1.1 lakh crores in 2022

**Investment Strategy**: Be cautious, book profits, increase cash allocation.

### Phase 4: Decline (Bear Market)
**Characteristics**:
- Prices fall significantly, panic selling emerges
- Economic concerns dominate headlines
- Retail investors suffer losses and exit markets
- Liquidity dries up, forced selling by leveraged investors

**Indian Market Example**: January 2022 - June 2022
- Nifty corrected from 18,600 to 15,200 (18% decline)
- Mid-cap and small-cap fell 25-35%
- Inflation fears, FII selling, and global recession worries
- Many retail investors exited at losses

**Investment Strategy**: Prepare shopping lists, accumulate quality stocks at discounts.

## Economic Indicators to Track Market Cycles

### Leading Indicators (Predict Future Trends)
1. **Yield Curve**: Inverted curve often signals recession
2. **Credit Growth**: Slowing credit indicates economic weakness
3. **Currency Trends**: INR weakness can signal foreign outflows
4. **Commodity Prices**: Oil, gold trends impact inflation and growth

### Coincident Indicators (Current State)
1. **GDP Growth Rate**: Quarterly economic performance
2. **Industrial Production**: Manufacturing sector health
3. **Corporate Earnings**: Aggregate profit growth trends
4. **Employment Data**: Job market conditions

### Lagging Indicators (Confirm Trends)
1. **Inflation Rate**: CPI and WPI trends
2. **Interest Rates**: RBI policy rate changes
3. **Bank NPAs**: Asset quality deterioration
4. **Fiscal Deficit**: Government spending patterns

## Psychological Phases of Market Cycles

### Bull Market Psychology
1. **Optimism**: "This time is different"
2. **Excitement**: Easy money attracts new investors
3. **Thrill**: Everyone has success stories
4. **Euphoria**: Markets can only go up
5. **Anxiety**: First signs of trouble
6. **Denial**: "It's just a correction"

### Bear Market Psychology
1. **Fear**: Panic selling begins
2. **Desperation**: Trying to recover losses
3. **Panic**: Indiscriminate selling
4. **Capitulation**: Giving up and exiting
5. **Despondency**: Markets are rigged
6. **Depression**: Swearing off investing forever

## Sector Rotation During Market Cycles

### Early Bull Market
**Defensive Sectors Rally First**:
- Banking and Financial Services
- Infrastructure and Capital Goods
- Metals and Mining

### Mid Bull Market
**Growth Sectors Take Over**:
- Technology and IT Services
- Consumer Discretionary
- Healthcare and Pharma

### Late Bull Market
**Speculative Sectors Peak**:
- Small-cap and Mid-cap stocks
- New-age companies (EV, Renewable Energy)
- IPOs and startup listings

### Bear Market
**Quality and Defensive Sectors Outperform**:
- FMCG and Consumer Staples
- Utilities and Power
- Dividend-yielding stocks

## Practical Market Timing Strategies

### Dollar Cost Averaging (DCA)
Invest fixed amounts regularly regardless of market conditions.

**Example**: ₹10,000 monthly SIP in Nifty Index Fund
- Bear Market (2022): Bought more units at lower NAV
- Bull Market (2023): Benefited from earlier accumulation
- Result: Average cost smoothened, emotions removed

### Value Averaging
Increase investments when markets fall, reduce when markets rise.

**Strategy**: Target portfolio value growth of 12% annually
- If portfolio underperforms, invest more
- If portfolio outperforms, invest less or book profits

### Market Valuation-Based Allocation

**PE-Based Strategy for Nifty Allocation**:
- PE < 16: 80% equity allocation (Undervalued)
- PE 16-20: 60% equity allocation (Fair Value)
- PE 20-24: 40% equity allocation (Overvalued)
- PE > 24: 20% equity allocation (Expensive)

## Global Factors Affecting Indian Market Cycles

### Federal Reserve Policy
- **Rate Hikes**: Dollar strengthens, FII outflows from India
- **Rate Cuts**: Dollar weakens, FII inflows to India

### China Economic Data
- **Growth Acceleration**: Commodity demand increases, benefits Indian exporters
- **Growth Deceleration**: Global supply chain disruption affects Indian companies

### Crude Oil Prices
- **Rising Oil**: Inflation concerns, INR weakness, negative for India
- **Falling Oil**: Lower inflation, fiscal benefit, positive for markets
        `,
        keyTakeaways: [
          "Market cycles have four predictable phases: Accumulation, Markup, Distribution, and Decline",
          "The best investment opportunities occur during accumulation phase when pessimism is high",
          "Economic indicators help identify current cycle phase and predict transitions",
          "Investor psychology drives market extremes - fear at bottoms, greed at tops",
          "Sector rotation patterns are predictable across different market cycle phases",
          "Global factors like Fed policy and oil prices significantly impact Indian market cycles"
        ],
        actionItems: [
          "Track Nifty PE ratio monthly to assess market valuation levels",
          "Create watchlists of quality stocks to buy during market corrections",
          "Monitor key economic indicators like GDP growth, inflation, and credit growth",
          "Implement systematic investment plans to benefit from market volatility"
        ],
      },
      {
        id: "portfolio-diversification",
        title: "Portfolio Diversification Strategies",
        type: "INTERACTIVE",
        duration: 15,
        completed: false,
        content: `
# Portfolio Diversification: Building a Resilient Investment Portfolio

"Don't put all your eggs in one basket" - this age-old wisdom forms the foundation of portfolio diversification. But effective diversification goes beyond just buying different stocks. It's about creating a portfolio that can weather various market conditions while optimizing returns.

## The Science Behind Diversification

### Correlation and Risk Reduction
When you combine assets that don't move in perfect harmony, the overall portfolio risk reduces without necessarily compromising returns.

**Mathematical Principle**: Portfolio risk is less than the weighted average of individual asset risks when correlations are below 1.0.

**Real Example**: During COVID-19 (March 2020)
- Technology stocks (Infosys, TCS): +15% to +30%
- Aviation stocks (IndiGo, SpiceJet): -60% to -70%
- Pharma stocks (Dr. Reddy's, Cipla): +40% to +50%
- Banking stocks (HDFC Bank, ICICI): -25% to -35%

A diversified portfolio containing all these sectors would have significantly lower volatility than holding only aviation or only banking stocks.

## Types of Diversification

### 1. Asset Class Diversification
Spread investments across different asset classes with varying risk-return profiles.

**Optimal Asset Allocation by Age**:

**Age 25-35 (Aggressive Growth)**:
- Equity: 70-80%
- Debt: 15-25%
- Gold: 5-10%
- Real Estate: 0-10%

**Age 35-50 (Balanced Growth)**:
- Equity: 60-70%
- Debt: 20-30%
- Gold: 5-10%
- Real Estate: 5-15%

**Age 50+ (Conservative)**:
- Equity: 40-50%
- Debt: 40-50%
- Gold: 5-10%
- Real Estate: 0-10%

### 2. Sector Diversification
Spread equity investments across different industry sectors.

**Recommended Sector Allocation for Indian Portfolio**:
- Financial Services: 25-30%
- Information Technology: 15-20%
- FMCG: 10-15%
- Healthcare: 8-12%
- Energy: 8-12%
- Infrastructure: 5-10%
- Metals: 5-8%
- Auto: 5-8%
- Others: 10-15%

**Sector Correlation Analysis**:
- IT and Banking: Low correlation (0.3)
- FMCG and Healthcare: Moderate correlation (0.6)
- Metals and Energy: High correlation (0.8)

### 3. Market Cap Diversification
Balance between large-cap stability and small/mid-cap growth potential.

**Market Cap Allocation Strategy**:
- Large Cap (>₹20,000 cr): 60-70% (Stability and dividends)
- Mid Cap (₹5,000-20,000 cr): 20-25% (Growth potential)
- Small Cap (<₹5,000 cr): 10-15% (High growth, high risk)

**Performance Comparison (2018-2023 CAGR)**:
- Large Cap: 11.2%
- Mid Cap: 13.8%
- Small Cap: 15.4%
- Volatility: Small Cap > Mid Cap > Large Cap

### 4. Geographic Diversification
Include international exposure to reduce country-specific risks.

**International Allocation Options**:
- US Markets: 10-15% (via Feeder funds, ETFs)
- Developed Markets: 5-10% (Europe, Japan)
- Emerging Markets: 3-5% (China, Brazil, excluding India)

**Benefits of International Diversification**:
- Currency diversification (USD exposure)
- Access to global leaders (Apple, Microsoft, Google)
- Different economic cycles
- Technology and innovation exposure

## Building a Core-Satellite Portfolio

### Core Holdings (70-80% of Portfolio)
**Characteristics**: Low-cost, diversified, stable returns
**Examples**:
- Nifty 50 Index Fund
- Large-cap mutual funds
- Multi-cap funds
- Debt funds for fixed income

### Satellite Holdings (20-30% of Portfolio)
**Characteristics**: Higher risk/return, active management, specific themes
**Examples**:
- Sector-specific funds (IT, Pharma, Banking)
- Small/Mid-cap funds
- International funds
- Individual high-conviction stocks

**Sample Core-Satellite Allocation**:

**Core (75%)**:
- Nifty 50 Index Fund: 40%
- Multi-cap Fund: 20%
- Corporate Bond Fund: 15%

**Satellite (25%)**:
- Small Cap Fund: 8%
- International Fund: 7%
- Sectoral Fund (IT): 5%
- High-conviction stocks: 5%

## Risk Management Through Diversification

### Systematic vs Unsystematic Risk

**Systematic Risk (Market Risk)**:
- Cannot be diversified away
- Affects entire market
- Examples: Interest rate changes, inflation, recession

**Unsystematic Risk (Specific Risk)**:
- Can be reduced through diversification
- Company or sector-specific
- Examples: Management changes, product failures, regulatory issues

**Optimal Number of Stocks**: Research shows 15-20 stocks can eliminate 90% of unsystematic risk.

### Rebalancing Strategy

**Why Rebalance?**
Over time, winning assets grow to become larger portions of your portfolio, increasing concentration risk.

**Rebalancing Methods**:

1. **Calendar Rebalancing**: Every 6-12 months
2. **Threshold Rebalancing**: When allocation deviates by 5% from target
3. **Hybrid Approach**: Calendar + threshold combination

**Example of Rebalancing**:
**Target Allocation**: 60% Equity, 40% Debt
**After 1 Year**: 70% Equity (due to market rally), 30% Debt
**Action**: Sell 10% equity, buy 10% debt to restore balance

## Common Diversification Mistakes

### 1. Over-Diversification (Diworsification)
**Problem**: Holding too many similar assets
**Example**: Buying 5 large-cap funds that hold the same top 10 stocks
**Solution**: Check portfolio overlap, limit to 3-4 mutual funds per category

### 2. Home Bias
**Problem**: Investing only in familiar markets/companies
**Example**: Only buying Indian stocks, ignoring international exposure
**Solution**: Allocate 10-20% to international markets

### 3. False Diversification
**Problem**: Assets appearing different but moving together
**Example**: Buying stocks in IT, ITES, Software - all tech-related
**Solution**: Understand true business correlations, not just sector labels

### 4. Timing-Based Changes
**Problem**: Constantly changing allocation based on recent performance
**Example**: Selling small-caps after poor performance, missing recovery
**Solution**: Stick to strategic allocation, make tactical adjustments only

## Measuring Portfolio Diversification

### Portfolio Metrics to Track

1. **Portfolio Beta**: Measure of systematic risk
   - Target: 0.8-1.2 for balanced portfolios
   - >1.2: High market risk
   - <0.8: Conservative portfolio

2. **Correlation Analysis**: Average correlation between holdings
   - Target: <0.7 for good diversification
   - >0.8: Poor diversification
   - <0.5: Excellent diversification

3. **Maximum Drawdown**: Worst peak-to-trough decline
   - Target: <20% for diversified portfolios
   - Monitor during market downturns
   - Compare with benchmark indices

### Diversification Tools and Platforms

**Portfolio Analysis Tools**:
- Portfolio Visualizer: Advanced analytics
- Morningstar X-Ray: Mutual fund overlap analysis
- Value Research: Indian mutual fund analysis
- MoneyControl: Portfolio tracker

**Free Diversification Checkers**:
- Groww Portfolio Analyzer
- ET Money Portfolio Tracker
- Kuvera Portfolio X-Ray
        `,
        keyTakeaways: [
          "Effective diversification reduces portfolio risk without necessarily compromising returns",
          "Diversify across asset classes, sectors, market caps, and geographies for optimal risk management",
          "Core-satellite approach balances stability with growth opportunities",
          "15-20 stocks can eliminate 90% of company-specific risk through diversification",
          "Regular rebalancing maintains target allocation and manages concentration risk",
          "Avoid over-diversification and false diversification that add complexity without benefits"
        ],
        actionItems: [
          "Analyze your current portfolio for sector and asset class concentration",
          "Calculate correlation between your top holdings to identify overlap",
          "Set up a rebalancing schedule (quarterly or semi-annually)",
          "Allocate 10-15% to international markets for geographic diversification"
        ],
      },
    ],
    quiz: {
      id: "market-analysis-quiz",
      passed: false,
      score: 0,
      attempts: 0,
      minPassingScore: 70,
      questions: [
        {
          id: "q1",
          question:
            "What does a P/E ratio of 25 for a stock trading at ₹1,500 indicate?",
          options: [
            "The company's earnings per share is ₹60",
            "The company will grow 25% annually",
            "The stock is 25% overvalued",
            "The company has 25 competitors",
          ],
          correctAnswer: 0,
          explanation:
            "P/E ratio = Price ÷ EPS. If P/E is 25 and price is ₹1,500, then EPS = ₹1,500 ÷ 25 = ₹60. This means investors pay ₹25 for every ₹1 of current earnings.",
          difficulty: "MEDIUM",
          type: "APPLICATION",
        },
        {
          id: "q2",
          question:
            "In technical analysis, what does a 'Golden Cross' pattern indicate?",
          options: [
            "50-day MA crosses below 200-day MA (Bearish signal)",
            "50-day MA crosses above 200-day MA (Bullish signal)",
            "RSI crosses above 70 (Overbought signal)",
            "MACD crosses above signal line (Buy signal)",
          ],
          correctAnswer: 1,
          explanation:
            "Golden Cross occurs when the 50-day moving average crosses above the 200-day moving average, indicating a potential bullish trend reversal and long-term upward momentum.",
          difficulty: "EASY",
          type: "RECALL",
        },
        {
          id: "q3",
          question:
            "During which phase of the market cycle should long-term investors typically increase their investment allocation?",
          options: [
            "Markup phase (Bull market)",
            "Distribution phase (Market top)",
            "Decline phase (Bear market)",
            "Accumulation phase (Market bottom)",
          ],
          correctAnswer: 3,
          explanation:
            "The accumulation phase offers the best long-term investment opportunities as valuations are attractive, pessimism is high, and smart money begins accumulating quality assets at discounted prices.",
          difficulty: "MEDIUM",
          type: "COMPREHENSION",
        },
        {
          id: "q4",
          question:
            "What is the primary benefit of sector diversification in a portfolio?",
          options: [
            "Guarantees higher returns than concentrated portfolios",
            "Eliminates all investment risks completely",
            "Reduces unsystematic risk specific to individual sectors",
            "Ensures equal returns from all sectors",
          ],
          correctAnswer: 2,
          explanation:
            "Sector diversification helps reduce unsystematic (specific) risk by spreading investments across different industries that may perform differently under various economic conditions, though it cannot eliminate systematic market risk.",
          difficulty: "MEDIUM",
          type: "COMPREHENSION",
        },
        {
          id: "q5",
          question:
            "If RSI of a stock is at 75, what does this typically suggest to technical analysts?",
          options: [
            "The stock is oversold and due for a bounce",
            "The stock is overbought and may face selling pressure",
            "The stock is fairly valued at current levels",
            "The stock will definitely fall by 25%",
          ],
          correctAnswer: 1,
          explanation:
            "RSI above 70 (especially at 75) indicates overbought conditions, suggesting the stock may have risen too quickly and could face selling pressure or a correction in the near term.",
          difficulty: "EASY",
          type: "COMPREHENSION",
        },
        {
          id: "q6",
          question:
            "What is the recommended portfolio allocation for a 30-year-old investor according to modern portfolio theory?",
          options: [
            "40% Equity, 50% Debt, 10% Gold",
            "70% Equity, 20% Debt, 10% Gold",
            "90% Equity, 5% Debt, 5% Gold",
            "50% Equity, 40% Debt, 10% Gold",
          ],
          correctAnswer: 1,
          explanation:
            "Young investors (25-35 years) can typically allocate 70-80% to equity for growth potential, 15-25% to debt for stability, and 5-10% to gold for diversification, given their long investment horizon.",
          difficulty: "MEDIUM",
          type: "APPLICATION",
        },
        {
          id: "q7",
          question:
            "Which of the following is considered a leading economic indicator for predicting market cycles?",
          options: [
            "Current GDP growth rate",
            "Last quarter's inflation rate",
            "Yield curve inversion",
            "Previous year's corporate earnings",
          ],
          correctAnswer: 2,
          explanation:
            "Yield curve inversion (when short-term rates exceed long-term rates) is a leading indicator that often predicts economic recession 6-18 months in advance, making it valuable for market cycle analysis.",
          difficulty: "HARD",
          type: "COMPREHENSION",
        },
        {
          id: "q8",
          question:
            "In fundamental analysis, what does a Debt-to-Equity ratio of 2.5 indicate about a company?",
          options: [
            "The company is conservatively financed",
            "The company has high leverage and potential risk",
            "The company has strong profit margins",
            "The company is growing at 25% annually",
          ],
          correctAnswer: 1,
          explanation:
            "A D/E ratio of 2.5 means the company has ₹2.50 of debt for every ₹1 of equity, indicating high leverage. This poses higher financial risk, especially during economic downturns or rising interest rates.",
          difficulty: "MEDIUM",
          type: "COMPREHENSION",
        },
        {
          id: "q9",
          question:
            "You have a portfolio with 80% allocation to Indian IT stocks. What is the primary risk you face?",
          options: [
            "Currency risk from international exposure",
            "High concentration risk in one sector",
            "Lack of growth potential in technology",
            "Too much diversification reducing returns",
          ],
          correctAnswer: 1,
          explanation:
            "Having 80% allocation in one sector (IT) creates high concentration risk. If the IT sector faces challenges (regulation, outsourcing trends, global recession), the entire portfolio would be severely impacted.",
          difficulty: "EASY",
          type: "SCENARIO",
        },
        {
          id: "q10",
          question:
            "When should you typically rebalance your investment portfolio?",
          options: [
            "Only during bull markets to book profits",
            "Every day based on market movements",
            "When asset allocation deviates significantly from target (5%+) or periodically (6-12 months)",
            "Only during market crashes to buy more",
          ],
          correctAnswer: 2,
          explanation:
            "Portfolio rebalancing should be done when allocations drift significantly from targets (typically 5% deviation) or on a periodic basis (6-12 months) to maintain desired risk levels and benefit from market volatility.",
          difficulty: "MEDIUM",
          type: "APPLICATION",
        },
      ],
    },
  },

  // TIER 2: INTERMEDIATE/ADVANCED MODULES
  {
    id: "strategy-planning",
    title: "Strategy & Planning",
    description:
      "Learn how to design and apply investment strategies effectively for long-term wealth creation",
    category: "STRATEGY",
    difficulty: "ADVANCED",
    duration: 55,
    reward: 900,
    completed: false,
    progress: 0,
    unlocked: false,
    prerequisites: ["investing-fundamentals", "indian-markets-mastery", "market-analysis"],
    tier: "INTERMEDIATE",
    lessons: [
      {
        id: "longterm-vs-shortterm",
        title: "Long-term vs Short-term Investing",
        type: "TEXT",
        duration: 10,
        completed: false,
        content: `
# Long-term vs Short-term Investing: Choose Your Investment Horizon

The difference between wealth creation and wealth destruction often lies in your investment time horizon. Long-term investing harnesses the power of compounding, while short-term trading requires exceptional skill and often leads to losses for retail investors.

## Long-term Investing (5+ years)
Long-term investing focuses on buying quality assets and holding them through market cycles. Warren Buffett's famous quote captures this perfectly: "Time in the market beats timing the market."

**Benefits**: Compounding returns, reduced transaction costs, tax efficiency, lower stress, historically proven wealth creation.

**Real Example**: An investor who bought Infosys shares in 2000 at ₹200 and held until 2023 saw their investment grow to ₹1,600+ (700% return) despite multiple market crashes.

## Short-term Trading (Days to months)
Short-term trading involves frequent buying and selling to profit from price fluctuations. This requires technical analysis skills, market timing, and constant monitoring.

**Challenges**: High transaction costs, frequent taxes, emotional stress, requires expertise, statistically most traders lose money.

**Statistics**: Studies show 80-90% of day traders lose money over time, while long-term investors have historically made profits.
        `,
        keyTakeaways: [
          "Long-term investing leverages compounding and reduces the impact of market volatility",
          "Short-term trading requires exceptional skill and most retail traders lose money",
          "Time in the market generally beats timing the market for wealth creation"
        ],
      },
      {
        id: "sips-etfs",
        title: "SIPs & ETFs: Systematic Investment Tools",
        type: "INTERACTIVE",
        duration: 12,
        completed: false,
        content: `
# SIPs & ETFs: Building Wealth Systematically

Systematic Investment Plans (SIPs) and Exchange Traded Funds (ETFs) are powerful tools that make investing accessible, disciplined, and cost-effective for retail investors.

## Systematic Investment Plans (SIPs)
SIPs allow you to invest a fixed amount regularly in mutual funds, regardless of market conditions. This approach eliminates the need to time the market and builds investing discipline.

**Key Benefits**: Rupee cost averaging (buying more units when prices are low, fewer when high), builds discipline, starts with as little as ₹500, automatic investment reduces emotional decisions.

**Real Example**: ₹5,000 monthly SIP in Nifty 50 index fund over 10 years would have grown to approximately ₹9.5 lakhs (invested: ₹6 lakhs, returns: ₹3.5 lakhs assuming 12% CAGR).

## Exchange Traded Funds (ETFs)
ETFs are mutual funds that trade like stocks on exchanges. They typically track an index (like Nifty 50) and offer broad market exposure at low costs.

**Advantages**: Very low expense ratios (0.05-0.5%), instant diversification, high liquidity, transparent holdings, tax efficiency.

**Popular Indian ETFs**: Nifty 50 ETF, Bank Nifty ETF, Gold ETF, International ETFs tracking US markets.
        `,
        keyTakeaways: [
          "SIPs enable rupee cost averaging and build investing discipline automatically",
          "ETFs provide low-cost, diversified market exposure with high liquidity",
          "Both tools make investing accessible to retail investors with small amounts"
        ],
      },
      {
        id: "value-vs-growth",
        title: "Value vs Growth Investing Approaches",
        type: "TEXT",
        duration: 11,
        completed: false,
        content: `
# Value vs Growth Investing: Two Proven Wealth Creation Philosophies

Value and Growth are two fundamental investment approaches that have created enormous wealth over decades. Understanding both helps you choose the right strategy for your goals and temperament.

## Value Investing
Value investing involves buying stocks that appear underpriced relative to their intrinsic value. Value investors look for companies trading below their fair value due to temporary problems or market pessimism.

**Key Metrics**: Low P/E ratios, low P/B ratios, high dividend yields, strong balance sheets, consistent earnings.

**Famous Practitioners**: Warren Buffett, Benjamin Graham. Buffett's Berkshire Hathaway has delivered 20%+ annual returns for 50+ years using value principles.

**Indian Example**: Buying banking stocks during 2018-2019 NPA crisis when they were trading at 8-10x P/E despite strong underlying businesses.

## Growth Investing
Growth investing focuses on companies with above-average earnings growth potential, even if they appear expensive on traditional metrics. Growth investors pay premium prices for superior growth prospects.

**Key Characteristics**: High revenue/earnings growth, expanding market share, innovative products/services, reinvestment in business growth.

**Success Stories**: Amazon, Google, Microsoft. In India: companies like Asian Paints, HDFC Bank in their growth phases delivered exceptional returns despite appearing expensive.

**Trade-off**: Growth stocks often carry higher valuations and greater volatility but offer potential for superior long-term returns.
        `,
        keyTakeaways: [
          "Value investing focuses on buying underpriced assets with strong fundamentals",
          "Growth investing targets companies with superior earnings growth potential",
          "Both approaches have created substantial wealth when applied with discipline"
        ],
      },
      {
        id: "investment-plan",
        title: "Building Your Personal Investment Plan",
        type: "INTERACTIVE",
        duration: 13,
        completed: false,
        content: `
# Building Your Personal Investment Plan: A Step-by-Step Framework

A well-structured investment plan acts as your roadmap to financial success. It aligns your investments with your goals, risk tolerance, and time horizon while maintaining discipline during market volatility.

## Step 1: Define Your Financial Goals
**Short-term (1-3 years)**: Emergency fund, vacation, down payment. **Medium-term (3-10 years)**: Car purchase, home down payment, children's education. **Long-term (10+ years)**: Retirement, children's higher education, wealth building.

**SMART Goals Example**: "Accumulate ₹25 lakhs for home down payment in 7 years" - Specific, Measurable, Achievable, Relevant, Time-bound.

## Step 2: Assess Risk Tolerance
**Conservative**: Prefer stability, can't afford major losses, nearing retirement. **Moderate**: Balanced approach, some volatility acceptable for better returns. **Aggressive**: Young investors, high risk tolerance, long investment horizon.

**Risk Assessment**: Age, income stability, existing financial cushion, investment experience, emotional comfort with volatility.

## Step 3: Asset Allocation Strategy
**Age-based Rule**: Equity % = 100 - Age. A 30-year-old could have 70% equity, 30% debt. **Goal-based Allocation**: Emergency fund (liquid funds), short-term goals (debt funds), long-term goals (equity funds).

## Step 4: Investment Vehicle Selection
**Equity Exposure**: Large-cap funds (stability), multi-cap funds (diversification), index funds (low cost). **Debt Exposure**: Short-duration funds (liquidity), long-duration funds (higher returns), PPF/EPF (tax benefits).

## Step 5: Implementation and Review
Start SIPs, set automatic investments, review quarterly, rebalance annually, increase SIP amounts with income growth.
        `,
        keyTakeaways: [
          "Investment plans should align with specific financial goals and timelines",
          "Risk tolerance determines appropriate asset allocation between equity and debt",
          "Regular review and rebalancing ensures the plan stays on track"
        ],
      },
      {
        id: "strategy-roleplay",
        title: "Roleplay Scenario: Choosing Your Investment Strategy",
        type: "CASE_STUDY",
        duration: 9,
        completed: false,
        content: `
# Roleplay Scenario: Meet Three Investors - Choose Your Strategy

Let's examine three different investor profiles and determine the most suitable investment strategy for each. This exercise helps you understand how personal circumstances drive investment decisions.

## Investor Profile 1: Raj (Age 25, Software Engineer)
**Situation**: Fresh graduate, ₹8 lakh annual salary, no dependents, aggressive growth mindset, 40-year investment horizon.

**Recommended Strategy**: 80% equity (mix of large-cap and mid-cap funds), 15% debt (for stability), 5% gold (diversification). Focus on growth investing with long-term SIPs.

**Rationale**: Young age allows high risk tolerance, long time horizon enables equity wealth creation, systematic investing builds discipline.

## Investor Profile 2: Priya (Age 40, Marketing Manager)
**Situation**: ₹15 lakh annual income, two children, moderate risk tolerance, planning for children's education and retirement.

**Recommended Strategy**: 60% equity (predominantly large-cap for stability), 35% debt (target-date funds for education goals), 5% gold. Balanced value and growth approach.

**Rationale**: Balanced approach manages multiple goals, moderate equity exposure for growth with stability, goal-based investing for education expenses.

## Investor Profile 3: Kumar (Age 55, Business Owner)
**Situation**: High net worth, nearing retirement, capital preservation priority, some growth needed to beat inflation.

**Recommended Strategy**: 40% equity (dividend-focused large-cap funds), 50% debt (high-quality bonds and FDs), 10% gold/real estate. Value investing approach.

**Rationale**: Capital preservation with modest growth, dividend income for cash flow, reduced volatility as retirement approaches.

## Your Turn: Which Profile Matches You?
Consider your age, income, dependents, risk tolerance, and goals. Your investment strategy should evolve as your life circumstances change.
        `,
        keyTakeaways: [
          "Investment strategy must align with age, income, and life circumstances",
          "Young investors can afford higher equity allocation for growth",
          "Strategy should evolve from growth-focused to income-focused over time"
        ],
      },
    ],
    quiz: {
      id: "strategy-planning-quiz",
      passed: false,
      score: 0,
      attempts: 0,
      minPassingScore: 70,
      questions: [
        {
          id: "q1",
          question: "What is the primary advantage of long-term investing over short-term trading?",
          options: [
            "Guaranteed returns with no risk",
            "Ability to time market perfectly",
            "Compounding returns and reduced transaction costs",
            "Higher returns in all market conditions"
          ],
          correctAnswer: 2,
          explanation: "Long-term investing benefits from compounding returns, lower transaction costs, and historically better wealth creation compared to short-term trading.",
          difficulty: "EASY",
          type: "COMPREHENSION",
        },
        {
          id: "q2",
          question: "What does SIP primarily help investors achieve?",
          options: [
            "Market timing for maximum returns",
            "Rupee cost averaging and investment discipline",
            "Guaranteed profits in all conditions",
            "Elimination of all investment risks"
          ],
          correctAnswer: 1,
          explanation: "SIPs enable rupee cost averaging by investing fixed amounts regularly, which helps smooth out market volatility and builds investment discipline.",
          difficulty: "EASY",
          type: "RECALL",
        },
        {
          id: "q3",
          question: "Which metric is most important for value investors?",
          options: [
            "High revenue growth rate",
            "Low P/E ratio with strong fundamentals",
            "Maximum social media mentions",
            "Highest stock price appreciation"
          ],
          correctAnswer: 1,
          explanation: "Value investors focus on low P/E ratios combined with strong fundamentals, seeking stocks trading below their intrinsic value.",
          difficulty: "MEDIUM",
          type: "APPLICATION",
        },
        {
          id: "q4",
          question: "For a 30-year-old investor, what is the recommended equity allocation using the age-based rule?",
          options: [
            "30%",
            "50%",
            "70%",
            "90%"
          ],
          correctAnswer: 2,
          explanation: "The age-based rule suggests Equity % = 100 - Age, so a 30-year-old should have approximately 70% equity allocation.",
          difficulty: "EASY",
          type: "APPLICATION",
        },
        {
          id: "q5",
          question: "What is the main difference between ETFs and regular mutual funds?",
          options: [
            "ETFs have higher expense ratios",
            "ETFs trade on exchanges like stocks",
            "ETFs guarantee higher returns",
            "ETFs only invest in bonds"
          ],
          correctAnswer: 1,
          explanation: "ETFs trade on stock exchanges like individual stocks, providing liquidity and transparency, while regular mutual funds are priced once daily.",
          difficulty: "MEDIUM",
          type: "COMPREHENSION",
        },
        {
          id: "q6",
          question: "Which investment approach focuses on companies with above-average earnings growth?",
          options: [
            "Value investing",
            "Growth investing",
            "Income investing",
            "Index investing"
          ],
          correctAnswer: 1,
          explanation: "Growth investing targets companies with superior earnings growth potential, even if they appear expensive on traditional valuation metrics.",
          difficulty: "EASY",
          type: "RECALL",
        },
        {
          id: "q7",
          question: "What should be the primary consideration when building an investment plan?",
          options: [
            "Following popular stock tips",
            "Copying successful investors exactly",
            "Aligning with personal goals and risk tolerance",
            "Investing only in trending sectors"
          ],
          correctAnswer: 2,
          explanation: "Investment plans should align with individual financial goals, risk tolerance, time horizon, and personal circumstances for optimal success.",
          difficulty: "MEDIUM",
          type: "APPLICATION",
        },
        {
          id: "q8",
          question: "For a 55-year-old nearing retirement, which strategy is most appropriate?",
          options: [
            "80% equity for maximum growth",
            "100% in speculative stocks",
            "40% equity with focus on capital preservation",
            "Only fixed deposits for safety"
          ],
          correctAnswer: 2,
          explanation: "Near-retirement investors should focus on capital preservation with modest growth, typically 40% equity and higher debt allocation for stability.",
          difficulty: "MEDIUM",
          type: "SCENARIO",
        },
      ],
    },
  },

  // TIER 3: ADVANCED MODULES  
  {
    id: "risk-advanced",
    title: "Risk & Advanced Applications",
    description:
      "Master advanced investing topics including risk control, derivatives, and modern applications for sophisticated investors",
    category: "RISK",
    difficulty: "ADVANCED",
    duration: 65,
    reward: 1000,
    completed: false,
    progress: 0,
    unlocked: false,
    prerequisites: ["investing-fundamentals", "indian-markets-mastery", "market-analysis", "strategy-planning"],
    tier: "ADVANCED",
    lessons: [
      {
        id: "types-of-risk",
        title: "Types of Investment Risk",
        type: "TEXT",
        duration: 9,
        completed: false,
        content: `
# Types of Investment Risk: Understanding What Can Go Wrong

Risk is the possibility of losing money or not achieving expected returns. Understanding different types of risk helps investors make informed decisions and implement appropriate protection strategies.

## Systematic Risk (Market Risk)
Risk that affects the entire market and cannot be diversified away. Examples include recession, inflation changes, interest rate movements, and political instability.

**Indian Example**: COVID-19 pandemic in March 2020 caused systematic risk - Nifty fell 40% affecting all sectors regardless of company quality.

## Unsystematic Risk (Company-Specific Risk)  
Risk specific to individual companies or sectors that can be reduced through diversification. Examples include management changes, product failures, regulatory issues, and competitive pressures.

**Case Study**: Jet Airways bankruptcy in 2019 was unsystematic risk - while aviation sector faced challenges, other airlines like IndiGo survived and thrived.
        `,
        keyTakeaways: [
          "Systematic risk affects entire markets and cannot be diversified away",
          "Unsystematic risk is company-specific and can be reduced through diversification",
          "Understanding risk types helps in building appropriate investment strategies"
        ],
      },
      {
        id: "stop-loss-hedging",
        title: "Stop-loss & Hedging Strategies",
        type: "INTERACTIVE",
        duration: 11,
        completed: false,
        content: `
# Stop-loss & Hedging: Protecting Your Investment Capital

Stop-loss orders and hedging strategies are essential tools for managing downside risk and preserving capital during adverse market movements.

## Stop-loss Orders
Automatic sell orders triggered when stock price falls to predetermined level. This limits losses by exiting positions before further decline.

**Types**: Market stop-loss (sells at market price), stop-limit orders (sells at specific price or better), trailing stop-loss (adjusts with price movements).

**Example**: Buy Reliance at ₹2,000, set stop-loss at ₹1,800 (10% loss limit). If price falls to ₹1,800, shares are automatically sold.

## Hedging Strategies
Using financial instruments to offset potential losses in existing positions. Common hedging tools include options, futures, and inverse ETFs.

**Put Options**: Buying put options provides insurance against stock decline. Like buying insurance for your car - you pay premium for protection.

**Portfolio Hedging**: During market uncertainty, investors may hedge equity positions using Nifty put options or gold investments.
        `,
        keyTakeaways: [
          "Stop-loss orders automatically limit losses at predetermined levels",
          "Hedging uses derivatives to protect against adverse price movements",
          "Risk management tools cost money but provide valuable downside protection"
        ],
      },
      {
        id: "behavioral-biases",
        title: "Behavioral Biases in Investing",
        type: "TEXT",
        duration: 10,
        completed: false,
        content: `
# Behavioral Biases: Your Mind as Your Biggest Enemy

Human psychology often works against successful investing. Understanding and overcoming behavioral biases is crucial for long-term investment success.

## Common Biases That Hurt Returns

**Loss Aversion**: Feeling pain of losses twice as much as pleasure from gains. This leads to holding losing stocks too long and selling winners too early.

**Herd Mentality**: Following crowd behavior rather than independent analysis. Buying during euphoria (market tops) and selling during panic (market bottoms).

**Confirmation Bias**: Seeking information that confirms existing beliefs while ignoring contradictory evidence. This prevents objective investment analysis.

**Overconfidence**: Believing you can predict market movements or pick winning stocks consistently. Studies show overconfident investors trade more and earn less.

## Overcoming Behavioral Biases
Set investment rules and stick to them, use systematic investment plans (SIPs), focus on long-term goals rather than short-term noise, and regularly review and rebalance portfolio.

**Warren Buffett's Advice**: "Be fearful when others are greedy and greedy when others are fearful" - the opposite of herd mentality.
        `,
        keyTakeaways: [
          "Behavioral biases like loss aversion and herd mentality hurt investment returns",
          "Systematic approaches like SIPs help overcome emotional decision-making",
          "Successful investing requires discipline to act contrary to natural instincts"
        ],
      },
      {
        id: "derivatives-basics",
        title: "Derivatives: Futures and Options Fundamentals",
        type: "INTERACTIVE",
        duration: 12,
        completed: false,
        content: `
# Derivatives: Futures and Options for Advanced Investors

Derivatives are financial contracts whose value depends on underlying assets. They can be used for speculation, hedging, or arbitrage in sophisticated investment strategies.

## Futures Contracts
Agreement to buy/sell asset at predetermined price on future date. Both parties are obligated to complete the transaction.

**Example**: Nifty futures trading at 18,000 for December expiry. If you buy one lot and Nifty closes at 18,500, you profit ₹12,500 (500 points × 25 lot size).

**Uses**: Speculation on market direction, hedging existing portfolio, arbitrage opportunities between cash and futures markets.

## Options Contracts
Give the right (not obligation) to buy (call) or sell (put) asset at specific price within certain time period.

**Call Options**: Right to buy. Profitable when underlying asset price rises above strike price plus premium paid.

**Put Options**: Right to sell. Profitable when underlying asset price falls below strike price minus premium paid.

**Risk Management**: Options provide asymmetric payoff - limited loss (premium paid) but unlimited profit potential.

**Indian Market**: NSE offers options on Nifty, Bank Nifty, and individual stocks like Reliance, TCS, HDFC Bank with monthly and weekly expiries.
        `,
        keyTakeaways: [
          "Futures obligate both parties while options provide rights without obligations",
          "Derivatives can be used for speculation, hedging, or arbitrage strategies",
          "Options offer asymmetric risk-reward with limited downside and unlimited upside"
        ],
      },
      {
        id: "algorithmic-trading",
        title: "Algorithmic Trading and Modern Applications",
        type: "TEXT",
        duration: 8,
        completed: false,
        content: `
# Algorithmic Trading: Technology Meets Investment Strategy

Algorithmic trading uses computer programs to execute trades based on predefined criteria. This represents the evolution of investing from manual to systematic approaches.

## What is Algorithmic Trading?
Computer algorithms analyze market data, identify opportunities, and execute trades automatically without human intervention. Algorithms can process vast amounts of data and execute trades in milliseconds.

**Advantages**: Removes emotions from trading, faster execution, ability to monitor multiple markets simultaneously, backtesting strategies on historical data.

**Popular Strategies**: Mean reversion (buying oversold, selling overbought), momentum trading (following trends), arbitrage (price differences between markets).

## Modern Applications
**Robo-Advisors**: Automated platforms that create and manage portfolios based on investor profile. Examples include Zerodha Coin, Groww, and ET Money in India.

**Smart Beta ETFs**: Use rules-based strategies instead of market capitalization weighting. Examples include low volatility ETFs, quality factor ETFs.

**AI in Investing**: Machine learning algorithms analyze alternative data sources like satellite imagery, social media sentiment, and credit card transactions for investment insights.

**Retail Access**: Platforms like Zerodha Streak, Upstox Pro allow retail investors to create and deploy algorithmic strategies without programming knowledge.
        `,
        keyTakeaways: [
          "Algorithmic trading removes emotions and enables systematic strategy execution",
          "Modern technology democratizes access to sophisticated investment strategies",
          "Robo-advisors and smart beta ETFs bring professional-grade tools to retail investors"
        ],
      },
      {
        id: "crisis-case-study",
        title: "Crisis Case Study: 2008 Financial Crisis Lessons",
        type: "CASE_STUDY",
        duration: 10,
        completed: false,
        content: `
# Crisis Case Study: Learning from the 2008 Financial Crisis

The 2008 global financial crisis provides invaluable lessons about risk management, market cycles, and the importance of diversification during extreme events.

## What Happened?
US housing bubble burst triggered global financial meltdown. Banks collapsed, stock markets crashed worldwide, and economies entered recession.

**Timeline**: Lehman Brothers bankruptcy (September 2008), global stock markets fell 50%+, credit markets froze, unemployment soared, governments intervened with massive stimulus.

## Impact on Indian Markets
**Sensex Performance**: Fell from 21,000 in January 2008 to 8,000 in March 2009 (62% decline). Banking and real estate sectors were worst hit due to global linkages.

**Sector Impact**: IT services companies faced client budget cuts, commodity companies suffered from demand destruction, defensive sectors like FMCG performed relatively better.

## Key Lessons Learned

**Diversification Importance**: Portfolios concentrated in financial stocks suffered massive losses. Geographic and sector diversification provided some protection.

**Liquidity Matters**: During crisis, even quality assets became illiquid. Maintaining cash reserves and liquid investments proved crucial for survival.

**Opportunity in Crisis**: Investors who bought quality stocks at crisis valuations (2009) achieved exceptional returns over subsequent decade.

**Risk Management**: Excessive leverage amplified losses. Conservative debt levels and proper position sizing enabled survival and recovery.

**Government Response**: Coordinated global monetary and fiscal stimulus prevented complete economic collapse, highlighting importance of policy support.
        `,
        keyTakeaways: [
          "Financial crises create both massive risks and exceptional opportunities",
          "Diversification and liquidity management are crucial during extreme market stress",
          "Quality investments purchased at crisis valuations often deliver superior long-term returns"
        ],
      },
      {
        id: "capstone-project",
        title: "Capstone Project: Build Your Diversified Portfolio",
        type: "INTERACTIVE",
        duration: 15,
        completed: false,
        content: `
# Capstone Project: Design Your Complete Investment Portfolio

Apply everything you've learned to create a comprehensive, diversified investment portfolio tailored to your goals, risk tolerance, and investment horizon.

## Project Framework

**Step 1: Define Your Investment Profile**
Age, income, existing assets, financial goals (short/medium/long-term), risk tolerance assessment, investment timeline, family dependencies.

**Step 2: Asset Allocation Strategy**
Based on your profile, determine optimal allocation: Equity percentage (large/mid/small cap distribution), debt percentage (government/corporate bonds), alternative investments (gold, REITs, international).

**Step 3: Investment Vehicle Selection**
Choose specific mutual funds, ETFs, or stocks for each allocation. Consider expense ratios, past performance, fund manager track record, investment philosophy alignment.

**Step 4: Implementation Plan**
Decide between lump sum vs SIP approach, set up automatic investments, determine rebalancing frequency, establish monitoring and review schedule.

**Step 5: Risk Management Integration**
Set stop-loss levels for individual holdings, plan hedge strategies for market downturns, maintain emergency fund outside investment portfolio, consider insurance needs.

## Sample Portfolio: 30-Year-Old Professional
**Profile**: ₹10 lakh annual income, moderate risk tolerance, 30-year investment horizon, goals include house purchase (7 years) and retirement planning.

**Allocation**: 70% Equity (40% large-cap, 20% mid-cap, 10% international), 25% Debt (15% corporate bonds, 10% liquid funds), 5% Gold ETF.

**Implementation**: ₹15,000 monthly SIP across chosen funds, quarterly portfolio review, annual rebalancing, increase SIP by 10% annually.

## Your Assignment
Create your personalized portfolio using this framework. Document your reasoning for each decision and establish monitoring and review processes.
        `,
        keyTakeaways: [
          "Successful portfolios require clear goals, appropriate allocation, and systematic implementation",
          "Regular monitoring and rebalancing maintain portfolio alignment with objectives",
          "Risk management integration protects capital while pursuing long-term growth"
        ],
      },
    ],
    quiz: {
      id: "risk-advanced-quiz",
      passed: false,
      score: 0,
      attempts: 0,
      minPassingScore: 70,
      questions: [
        {
          id: "q1",
          question: "Which type of risk cannot be eliminated through diversification?",
          options: [
            "Company-specific risk",
            "Systematic risk",
            "Unsystematic risk",
            "Management risk"
          ],
          correctAnswer: 1,
          explanation: "Systematic risk affects the entire market and cannot be diversified away, while unsystematic risks are company-specific and can be reduced through diversification.",
          difficulty: "MEDIUM",
          type: "RECALL",
        },
        {
          id: "q2",
          question: "What is the primary purpose of a stop-loss order?",
          options: [
            "To guarantee profits on investments",
            "To automatically limit losses at predetermined levels",
            "To increase position sizes during rallies",
            "To eliminate all investment risks"
          ],
          correctAnswer: 1,
          explanation: "Stop-loss orders automatically sell positions when prices fall to predetermined levels, helping limit losses and protect capital.",
          difficulty: "EASY",
          type: "COMPREHENSION",
        },
        {
          id: "q3",
          question: "Which behavioral bias leads investors to hold losing stocks too long?",
          options: [
            "Overconfidence bias",
            "Confirmation bias",
            "Loss aversion",
            "Herd mentality"
          ],
          correctAnswer: 2,
          explanation: "Loss aversion causes investors to feel the pain of losses more than the pleasure of gains, leading them to hold losing positions hoping to break even.",
          difficulty: "MEDIUM",
          type: "COMPREHENSION",
        },
        {
          id: "q4",
          question: "What distinguishes futures contracts from options contracts?",
          options: [
            "Futures are more expensive than options",
            "Futures obligate both parties, options provide rights without obligations",
            "Options are only for stocks, futures are for commodities",
            "Futures expire monthly, options expire weekly"
          ],
          correctAnswer: 1,
          explanation: "Futures contracts obligate both parties to complete the transaction, while options give the holder the right but not the obligation to buy or sell.",
          difficulty: "MEDIUM",
          type: "COMPREHENSION",
        },
        {
          id: "q5",
          question: "What is the main advantage of algorithmic trading over manual trading?",
          options: [
            "Guarantees higher returns in all markets",
            "Removes emotions and enables systematic execution",
            "Eliminates all trading risks completely",
            "Only works during bull markets"
          ],
          correctAnswer: 1,
          explanation: "Algorithmic trading removes human emotions from decision-making and enables systematic execution of predefined strategies without psychological biases.",
          difficulty: "EASY",
          type: "COMPREHENSION",
        },
        {
          id: "q6",
          question: "During the 2008 financial crisis, Indian markets (Sensex) fell approximately:",
          options: [
            "25% from peak to trough",
            "40% from peak to trough", 
            "62% from peak to trough",
            "80% from peak to trough"
          ],
          correctAnswer: 2,
          explanation: "The Sensex fell from about 21,000 in January 2008 to around 8,000 in March 2009, representing a decline of approximately 62%.",
          difficulty: "MEDIUM",
          type: "RECALL",
        },
        {
          id: "q7",
          question: "Which strategy helps overcome herd mentality in investing?",
          options: [
            "Following popular stock recommendations",
            "Buying when markets are euphoric",
            "Systematic investment plans (SIPs)",
            "Trading based on news headlines"
          ],
          correctAnswer: 2,
          explanation: "SIPs help overcome herd mentality by investing fixed amounts regularly regardless of market conditions, reducing the impact of emotional decisions.",
          difficulty: "MEDIUM",
          type: "APPLICATION",
        },
        {
          id: "q8",
          question: "What type of option would you buy to profit from a falling stock price?",
          options: [
            "Call option",
            "Put option",
            "Future contract",
            "Forward contract"
          ],
          correctAnswer: 1,
          explanation: "Put options give you the right to sell at a specific price, making them profitable when the underlying stock price falls below the strike price.",
          difficulty: "EASY",
          type: "APPLICATION",
        },
        {
          id: "q9",
          question: "What is the key lesson about portfolio construction from the 2008 crisis?",
          options: [
            "Concentrate in the best performing sector",
            "Avoid all equity investments during uncertainty",
            "Diversification and liquidity management are crucial",
            "Only invest in government bonds for safety"
          ],
          correctAnswer: 2,
          explanation: "The 2008 crisis highlighted the importance of diversification across sectors and geographies, plus maintaining liquidity for opportunities and survival.",
          difficulty: "MEDIUM",
          type: "SCENARIO",
        },
        {
          id: "q10",
          question: "In the capstone portfolio for a 30-year-old, what should be the approximate equity allocation?",
          options: [
            "30-40%",
            "50-60%",
            "70-80%",
            "90-100%"
          ],
          correctAnswer: 2,
          explanation: "Young investors with long investment horizons can typically allocate 70-80% to equity for growth potential, balanced with some debt for stability.",
          difficulty: "MEDIUM",
          type: "APPLICATION",
        },
      ],
    },
  },
  // Additional modules would continue here following the same comprehensive pattern...
];

const ENHANCED_ACHIEVEMENTS: Achievement[] = [
  // Beginner Tier Achievements
  {
    id: "first-lesson",
    title: "Knowledge Seeker",
    description: "Complete your first lesson",
    icon: "📚",
    reward: {
      coins: 100,
      xp: 50,
    },
    unlocked: false,
    category: "BEGINNER",
    progress: 0,
    target: 1,
    tier: 1,
    displayBadge: "🔰",
    milestoneType: "COMPLETION",
  },
  {
    id: "first-quiz",
    title: "Quiz Rookie",
    description: "Pass your first quiz",
    icon: "🎯",
    reward: {
      coins: 200,
      xp: 100,
    },
    unlocked: false,
    category: "BEGINNER",
    progress: 0,
    target: 1,
    tier: 1,
    displayBadge: "🎓",
    milestoneType: "COMPLETION",
  },
  {
    id: "foundation-builder",
    title: "Foundation Builder",
    description: "Complete all foundational modules",
    icon: "🧱",
    reward: {
      coins: 500,
      xp: 250,
      bonusUnlock: "advanced-strategies-preview",
    },
    unlocked: false,
    category: "BEGINNER",
    progress: 0,
    target: 3,
    tier: 2,
    displayBadge: "🏛️",
    milestoneType: "COMPLETION",
  },
  // Intermediate Tier Achievements
  {
    id: "analysis-expert",
    title: "Analysis Expert",
    description: "Master fundamental and technical analysis",
    icon: "📊",
    reward: {
      coins: 1000,
      xp: 500,
      bonusUnlock: "professional-tools-access",
    },
    unlocked: false,
    category: "INTERMEDIATE",
    progress: 0,
    target: 2,
    tier: 3,
    displayBadge: "📈",
    milestoneType: "COMPLETION",
  },
  {
    id: "perfect-score",
    title: "Perfect Scholar",
    description: "Score 100% on any quiz",
    icon: "💯",
    reward: {
      coins: 300,
      xp: 200,
    },
    unlocked: false,
    category: "INTERMEDIATE",
    progress: 0,
    target: 1,
    tier: 2,
    displayBadge: "🏆",
    milestoneType: "ACCURACY",
  },
  // Advanced Tier Achievements
  {
    id: "investment-guru",
    title: "Investment Guru",
    description: "Complete all learning modules",
    icon: "👑",
    reward: {
      coins: 2000,
      xp: 1000,
      bonusUnlock: "guru-masterclass",
    },
    unlocked: false,
    category: "MASTERY",
    progress: 0,
    target: 10,
    tier: 5,
    displayBadge: "👑",
    milestoneType: "COMPLETION",
  },
  // Special Achievements
  {
    id: "streak-master",
    title: "Consistency Champion",
    description: "Maintain a 7-day learning streak",
    icon: "🔥",
    reward: {
      coins: 700,
      xp: 350,
    },
    unlocked: false,
    category: "SPECIAL",
    progress: 0,
    target: 7,
    tier: 3,
    displayBadge: "🔥",
    milestoneType: "STREAK",
  },
];

export function useEnhancedLearning() {
  const [modules, setModules] = useState<LearningModule[]>(
    COMPREHENSIVE_LEARNING_MODULES,
  );
  const [progress, setProgress] = useState<LearningProgress>({
    totalCoinsEarned: 0,
    modulesCompleted: 0,
    quizzesPassed: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalTimeSpent: 0,
    achievements: ENHANCED_ACHIEVEMENTS,
    level: 1,
    experiencePoints: 0,
    lastActiveDate: Date.now(),
    moduleCompletionsByCategory: {
      BASICS: 0,
      ANALYSIS: 0,
      STRATEGY: 0,
      RISK: 0,
      INDIAN_MARKETS: 0,
      ADVANCED: 0,
    },
    unlockedBonusContent: [],
    learningPath: {
      current: "investing-fundamentals",
      next: "indian-markets-mastery",
      completed: [],
    },
  });

  const completeLesson = useCallback((moduleId: string, lessonId: string) => {
    setModules((prev) =>
      prev.map((module) => {
        if (module.id === moduleId) {
          const updatedLessons = module.lessons.map((lesson) =>
            lesson.id === lessonId ? { ...lesson, completed: true } : lesson,
          );
          const completedLessons = updatedLessons.filter(
            (l) => l.completed,
          ).length;
          const newProgress = (completedLessons / updatedLessons.length) * 70; // 70% for lessons, 30% for quiz

          return {
            ...module,
            lessons: updatedLessons,
            progress: newProgress,
          };
        }
        return module;
      }),
    );

    // Update streak and check achievements
    updateStreak();
    checkAchievements("lesson_completed");
  }, []);

  const submitQuiz = useCallback(
    (
      moduleId: string,
      answers: number[],
    ): { passed: boolean; score: number } => {
      let result = { passed: false, score: 0 };

      setModules((prev) =>
        prev.map((module) => {
          if (module.id === moduleId) {
            const quiz = module.quiz;
            const correctAnswers = answers.filter(
              (answer, index) => answer === quiz.questions[index].correctAnswer,
            ).length;

            const score = Math.round(
              (correctAnswers / quiz.questions.length) * 100,
            );
            const passed = score >= quiz.minPassingScore;

            result = { passed, score };

            const updatedQuiz = {
              ...quiz,
              score,
              passed,
              attempts: quiz.attempts + 1,
            };

            let newProgress = module.progress;
            if (passed) {
              newProgress = 100; // Module completed

              // Unlock next module based on prerequisites
              const nextModule = prev.find((m) =>
                m.prerequisites?.includes(moduleId),
              );
              if (nextModule) {
                nextModule.unlocked = true;
              }
            }

            return {
              ...module,
              quiz: updatedQuiz,
              progress: newProgress,
              completed: passed,
            };
          }
          return module;
        }),
      );

      if (result.passed) {
        // Update progress
        setProgress((prev) => ({
          ...prev,
          modulesCompleted: prev.modulesCompleted + 1,
          quizzesPassed: prev.quizzesPassed + 1,
          experiencePoints: prev.experiencePoints + 200,
          totalCoinsEarned:
            prev.totalCoinsEarned +
              modules.find((m) => m.id === moduleId)?.reward || 0,
        }));

        // Check for achievements
        checkAchievements("quiz_passed", result.score);
      }

      return result;
    },
    [modules],
  );

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    const lastActive = progress.lastActiveDate
      ? new Date(progress.lastActiveDate).toDateString()
      : null;

    if (lastActive !== today) {
      setProgress((prev) => ({
        ...prev,
        currentStreak:
          lastActive === new Date(Date.now() - 86400000).toDateString()
            ? prev.currentStreak + 1
            : 1,
        longestStreak: Math.max(prev.longestStreak, prev.currentStreak + 1),
        lastActiveDate: Date.now(),
      }));
    }
  }, [progress.lastActiveDate]);

  const checkAchievements = useCallback(
    (event: string, data?: any) => {
      setProgress((prev) => ({
        ...prev,
        achievements: prev.achievements.map((achievement) => {
          if (achievement.unlocked) return achievement;

          let shouldUnlock = false;
          let newProgress = achievement.progress;

          switch (achievement.id) {
            case "first-lesson":
              if (event === "lesson_completed") {
                newProgress = 1;
                shouldUnlock = true;
              }
              break;
            case "first-quiz":
              if (event === "quiz_passed") {
                newProgress = 1;
                shouldUnlock = true;
              }
              break;
            case "foundation-builder":
              if (event === "quiz_passed") {
                const foundationalModules = modules.filter(
                  (m) => m.tier === "FOUNDATIONAL" && m.completed,
                );
                newProgress = foundationalModules.length;
                shouldUnlock = newProgress >= achievement.target;
              }
              break;
            case "perfect-score":
              if (event === "quiz_passed" && data === 100) {
                newProgress = 1;
                shouldUnlock = true;
              }
              break;
            case "streak-master":
              newProgress = prev.currentStreak;
              shouldUnlock = newProgress >= achievement.target;
              break;
          }

          if (shouldUnlock) {
            return {
              ...achievement,
              unlocked: true,
              unlockedAt: Date.now(),
              progress: newProgress,
            };
          }

          return {
            ...achievement,
            progress: newProgress,
          };
        }),
      }));
    },
    [modules],
  );

  const getAvailableModules = useCallback(() => {
    return modules.filter((module) => module.unlocked);
  }, [modules]);

  const getModuleById = useCallback(
    (id: string) => {
      return modules.find((module) => module.id === id);
    },
    [modules],
  );

  const calculateLevel = useCallback((experiencePoints: number) => {
    return Math.floor(experiencePoints / 500) + 1; // 500 XP per level
  }, []);

  const getUnlockedAchievements = useCallback(() => {
    return progress.achievements.filter((achievement) => achievement.unlocked);
  }, [progress.achievements]);

  const getRecommendedNextModule = useCallback(() => {
    const unlockedModules = getAvailableModules();
    const incompleteModules = unlockedModules.filter((m) => !m.completed);
    return incompleteModules.length > 0 ? incompleteModules[0] : null;
  }, [getAvailableModules]);

  return {
    modules,
    progress: {
      ...progress,
      level: calculateLevel(progress.experiencePoints),
    },
    completeLesson,
    submitQuiz,
    getAvailableModules,
    getModuleById,
    getUnlockedAchievements,
    getRecommendedNextModule,
    updateStreak,
  };
}
