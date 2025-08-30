import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen,
  Award,
  Target,
  Play,
  CheckCircle,
  Lock,
  Star,
  Trophy,
  Coins,
  TrendingUp,
  Clock,
  Brain,
  Zap,
  Flame,
  Crown,
  GraduationCap,
  BarChart3,
  Shield,
  Lightbulb,
  Rocket,
  Medal,
  ChevronRight,
  Timer,
  Users,
  Map,
  BookmarkPlus,
} from "lucide-react";
import { useEnhancedLearning } from "@/hooks/use-learning-enhanced";

export default function EnhancedLearn() {
  const {
    modules,
    progress,
    completeLesson,
    submitQuiz,
    getAvailableModules,
    getModuleById,
    getUnlockedAchievements,
    getRecommendedNextModule,
  } = useEnhancedLearning();

  const { toast } = useToast();

  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const availableModules = getAvailableModules();
  const recommendedModule = getRecommendedNextModule();

  const handleLessonComplete = (moduleId: string, lessonId: string) => {
    completeLesson(moduleId, lessonId);

    // Enhanced completion feedback
    const lesson = selectedModule?.lessons.find((l: any) => l.id === lessonId);
    toast({
      title: "🎉 Lesson Completed!",
      description: `Great job completing "${lesson?.title}"! +50 XP earned.`,
    });
  };

  const handleQuizSubmit = () => {
    if (
      !selectedModule ||
      quizAnswers.length !== selectedModule.quiz.questions.length
    ) {
      toast({
        title: "Incomplete Quiz",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }

    const result = submitQuiz(selectedModule.id, quizAnswers);
    setQuizResult(result);

    if (result.passed) {
      const coinsEarned = selectedModule.reward;
      toast({
        title: "🌟 Quiz Mastered!",
        description: `Outstanding! You scored ${result.score}% and earned ${coinsEarned} coins + 200 XP. Next module unlocked!`,
      });
    } else {
      toast({
        title: "Almost There!",
        description: `You scored ${result.score}%. You need ${selectedModule.quiz.minPassingScore}% to pass. Review the lessons and try again!`,
        variant: "destructive",
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "BEGINNER":
        return "text-green-600 bg-green-100 dark:bg-green-900/20 border-green-200";
      case "INTERMEDIATE":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200";
      case "ADVANCED":
        return "text-red-600 bg-red-100 dark:bg-red-900/20 border-red-200";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20 border-gray-200";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "FOUNDATIONAL":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20";
      case "INTERMEDIATE":
        return "text-purple-600 bg-purple-100 dark:bg-purple-900/20";
      case "ADVANCED":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "BASICS":
        return <BookOpen className="h-4 w-4" />;
      case "ANALYSIS":
        return <BarChart3 className="h-4 w-4" />;
      case "STRATEGY":
        return <Target className="h-4 w-4" />;
      case "RISK":
        return <Shield className="h-4 w-4" />;
      case "INDIAN_MARKETS":
        return <TrendingUp className="h-4 w-4" />;
      case "ADVANCED":
        return <Brain className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getAchievementTierIcon = (tier: number) => {
    switch (tier) {
      case 1:
        return <Medal className="h-5 w-5 text-bronze" />;
      case 2:
        return <Award className="h-5 w-5 text-silver" />;
      case 3:
        return <Trophy className="h-5 w-5 text-gold" />;
      case 4:
        return <Crown className="h-5 w-5 text-purple-500" />;
      case 5:
        return <Crown className="h-5 w-5 text-gradient" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Enhanced Header with Learning Path */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
              <GraduationCap className="h-10 w-10 text-primary" />
              Investment Mastery Hub
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Your comprehensive journey from beginner to investment expert
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="bg-warning/10 text-warning border-warning/20 flex items-center gap-1 px-3 py-1"
            >
              <Coins className="h-4 w-4" />
              {progress.totalCoinsEarned.toLocaleString()} coins
            </Badge>
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1 px-3 py-1"
            >
              <Star className="h-4 w-4" />
              Level {progress.level}
            </Badge>
            <Badge
              variant="outline"
              className="bg-orange-100 text-orange-600 border-orange-200 flex items-center gap-1 px-3 py-1"
            >
              <Flame className="h-4 w-4" />
              {progress.currentStreak} day streak
            </Badge>
          </div>
        </div>

        {/* Learning Path Visualization */}
        {recommendedModule && (
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Map className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Recommended Next Step</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(recommendedModule.category)}
                  <div>
                    <h4 className="font-semibold">{recommendedModule.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {recommendedModule.description}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedModule(recommendedModule)}
                  className="flex items-center gap-2"
                >
                  Continue Learning
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Enhanced Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Modules Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {progress.modulesCompleted}
            </div>
            <p className="text-xs text-muted-foreground">
              of {modules.length} total modules
            </p>
            <Progress
              value={(progress.modulesCompleted / modules.length) * 100}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Quizzes Mastered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {progress.quizzesPassed}
            </div>
            <p className="text-xs text-muted-foreground">
              {progress.quizzesPassed > 0
                ? `${((progress.quizzesPassed / modules.length) * 100).toFixed(0)}% completion rate`
                : "Start your first quiz!"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Experience Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {progress.experiencePoints.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Next level: {500 - (progress.experiencePoints % 500)} XP
            </p>
            <Progress
              value={(progress.experiencePoints % 500) / 5}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Award className="h-4 w-4" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {getUnlockedAchievements().length}
            </div>
            <p className="text-xs text-muted-foreground">
              of {progress.achievements.length} total badges
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="modules" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Learning Modules
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Learning Path Progress */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Your Learning Journey
                </CardTitle>
                <CardDescription>
                  Track your progress through the comprehensive investment
                  curriculum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["FOUNDATIONAL", "INTERMEDIATE", "ADVANCED"].map(
                    (tier, index) => {
                      const tierModules = modules.filter(
                        (m) => m.tier === tier,
                      );
                      const completedInTier = tierModules.filter(
                        (m) => m.completed,
                      ).length;
                      const progressPercent =
                        tierModules.length > 0
                          ? (completedInTier / tierModules.length) * 100
                          : 0;

                      return (
                        <div key={tier} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge className={getTierColor(tier)}>
                                {tier}
                              </Badge>
                              <span className="font-medium">
                                {completedInTier}/{tierModules.length} Modules
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {progressPercent.toFixed(0)}%
                            </span>
                          </div>
                          <Progress value={progressPercent} className="h-3" />
                        </div>
                      );
                    },
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Recent Wins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getUnlockedAchievements()
                    .sort((a, b) => (b.unlockedAt || 0) - (a.unlockedAt || 0))
                    .slice(0, 3)
                    .map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg"
                      >
                        <div className="text-2xl">
                          {achievement.displayBadge}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">
                            {achievement.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                        {getAchievementTierIcon(achievement.tier)}
                      </div>
                    ))}
                  {getUnlockedAchievements().length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                      <Trophy className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">
                        Complete lessons to unlock achievements!
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Enhanced Learning Modules */}
        <TabsContent value="modules">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Card
                key={module.id}
                className={`relative transition-all hover:shadow-lg ${
                  !module.unlocked ? "opacity-60" : ""
                } ${module.completed ? "ring-2 ring-green-200 bg-green-50/50 dark:bg-green-950/20" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(module.category)}
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {module.title}
                          {!module.unlocked && (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                          {module.completed && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            className={getDifficultyColor(module.difficulty)}
                            variant="outline"
                          >
                            {module.difficulty}
                          </Badge>
                          <Badge
                            className={getTierColor(module.tier)}
                            variant="outline"
                          >
                            {module.tier}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-2">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatDuration(module.duration)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Coins className="h-3 w-3" />
                          <span>{module.reward.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          <span>{module.lessons.length} lessons</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round(module.progress)}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>

                    {/* Prerequisites Display */}
                    {module.prerequisites &&
                      module.prerequisites.length > 0 &&
                      !module.unlocked && (
                        <div className="text-xs text-muted-foreground">
                          <p className="font-medium">Prerequisites:</p>
                          <ul className="list-disc list-inside">
                            {module.prerequisites.map((prereq) => {
                              const prereqModule = modules.find(
                                (m) => m.id === prereq,
                              );
                              return (
                                <li key={prereq}>{prereqModule?.title}</li>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                    {module.unlocked ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full"
                            onClick={() => setSelectedModule(module)}
                            variant={module.completed ? "outline" : "default"}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            {module.completed
                              ? "Review Module"
                              : module.progress > 0
                                ? "Continue Learning"
                                : "Start Module"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[900px] max-h-[85vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              {getCategoryIcon(module.category)}
                              {module.title}
                            </DialogTitle>
                            <DialogDescription>
                              {module.description}
                            </DialogDescription>
                          </DialogHeader>

                          {selectedModule && (
                            <div className="space-y-6">
                              {/* Enhanced Lessons Display */}
                              <div className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                  <BookOpen className="h-5 w-5" />
                                  Lessons (
                                  {
                                    selectedModule.lessons.filter(
                                      (l: any) => l.completed,
                                    ).length
                                  }
                                  /{selectedModule.lessons.length})
                                </h3>
                                {selectedModule.lessons.map(
                                  (lesson: any, index: number) => (
                                    <Card
                                      key={lesson.id}
                                      className={`p-4 ${lesson.completed ? "bg-green-50 dark:bg-green-950/20 border-green-200" : ""}`}
                                    >
                                      <div className="space-y-3">
                                        <div className="flex items-start justify-between">
                                          <div className="flex-1">
                                            <h4 className="font-medium flex items-center gap-2">
                                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                                                {index + 1}
                                              </span>
                                              {lesson.title}
                                              {lesson.completed && (
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                              )}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1">
                                              <Badge
                                                variant="outline"
                                                className="text-xs"
                                              >
                                                {lesson.type}
                                              </Badge>
                                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Timer className="h-3 w-3" />
                                                {lesson.duration}m
                                              </span>
                                            </div>

                                            {/* Show expandable content preview */}
                                            <div className="mt-3">
                                              <div className="prose prose-sm max-w-none text-sm text-muted-foreground line-clamp-3">
                                                {lesson.content.substring(
                                                  0,
                                                  200,
                                                )}
                                                ...
                                              </div>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="mt-2 p-0 h-auto text-primary"
                                                onClick={() =>
                                                  setSelectedLesson(
                                                    selectedLesson?.id ===
                                                      lesson.id
                                                      ? null
                                                      : lesson,
                                                  )
                                                }
                                              >
                                                {selectedLesson?.id ===
                                                lesson.id
                                                  ? "Show Less"
                                                  : "Read Full Lesson"}
                                              </Button>
                                            </div>

                                            {/* Expanded lesson content */}
                                            {selectedLesson?.id ===
                                              lesson.id && (
                                              <div className="mt-4 p-4 bg-accent/30 rounded-lg">
                                                <div className="prose prose-sm max-w-none">
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html: lesson.content
                                                        .replace(/\n/g, "<br/>")
                                                        .replace(/##/g, "<h3>")
                                                        .replace(/#/g, "<h2>"),
                                                    }}
                                                  />
                                                </div>

                                                {/* Key Takeaways */}
                                                {lesson.keyTakeaways && (
                                                  <div className="mt-4">
                                                    <h5 className="font-semibold text-sm flex items-center gap-2 mb-2">
                                                      <Lightbulb className="h-4 w-4" />
                                                      Key Takeaways
                                                    </h5>
                                                    <ul className="space-y-1">
                                                      {lesson.keyTakeaways.map(
                                                        (
                                                          takeaway: string,
                                                          idx: number,
                                                        ) => (
                                                          <li
                                                            key={idx}
                                                            className="text-sm flex items-start gap-2"
                                                          >
                                                            <span className="text-primary">
                                                              •
                                                            </span>
                                                            {takeaway}
                                                          </li>
                                                        ),
                                                      )}
                                                    </ul>
                                                  </div>
                                                )}

                                                {/* Action Items */}
                                                {lesson.actionItems && (
                                                  <div className="mt-4">
                                                    <h5 className="font-semibold text-sm flex items-center gap-2 mb-2">
                                                      <Target className="h-4 w-4" />
                                                      Action Items
                                                    </h5>
                                                    <ul className="space-y-1">
                                                      {lesson.actionItems.map(
                                                        (
                                                          action: string,
                                                          idx: number,
                                                        ) => (
                                                          <li
                                                            key={idx}
                                                            className="text-sm flex items-start gap-2"
                                                          >
                                                            <span className="text-green-600">
                                                              ✓
                                                            </span>
                                                            {action}
                                                          </li>
                                                        ),
                                                      )}
                                                    </ul>
                                                  </div>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                          {!lesson.completed && (
                                            <Button
                                              size="sm"
                                              onClick={() =>
                                                handleLessonComplete(
                                                  selectedModule.id,
                                                  lesson.id,
                                                )
                                              }
                                              className="ml-4"
                                            >
                                              <CheckCircle className="h-4 w-4 mr-1" />
                                              Complete
                                            </Button>
                                          )}
                                        </div>
                                      </div>
                                    </Card>
                                  ),
                                )}
                              </div>

                              {/* Enhanced Quiz Section */}
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Brain className="h-5 w-5" />
                                    Knowledge Assessment
                                  </h3>
                                  {selectedModule.quiz.passed && (
                                    <Badge
                                      variant="default"
                                      className="bg-green-600"
                                    >
                                      ✓ Passed ({selectedModule.quiz.score}%)
                                    </Badge>
                                  )}
                                </div>

                                {!showQuiz ? (
                                  <Card className="p-6">
                                    <div className="text-center space-y-4">
                                      <Trophy className="h-16 w-16 mx-auto text-primary" />
                                      <div>
                                        <h4 className="font-semibold text-lg">
                                          Ready to Test Your Knowledge?
                                        </h4>
                                        <p className="text-muted-foreground">
                                          Challenge yourself with{" "}
                                          {selectedModule.quiz.questions.length}{" "}
                                          carefully crafted questions.
                                        </p>
                                        <div className="flex items-center justify-center gap-4 mt-3 text-sm text-muted-foreground">
                                          <span className="flex items-center gap-1">
                                            <Target className="h-4 w-4" />
                                            {
                                              selectedModule.quiz
                                                .minPassingScore
                                            }
                                            % to pass
                                          </span>
                                          <span className="flex items-center gap-1">
                                            <Coins className="h-4 w-4" />
                                            {selectedModule.reward} coins reward
                                          </span>
                                          <span className="flex items-center gap-1">
                                            <Zap className="h-4 w-4" />
                                            200 XP bonus
                                          </span>
                                        </div>
                                      </div>
                                      <Button
                                        onClick={() => {
                                          setShowQuiz(true);
                                          setQuizAnswers([]);
                                          setQuizResult(null);
                                        }}
                                        disabled={selectedModule.lessons.some(
                                          (l: any) => !l.completed,
                                        )}
                                        size="lg"
                                        className="px-8"
                                      >
                                        <Zap className="h-4 w-4 mr-2" />
                                        Start Assessment
                                      </Button>
                                      {selectedModule.lessons.some(
                                        (l: any) => !l.completed,
                                      ) && (
                                        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                                          <Lock className="h-3 w-3" />
                                          Complete all lessons first
                                        </p>
                                      )}
                                    </div>
                                  </Card>
                                ) : (
                                  <Card className="p-6">
                                    <div className="space-y-6">
                                      {selectedModule.quiz.questions.map(
                                        (question: any, qIndex: number) => (
                                          <div
                                            key={question.id}
                                            className="space-y-4 p-4 border rounded-lg"
                                          >
                                            <div className="flex items-start gap-3">
                                              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                                                {qIndex + 1}
                                              </span>
                                              <div className="flex-1">
                                                <h4 className="font-medium text-lg mb-2">
                                                  {question.question}
                                                </h4>

                                                {/* Show scenario if available */}
                                                {question.scenario && (
                                                  <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded border-l-4 border-l-blue-500">
                                                    <p className="text-sm">
                                                      <strong>Scenario:</strong>{" "}
                                                      {question.scenario}
                                                    </p>
                                                  </div>
                                                )}

                                                <div className="flex items-center gap-2 mb-3">
                                                  <Badge
                                                    variant="outline"
                                                    className={
                                                      question.difficulty ===
                                                      "EASY"
                                                        ? "border-green-300 text-green-700"
                                                        : question.difficulty ===
                                                            "MEDIUM"
                                                          ? "border-yellow-300 text-yellow-700"
                                                          : "border-red-300 text-red-700"
                                                    }
                                                  >
                                                    {question.difficulty}
                                                  </Badge>
                                                  <Badge variant="outline">
                                                    {question.type}
                                                  </Badge>
                                                </div>

                                                <RadioGroup
                                                  value={quizAnswers[
                                                    qIndex
                                                  ]?.toString()}
                                                  onValueChange={(value) => {
                                                    const newAnswers = [
                                                      ...quizAnswers,
                                                    ];
                                                    newAnswers[qIndex] =
                                                      parseInt(value);
                                                    setQuizAnswers(newAnswers);
                                                  }}
                                                  className="space-y-2"
                                                >
                                                  {question.options.map(
                                                    (
                                                      option: string,
                                                      oIndex: number,
                                                    ) => (
                                                      <div
                                                        key={oIndex}
                                                        className="flex items-center space-x-3 p-2 rounded hover:bg-accent/50"
                                                      >
                                                        <RadioGroupItem
                                                          value={oIndex.toString()}
                                                          id={`q${qIndex}-o${oIndex}`}
                                                        />
                                                        <Label
                                                          htmlFor={`q${qIndex}-o${oIndex}`}
                                                          className="text-sm flex-1 cursor-pointer"
                                                        >
                                                          <span className="font-medium mr-2">
                                                            {String.fromCharCode(
                                                              65 + oIndex,
                                                            )}
                                                            .
                                                          </span>
                                                          {option}
                                                        </Label>
                                                      </div>
                                                    ),
                                                  )}
                                                </RadioGroup>

                                                {quizResult && (
                                                  <div
                                                    className={`mt-4 p-4 rounded-lg border-l-4 ${
                                                      quizAnswers[qIndex] ===
                                                      question.correctAnswer
                                                        ? "bg-green-50 dark:bg-green-950/20 border-l-green-500"
                                                        : "bg-red-50 dark:bg-red-950/20 border-l-red-500"
                                                    }`}
                                                  >
                                                    <div className="flex items-center gap-2 mb-2">
                                                      {quizAnswers[qIndex] ===
                                                      question.correctAnswer ? (
                                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                                      ) : (
                                                        <span className="h-5 w-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">
                                                          ✗
                                                        </span>
                                                      )}
                                                      <span className="font-semibold">
                                                        {quizAnswers[qIndex] ===
                                                        question.correctAnswer
                                                          ? "Correct!"
                                                          : "Incorrect"}
                                                      </span>
                                                      {quizAnswers[qIndex] !==
                                                        question.correctAnswer && (
                                                        <span className="text-sm text-muted-foreground">
                                                          (Correct answer:{" "}
                                                          {String.fromCharCode(
                                                            65 +
                                                              question.correctAnswer,
                                                          )}
                                                          )
                                                        </span>
                                                      )}
                                                    </div>
                                                    <p className="text-sm">
                                                      {question.explanation}
                                                    </p>
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        ),
                                      )}

                                      {!quizResult ? (
                                        <div className="flex justify-center pt-4">
                                          <Button
                                            onClick={handleQuizSubmit}
                                            size="lg"
                                            disabled={
                                              quizAnswers.length !==
                                              selectedModule.quiz.questions
                                                .length
                                            }
                                            className="px-8"
                                          >
                                            <Brain className="h-4 w-4 mr-2" />
                                            Submit Assessment
                                          </Button>
                                        </div>
                                      ) : (
                                        <div className="text-center space-y-4 pt-4">
                                          <div
                                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold ${
                                              quizResult.passed
                                                ? "bg-green-100 text-green-800 border border-green-200"
                                                : "bg-red-100 text-red-800 border border-red-200"
                                            }`}
                                          >
                                            {quizResult.passed ? (
                                              <Trophy className="h-6 w-6" />
                                            ) : (
                                              <Target className="h-6 w-6" />
                                            )}
                                            {quizResult.passed
                                              ? "Assessment Passed!"
                                              : "Keep Learning!"}{" "}
                                            - {quizResult.score}%
                                          </div>
                                          <div className="flex justify-center gap-3">
                                            <Button
                                              onClick={() => {
                                                setShowQuiz(false);
                                                setQuizResult(null);
                                                setQuizAnswers([]);
                                              }}
                                              variant="outline"
                                            >
                                              {quizResult.passed
                                                ? "Continue Learning"
                                                : "Review & Retry"}
                                            </Button>
                                            {quizResult.passed && (
                                              <Button
                                                onClick={() =>
                                                  setSelectedModule(null)
                                                }
                                              >
                                                <BookmarkPlus className="h-4 w-4 mr-2" />
                                                Next Module
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </Card>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button disabled className="w-full">
                        <Lock className="h-4 w-4 mr-2" />
                        Complete Prerequisites
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Enhanced Achievements */}
        <TabsContent value="achievements">
          <div className="space-y-6">
            {/* Achievement Categories */}
            {["BEGINNER", "INTERMEDIATE", "ADVANCED", "MASTERY", "SPECIAL"].map(
              (category) => {
                const categoryAchievements = progress.achievements.filter(
                  (a) => a.category === category,
                );
                const unlockedInCategory = categoryAchievements.filter(
                  (a) => a.unlocked,
                ).length;

                return (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          {getAchievementTierIcon(
                            categoryAchievements[0]?.tier || 1,
                          )}
                          {category} Achievements
                        </span>
                        <Badge variant="outline">
                          {unlockedInCategory}/{categoryAchievements.length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryAchievements.map((achievement) => (
                          <Card
                            key={achievement.id}
                            className={`p-4 transition-all ${
                              achievement.unlocked
                                ? "bg-gradient-to-br from-accent/50 to-accent/30 border-primary/20 shadow-md"
                                : "opacity-60 grayscale"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="text-3xl">
                                {achievement.displayBadge}
                              </div>
                              <div className="flex-1 space-y-2">
                                <div>
                                  <h4 className="font-semibold flex items-center gap-2">
                                    {achievement.title}
                                    {achievement.unlocked && (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    )}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {achievement.description}
                                  </p>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span>Progress</span>
                                    <span>
                                      {achievement.progress}/
                                      {achievement.target}
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      (achievement.progress /
                                        achievement.target) *
                                      100
                                    }
                                    className="h-2"
                                  />
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-xs">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {achievement.milestoneType}
                                    </Badge>
                                    {getAchievementTierIcon(achievement.tier)}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    +{achievement.reward.coins} coins, +
                                    {achievement.reward.xp} XP
                                  </div>
                                </div>

                                {achievement.unlocked &&
                                  achievement.unlockedAt && (
                                    <p className="text-xs text-muted-foreground">
                                      Unlocked:{" "}
                                      {new Date(
                                        achievement.unlockedAt,
                                      ).toLocaleDateString()}
                                    </p>
                                  )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              },
            )}
          </div>
        </TabsContent>

        {/* Enhanced Analytics */}
        <TabsContent value="progress">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Learning Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">
                        {progress.level}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Current Level
                      </p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">
                        {progress.experiencePoints.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">Total XP</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">
                        {progress.totalCoinsEarned.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Coins Earned
                      </p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-orange-600">
                        {Math.round(
                          (progress.modulesCompleted / modules.length) * 100,
                        )}
                        %
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Completion
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Category Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(progress.moduleCompletionsByCategory).map(
                      ([category, completed]) => {
                        const totalInCategory = modules.filter(
                          (m) => m.category === category,
                        ).length;
                        const progressPercent =
                          totalInCategory > 0
                            ? (completed / totalInCategory) * 100
                            : 0;

                        return (
                          <div key={category} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {getCategoryIcon(category)}
                                <span className="font-medium">{category}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {completed}/{totalInCategory}
                              </span>
                            </div>
                            <Progress value={progressPercent} className="h-2" />
                          </div>
                        );
                      },
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Learning Streak & Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-2">
                    <Flame className="h-12 w-12 mx-auto text-orange-500" />
                    <div className="text-2xl font-bold">
                      {progress.currentStreak}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Current Streak
                    </p>
                  </div>
                  <div className="text-center space-y-2">
                    <Trophy className="h-12 w-12 mx-auto text-gold" />
                    <div className="text-2xl font-bold">
                      {progress.longestStreak}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Longest Streak
                    </p>
                  </div>
                  <div className="text-center space-y-2">
                    <Users className="h-12 w-12 mx-auto text-blue-500" />
                    <div className="text-2xl font-bold">
                      {formatDuration(progress.totalTimeSpent)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Time Invested
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
