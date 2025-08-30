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
