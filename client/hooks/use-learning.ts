import { useState, useCallback } from "react";

// Utility to fetch Gemini API key from server
async function fetchGeminiApiKey(): Promise<string | undefined> {
  try {
    const res = await fetch('/api/gemini-key');
    if (!res.ok) return undefined;
    const data = await res.json();
    return data.geminiApiKey;
  } catch {
    return undefined;
  }
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: "BASICS" | "ANALYSIS" | "STRATEGY" | "RISK" | "INDIAN_MARKETS";
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  duration: number; // minutes
  reward: number; // coins
  lessons: Lesson[];
  quiz: Quiz;
  completed: boolean;
  progress: number; // 0-100
  unlocked: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  type: "TEXT" | "VIDEO" | "INTERACTIVE";
  completed: boolean;
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  passed: boolean;
  score: number;
  attempts: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  reward: number;
  unlocked: boolean;
  unlockedAt?: number;
  category: string;
  progress: number;
  target: number;
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
}

const LEARNING_MODULES: LearningModule[] = [
  // TIER 1: FOUNDATIONAL MODULES (Beginner)
  {
    id: "investing-basics",
    title: "Investing Fundamentals",
    description:
      "Master the core concepts of investing and build a solid foundation for your investment journey",
    category: "BASICS",
    difficulty: "BEGINNER",
    duration: 30,
    reward: 500,
    completed: false,
    progress: 0,
    unlocked: true,
    lessons: [
      {
        id: "what-is-investing",
        title: "What is Investing?",
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

## Key Takeaways
• Investing is about putting money to work for long-term growth
• Different investment types carry different levels of risk and return
• Starting early gives you the power of compound growth
• Patience and consistency are key to successful investing

## Action Steps
1. Set aside a small amount monthly for investments
2. Learn about different investment options available
3. Consider starting with low-risk options like mutual funds
4. Never invest money you can't afford to lose
        `,
        type: "TEXT",
        completed: false,
      },
      {
        id: "stocks-fundamentals",
        title: "Understanding Stocks",
        content: `
# Understanding Stocks: Your Ownership Certificate

Think of stocks as **ownership certificates** in a business. When you buy a stock, you're not just buying a piece of paper - you're buying a tiny slice of a real company with real assets, employees, and profits.

## What Exactly is a Stock?
A stock represents a claim on a company's assets and earnings. If a company has 1,000 shares outstanding and you own 10 shares, you own 1% of that company.

## Stock Price Movement
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

## Types of Stocks
- **Large Cap**: Established companies (₹20,000+ crore market cap)
- **Mid Cap**: Growing companies (₹5,000-20,000 crore market cap)
- **Small Cap**: Emerging companies (₹500-5,000 crore market cap)

## Interactive Challenge
If you invested ₹10,000 in Infosys in 2000 and held it for 20 years with dividend reinvestment, your investment would be worth approximately ₹2,50,000 today!

## Key Takeaways
• Stocks represent real ownership in companies
• Price movements reflect company performance and market sentiment
• Long-term holding often rewards patient investors
• Diversification across different types of stocks reduces risk

## Action Steps
1. Research 3 companies you use products/services from daily
2. Check their stock performance over the last 5 years
3. Read their latest annual report summary
4. Start following financial news to understand market movements
        `,
        type: "INTERACTIVE",
        completed: false,
      },
      {
        id: "risk-return-relationship",
        title: "Risk vs Return: The Fundamental Trade-off",
        content: `
# Risk vs Return: The Golden Rule of Investing

Imagine you're offered two deals:
- **Deal A**: Guaranteed ₹100 return on ₹1,000 investment (10% return, no risk)
- **Deal B**: Possible ₹300 return on ₹1,000 investment, but you might lose ₹200 (30% potential return, high risk)

This illustrates the **fundamental principle**: Higher potential returns come with higher risk.

## Understanding Risk
Risk in investing refers to the possibility that your investment's actual return will differ from expected return. Types of risk include:

### Market Risk
The risk that the entire market declines, affecting most investments.
*Example*: During COVID-19 in March 2020, even good stocks fell 30-40%.

### Company-Specific Risk
Risk related to individual companies.
*Example*: When Jet Airways went bankrupt, shareholders lost everything despite the airline industry growing.

### Inflation Risk
The risk that inflation erodes your purchasing power.
*Example*: If you earn 6% return but inflation is 7%, you're actually losing money!

## Risk-Return Spectrum (Indian Context)
- **Fixed Deposits**: 6-7% return, very low risk
- **Government Bonds**: 7-8% return, low risk
- **Blue-chip Stocks**: 12-15% average return, medium risk
- **Small-cap Stocks**: 18-25% potential return, high risk
- **Cryptocurrency**: 50%+ potential return, very high risk

## Risk Management Strategies
1. **Diversification**: Don't put all eggs in one basket
2. **Asset Allocation**: Mix of stocks, bonds, gold
3. **Time Horizon**: Longer investment periods reduce risk
4. **Emergency Fund**: Keep 6 months expenses in liquid savings

## Case Study: Conservative vs Aggressive Portfolios
**Conservative Investor (Age 55)**:
- 30% Stocks, 50% Bonds, 20% Fixed Deposits
- Expected Return: 8-10% annually
- Lower volatility, capital preservation focus

**Aggressive Investor (Age 25)**:
- 70% Stocks, 20% Bonds, 10% Cash
- Expected Return: 12-15% annually
- Higher volatility, growth focus

## Key Takeaways
• Risk and return are positively correlated
• Your risk tolerance should match your investment timeline
• Younger investors can afford more risk for higher returns
• Diversification is the only free lunch in investing

## Action Steps
1. Assess your risk tolerance using online questionnaires
2. Determine your investment timeline and goals
3. Create an appropriate asset allocation strategy
4. Start with lower-risk investments and gradually increase exposure
        `,
        type: "TEXT",
        completed: false,
      },
      {
        id: "power-of-compounding",
        title: "The Magic of Compound Growth",
        content: `
# The Magic of Compound Growth: Your Money's Best Friend

Albert Einstein allegedly called compound interest "the eighth wonder of the world." Here's why this concept can transform your financial future.

## What is Compounding?
Compounding occurs when your investment earnings generate their own earnings. It's like a snowball rolling down a hill - it starts small but grows exponentially.

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

## The Power of Starting Early
**Rajesh** starts investing ₹5,000/month at age 25
**Priya** starts investing ₹10,000/month at age 35

Both invest until age 60 at 12% annual return:
- **Rajesh**: Total investment ₹21 lakhs → Final value ₹2.1 crores
- **Priya**: Total investment ₹30 lakhs → Final value ₹1.8 crores

*Despite investing ₹9 lakhs less, Rajesh ends up with ₹30 lakhs more!*

## Real-World Compounding Examples

### Warren Buffett's Journey
- Started investing seriously at age 11
- Today worth $100+ billion
- 99% of his wealth was created after age 50
- Power of 70+ years of compounding

### Indian SIP Success Story
An investor who started a SIP of ₹1,000 in a Nifty 50 index fund in 2000:
- Total investment in 24 years: ₹2.88 lakhs
- Current value (2024): ₹12+ lakhs
- Returns purely from compounding: ₹9+ lakhs

## Factors Affecting Compounding
1. **Time**: Most critical factor - start early!
2. **Rate of Return**: Higher returns accelerate growth
3. **Frequency**: Monthly compounding vs annual
4. **Consistency**: Regular investments boost compounding

## Interactive Simulation
Try this mental exercise:
- Would you rather have ₹1 crore today OR
- ₹1 doubled every day for 30 days?

Answer: The doubling penny reaches ₹53+ crores in 30 days!

## Common Compounding Mistakes
❌ Waiting for the "right time" to start
❌ Stopping investments during market downturns
❌ Frequently switching investments
❌ Taking profits too early

✅ Start immediately, even with small amounts
✅ Stay invested through market cycles
✅ Increase investments with income growth
✅ Let time work its magic

## Key Takeaways
• Time is more powerful than timing in investing
• Starting early beats investing larger amounts later
• Consistency in investing multiplies compounding benefits
• Patience and discipline are your greatest assets

## Action Steps
1. Calculate your financial goals using compound interest calculators
2. Start a SIP immediately, even if it's just ₹500/month
3. Set up automatic investments to ensure consistency
4. Increase your investment amount annually by 10-15%
        `,
        type: "INTERACTIVE",
        completed: false,
      },
    ],
    quiz: {
      id: "investing-basics-quiz",
      passed: false,
      score: 0,
      attempts: 0,
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
        },
        {
          id: "q2",
          question:
            "In the context of stocks, what does owning shares represent?",
          options: [
            "Lending money to a company",
            "Ownership stake in a company",
            "A guaranteed dividend payment",
            "Insurance against company losses",
          ],
          correctAnswer: 1,
          explanation:
            "When you buy stocks, you purchase ownership shares in a company, making you a partial owner (shareholder) with claims on the company's assets and earnings.",
        },
        {
          id: "q3",
          question:
            "What is the general relationship between risk and return in investing?",
          options: [
            "Higher risk always guarantees higher returns",
            "Risk and return are unrelated",
            "Higher potential returns typically come with higher risk",
            "Lower risk investments always provide better returns",
          ],
          correctAnswer: 2,
          explanation:
            "There is a positive correlation between risk and potential return - investments with higher potential returns generally carry higher risk, though returns are never guaranteed.",
        },
        {
          id: "q4",
          question:
            "Rajesh invests ₹10,000 at 10% annual return. After 2 years with compounding, his investment value will be:",
          options: ["₹11,000", "₹12,000", "₹12,100", "₹13,000"],
          correctAnswer: 2,
          explanation:
            "With compound interest: Year 1: ₹10,000 × 1.10 = ₹11,000. Year 2: ₹11,000 × 1.10 = ₹12,100. The extra ₹100 comes from earning returns on previous years' returns.",
        },
        {
          id: "q5",
          question:
            "Which factor is MOST important for maximizing the power of compounding?",
          options: [
            "Starting with a large initial investment",
            "Choosing the highest-risk investments",
            "Starting early and staying consistent",
            "Timing the market perfectly",
          ],
          correctAnswer: 2,
          explanation:
            "Time is the most powerful factor in compounding. Starting early and maintaining consistency allows more time for growth to compound, often outweighing the benefits of larger initial investments or perfect timing.",
        },
        {
          id: "q6",
          question:
            "A company's stock price is influenced by all of the following EXCEPT:",
          options: [
            "Company financial performance",
            "Overall market sentiment",
            "The color of the company logo",
            "Economic conditions",
          ],
          correctAnswer: 2,
          explanation:
            "Stock prices are influenced by fundamental factors like company performance, market sentiment, and economic conditions. Superficial factors like logo color have no impact on stock valuations.",
        },
        {
          id: "q7",
          question:
            "If inflation is 6% and your investment returns 8%, your real return is:",
          options: ["14%", "8%", "6%", "2%"],
          correctAnswer: 3,
          explanation:
            "Real return = Nominal return - Inflation rate. So 8% - 6% = 2%. This represents the actual purchasing power increase of your investment.",
        },
        {
          id: "q8",
          question:
            "Which investment typically offers the highest potential returns but also the highest risk?",
          options: [
            "Fixed Deposits",
            "Government bonds",
            "Blue-chip stocks",
            "Small-cap stocks",
          ],
          correctAnswer: 3,
          explanation:
            "Small-cap stocks typically offer the highest potential returns but also carry the highest risk due to their volatility, limited track record, and sensitivity to market conditions.",
        },
      ],
    },
  },
];

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-lesson",
    title: "Knowledge Seeker",
    description: "Complete your first lesson",
    icon: "📚",
    reward: 100,
    unlocked: false,
    category: "Learning",
    progress: 0,
    target: 1,
  },
  {
    id: "first-quiz",
    title: "Quiz Master",
    description: "Pass your first quiz",
    icon: "🎯",
    reward: 200,
    unlocked: false,
    category: "Learning",
    progress: 0,
    target: 1,
  },
  {
    id: "five-modules",
    title: "Dedicated Learner",
    description: "Complete 5 learning modules",
    icon: "🌟",
    reward: 500,
    unlocked: false,
    category: "Learning",
    progress: 0,
    target: 5,
  },
  {
    id: "perfect-score",
    title: "Perfect Scholar",
    description: "Score 100% on any quiz",
    icon: "💯",
    reward: 300,
    unlocked: false,
    category: "Achievement",
    progress: 0,
    target: 1,
  },
];

export function useLearning() {
  const [modules, setModules] = useState<LearningModule[]>(LEARNING_MODULES);
  const [progress, setProgress] = useState<LearningProgress>({
    totalCoinsEarned: 0,
    modulesCompleted: 0,
    quizzesPassed: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalTimeSpent: 0,
    achievements: ACHIEVEMENTS,
    level: 1,
    experiencePoints: 0,
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
          const newProgress = (completedLessons / updatedLessons.length) * 50; // 50% for lessons, 50% for quiz

          return {
            ...module,
            lessons: updatedLessons,
            progress: newProgress,
          };
        }
        return module;
      }),
    );

    // Check for achievements
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
            const passed = score >= 70; // 70% passing grade

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

              // Unlock next module
              const moduleIndex = prev.findIndex((m) => m.id === moduleId);
              if (moduleIndex < prev.length - 1) {
                prev[moduleIndex + 1].unlocked = true;
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
          experiencePoints: prev.experiencePoints + 100,
        }));

        // Check for achievements
        checkAchievements("quiz_passed", result.score);
      }

      return result;
    },
    [],
  );

  const checkAchievements = useCallback((event: string, data?: any) => {
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
          case "five-modules":
            if (event === "quiz_passed") {
              newProgress = Math.min(prev.modulesCompleted + 1, 5);
              shouldUnlock = newProgress >= 5;
            }
            break;
          case "perfect-score":
            if (event === "quiz_passed" && data === 100) {
              newProgress = 1;
              shouldUnlock = true;
            }
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
  }, []);

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
  };
}
