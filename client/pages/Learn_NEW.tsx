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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  GraduationCap,
  BarChart3,
  Shield,
  Lightbulb,
  Timer,
  ChevronRight,
} from "lucide-react";
import { useEnhancedLearning } from "@/hooks/use-learning-enhanced";

function LessonContent({
  lesson,
  onComplete,
}: {
  lesson: any;
  onComplete: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Lesson Content with prose styling */}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html: lesson.content.replace(/\n/g, "<br/>"),
          }}
        />
      </div>

      {/* Key Takeaways Section */}
      {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-lg border-l-4 border-l-blue-500">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                🎯 Key Takeaways
              </h4>
              <ul className="space-y-2">
                {lesson.keyTakeaways.map((takeaway: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-blue-800 dark:text-blue-200"
                  >
                    <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Action Items Section */}
      {lesson.actionItems && lesson.actionItems.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-6 rounded-lg border-l-4 border-l-amber-500">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500 rounded-lg">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3">
                🎯 Action Items
              </h4>
              <ul className="space-y-2">
                {lesson.actionItems.map((item: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-amber-800 dark:text-amber-200"
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Complete Lesson Button */}
      {!lesson.completed && (
        <div className="flex justify-center pt-4">
          <Button
            onClick={onComplete}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Mark as Complete
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default function Learn() {
  const {
    modules,
    progress,
    completeLesson,
    submitQuiz,
    getUnlockedAchievements,
    getRecommendedNextModule,
  } = useEnhancedLearning();

  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<any>(null);
  const { toast } = useToast();

  const handleLessonComplete = (moduleId: string, lessonId: string) => {
    completeLesson(moduleId, lessonId);
    toast({
      title: "🎉 Lesson Completed!",
      description: "Great progress! Keep learning to unlock more rewards.",
    });
  };

  const handleQuizSubmit = () => {
    if (!selectedModule) return;

    const result = submitQuiz(selectedModule.id, quizAnswers);
    setQuizResult(result);

    if (result.passed) {
      toast({
        title: "🏆 Quiz Passed!",
        description: `Congratulations! You scored ${result.score}% and earned ${selectedModule.reward} coins!`,
      });
    } else {
      toast({
        title: "📚 Keep Learning!",
        description: `You scored ${result.score}%. Review the lessons and try again!`,
        variant: "destructive",
      });
    }
  };

  const recommendedModule = getRecommendedNextModule();

  const moduleConfig = {
    BASICS: {
      icon: GraduationCap,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
    INDIAN_MARKETS: {
      icon: BarChart3,
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    ANALYSIS: {
      icon: Brain,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
    },
    STRATEGY: {
      icon: Target,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
    },
    RISK: {
      icon: Shield,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-950/20",
    },
    ADVANCED: {
      icon: Zap,
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    },
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          🎓 Investment Learning Hub
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Master investing through our comprehensive 5-module curriculum
          designed for Indian markets
        </p>
      </div>

      {/* Recommended Module */}
      {recommendedModule && (
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  📚 Recommended Next
                </Badge>
                <h3 className="text-xl font-semibold">
                  {recommendedModule.title}
                </h3>
                <p className="text-muted-foreground">
                  {recommendedModule.description}
                </p>
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

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Modules Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {progress.modulesCompleted}
            </div>
            <p className="text-xs text-muted-foreground">
              of {modules.length} total
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
              Quizzes Passed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {progress.quizzesPassed}
            </div>
            <p className="text-xs text-muted-foreground">70%+ passing grade</p>
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
            <div className="text-2xl font-bold text-purple-600">
              {progress.experiencePoints.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Level {progress.level}
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
            <div className="text-2xl font-bold text-orange-600">
              {getUnlockedAchievements().length}
            </div>
            <p className="text-xs text-muted-foreground">badges earned</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="modules">📚 Learning Modules</TabsTrigger>
          <TabsTrigger value="achievements">🏆 Achievements</TabsTrigger>
          <TabsTrigger value="progress">📊 Progress</TabsTrigger>
        </TabsList>

        {/* Learning Modules */}
        <TabsContent value="modules">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const config =
                moduleConfig[module.category] || moduleConfig["BASICS"];
              const IconComponent = config.icon;

              return (
                <Card
                  key={module.id}
                  className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg ${
                    module.completed
                      ? "border-green-500/30 bg-green-50/50 dark:bg-green-950/10"
                      : module.unlocked
                        ? "border-primary/20 hover:border-primary/40"
                        : "border-muted bg-muted/20"
                  }`}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${config.color} opacity-10 rounded-full -translate-y-16 translate-x-16`}
                  />

                  <CardHeader className="relative">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-br ${config.color} text-white shadow-lg relative`}
                        >
                          <IconComponent className="h-6 w-6" />
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-slate-800 text-white text-xs rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            {module.title}
                            {module.completed && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {module.description}
                          </CardDescription>
                        </div>
                      </div>
                    </div>

                    {/* Module Stats */}
                    <div className="flex items-center gap-4 mt-4">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-3 w-3" />
                        {module.duration}m
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Coins className="h-3 w-3" />
                        {module.reward}
                      </Badge>
                      <Badge
                        variant={
                          module.difficulty === "BEGINNER"
                            ? "default"
                            : module.difficulty === "INTERMEDIATE"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {module.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">
                          {Math.round(module.progress)}%
                        </span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>

                    {/* Lessons Summary */}
                    <div className="text-sm text-muted-foreground">
                      {module.lessons.filter((l) => l.completed).length} of{" "}
                      {module.lessons.length} lessons completed
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      {module.unlocked ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="w-full"
                              variant={module.completed ? "outline" : "default"}
                              onClick={() => {
                                setSelectedModule(module);
                                setShowQuiz(false);
                                setQuizResult(null);
                                setQuizAnswers([]);
                              }}
                            >
                              {module.completed ? (
                                <>
                                  <Trophy className="h-4 w-4 mr-2" />
                                  Review Module
                                </>
                              ) : (
                                <>
                                  <Play className="h-4 w-4 mr-2" />
                                  Start Learning
                                </>
                              )}
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-lg bg-gradient-to-br ${config.color} text-white`}
                                >
                                  <IconComponent className="h-5 w-5" />
                                </div>
                                {selectedModule?.title}
                              </DialogTitle>
                              <DialogDescription>
                                {selectedModule?.description}
                              </DialogDescription>
                            </DialogHeader>

                            {selectedModule && (
                              <div className="space-y-6">
                                {!showQuiz ? (
                                  <>
                                    {/* Lessons Section */}
                                    <div className="space-y-4">
                                      <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <BookOpen className="h-5 w-5" />
                                        Lessons ({selectedModule.lessons.length}
                                        )
                                      </h3>

                                      <Accordion
                                        type="single"
                                        collapsible
                                        className="w-full"
                                      >
                                        {selectedModule.lessons.map(
                                          (lesson: any) => (
                                            <AccordionItem
                                              key={lesson.id}
                                              value={lesson.id}
                                            >
                                              <AccordionTrigger className="text-left hover:no-underline">
                                                <div className="flex items-center gap-3 flex-1">
                                                  <div className="flex items-center gap-2">
                                                    {lesson.completed && (
                                                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                    )}
                                                    <div className="text-left">
                                                      <div className="font-medium">
                                                        {lesson.title}
                                                      </div>
                                                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                                                        <Clock className="h-3 w-3" />
                                                        {lesson.duration}{" "}
                                                        minutes
                                                        <Badge
                                                          variant="outline"
                                                          className="text-xs ml-2"
                                                        >
                                                          {lesson.type}
                                                        </Badge>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </AccordionTrigger>
                                              <AccordionContent>
                                                <LessonContent
                                                  lesson={lesson}
                                                  onComplete={() =>
                                                    handleLessonComplete(
                                                      selectedModule.id,
                                                      lesson.id,
                                                    )
                                                  }
                                                />
                                              </AccordionContent>
                                            </AccordionItem>
                                          ),
                                        )}
                                      </Accordion>
                                    </div>

                                    {/* Quiz Section */}
                                    <div className="space-y-4">
                                      <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <Target className="h-5 w-5" />
                                        Knowledge Assessment
                                      </h3>

                                      <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                                        <div className="space-y-4">
                                          <div className="flex items-center justify-between">
                                            <div>
                                              <h4 className="font-semibold">
                                                Ready for the quiz?
                                              </h4>
                                              <p className="text-sm text-muted-foreground">
                                                {
                                                  selectedModule.quiz.questions
                                                    .length
                                                }{" "}
                                                questions •{" "}
                                                {
                                                  selectedModule.quiz
                                                    .minPassingScore
                                                }
                                                % to pass
                                              </p>
                                            </div>
                                            <div className="text-right">
                                              <div className="text-lg font-bold text-primary">
                                                +{selectedModule.reward}
                                              </div>
                                              <div className="text-xs text-muted-foreground">
                                                coins reward
                                              </div>
                                            </div>
                                          </div>

                                          <Button
                                            onClick={() => {
                                              const allLessonsCompleted =
                                                selectedModule.lessons.every(
                                                  (l: any) => l.completed,
                                                );
                                              if (allLessonsCompleted) {
                                                setShowQuiz(true);
                                                setQuizAnswers(
                                                  new Array(
                                                    selectedModule.quiz.questions.length,
                                                  ).fill(undefined),
                                                );
                                              } else {
                                                toast({
                                                  title:
                                                    "Complete All Lessons First",
                                                  description:
                                                    "You need to complete all lessons before taking the quiz.",
                                                  variant: "destructive",
                                                });
                                              }
                                            }}
                                            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                                            disabled={
                                              !selectedModule.lessons.every(
                                                (l: any) => l.completed,
                                              )
                                            }
                                          >
                                            <Target className="h-4 w-4 mr-2" />
                                            {selectedModule.quiz.passed
                                              ? "Retake Quiz"
                                              : "Start Quiz"}
                                          </Button>
                                        </div>
                                      </Card>
                                    </div>
                                  </>
                                ) : (
                                  <Card className="p-6">
                                    <div className="space-y-6">
                                      <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold">
                                          Knowledge Assessment
                                        </h3>
                                        <div className="flex items-center gap-2">
                                          <div className="text-sm text-muted-foreground">
                                            Progress:{" "}
                                            {
                                              quizAnswers.filter(
                                                (a) => a !== undefined,
                                              ).length
                                            }{" "}
                                            /{" "}
                                            {
                                              selectedModule.quiz.questions
                                                .length
                                            }
                                          </div>
                                          <Progress
                                            value={
                                              (quizAnswers.filter(
                                                (a) => a !== undefined,
                                              ).length /
                                                selectedModule.quiz.questions
                                                  .length) *
                                              100
                                            }
                                            className="w-24 h-2"
                                          />
                                        </div>
                                      </div>

                                      {selectedModule.quiz.questions.map(
                                        (question: any, qIndex: number) => (
                                          <Card
                                            key={question.id}
                                            className="p-6 border-2 hover:border-primary/30 transition-colors"
                                          >
                                            <div className="space-y-4">
                                              <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0">
                                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                    {qIndex + 1}
                                                  </div>
                                                </div>
                                                <div className="flex-1 space-y-3">
                                                  <h4 className="text-lg font-semibold leading-relaxed">
                                                    {question.question}
                                                  </h4>

                                                  {/* Question metadata */}
                                                  <div className="flex items-center gap-3">
                                                    {question.difficulty && (
                                                      <Badge
                                                        variant="outline"
                                                        className={`${
                                                          question.difficulty ===
                                                          "EASY"
                                                            ? "border-green-300 text-green-700 bg-green-50 dark:bg-green-950/20"
                                                            : question.difficulty ===
                                                                "MEDIUM"
                                                              ? "border-yellow-300 text-yellow-700 bg-yellow-50 dark:bg-yellow-950/20"
                                                              : "border-red-300 text-red-700 bg-red-50 dark:bg-red-950/20"
                                                        } font-medium px-2 py-1`}
                                                      >
                                                        {question.difficulty}
                                                      </Badge>
                                                    )}
                                                    {question.type && (
                                                      <Badge
                                                        variant="secondary"
                                                        className="px-2 py-1"
                                                      >
                                                        {question.type}
                                                      </Badge>
                                                    )}
                                                  </div>

                                                  {/* Scenario display */}
                                                  {question.scenario && (
                                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-4 rounded-lg border-l-4 border-l-blue-500">
                                                      <div className="flex items-start gap-2">
                                                        <div className="p-1 bg-blue-500 rounded">
                                                          <Brain className="h-3 w-3 text-white" />
                                                        </div>
                                                        <div>
                                                          <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                                                            Scenario:
                                                          </p>
                                                          <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                                                            {question.scenario}
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )}

                                                  {/* Answer options */}
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
                                                      setQuizAnswers(
                                                        newAnswers,
                                                      );
                                                    }}
                                                    className="space-y-3 mt-4"
                                                  >
                                                    {question.options.map(
                                                      (
                                                        option: string,
                                                        oIndex: number,
                                                      ) => (
                                                        <div
                                                          key={oIndex}
                                                          className="relative"
                                                        >
                                                          <div
                                                            className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:border-primary/50 hover:bg-primary/5 ${
                                                              quizAnswers[
                                                                qIndex
                                                              ] === oIndex
                                                                ? "border-primary bg-primary/10"
                                                                : "border-border"
                                                            }`}
                                                          >
                                                            <RadioGroupItem
                                                              value={oIndex.toString()}
                                                              id={`q${qIndex}-o${oIndex}`}
                                                              className="mt-0.5"
                                                            />
                                                            <Label
                                                              htmlFor={`q${qIndex}-o${oIndex}`}
                                                              className="text-sm flex-1 cursor-pointer leading-relaxed"
                                                            >
                                                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium text-xs mr-3">
                                                                {String.fromCharCode(
                                                                  65 + oIndex,
                                                                )}
                                                              </span>
                                                              {option}
                                                            </Label>
                                                          </div>
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
                                                          {quizAnswers[
                                                            qIndex
                                                          ] ===
                                                          question.correctAnswer
                                                            ? "Correct!"
                                                            : "Incorrect"}
                                                        </span>
                                                        {quizAnswers[qIndex] !==
                                                          question.correctAnswer && (
                                                          <span className="text-sm text-muted-foreground">
                                                            (Correct:{" "}
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
                                          </Card>
                                        ),
                                      )}

                                      {/* Submit Quiz Button */}
                                      <div className="flex justify-center pt-6">
                                        <Button
                                          onClick={handleQuizSubmit}
                                          disabled={
                                            quizAnswers.filter(
                                              (a) => a !== undefined,
                                            ).length !==
                                            selectedModule.quiz.questions.length
                                          }
                                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                                          size="lg"
                                        >
                                          <Trophy className="h-5 w-5 mr-2" />
                                          Submit Assessment
                                          <ChevronRight className="h-5 w-5 ml-2" />
                                        </Button>
                                      </div>

                                      {/* Quiz Result Display */}
                                      {quizResult && (
                                        <Card
                                          className={`p-6 border-2 ${quizResult.passed ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20" : "border-red-500 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20"}`}
                                        >
                                          <div className="text-center space-y-4">
                                            <div className="flex justify-center">
                                              {quizResult.passed ? (
                                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                                                  <Trophy className="h-8 w-8 text-white" />
                                                </div>
                                              ) : (
                                                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                                                  <Target className="h-8 w-8 text-white" />
                                                </div>
                                              )}
                                            </div>
                                            <div>
                                              <h3
                                                className={`text-xl font-bold ${quizResult.passed ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}
                                              >
                                                {quizResult.passed
                                                  ? "🎉 Congratulations!"
                                                  : "📚 Keep Learning!"}
                                              </h3>
                                              <p className="text-lg font-semibold mt-2">
                                                You scored {quizResult.score}%
                                              </p>
                                              <p className="text-muted-foreground">
                                                {quizResult.passed
                                                  ? `Excellent work! You've earned ${selectedModule.reward} coins and 200 XP.`
                                                  : `You need ${selectedModule.quiz.minPassingScore}% to pass. Review the lessons and try again!`}
                                              </p>
                                            </div>
                                            <Button
                                              onClick={() => {
                                                setShowQuiz(false);
                                                setQuizResult(null);
                                                setQuizAnswers([]);
                                              }}
                                              className={
                                                quizResult.passed
                                                  ? "bg-green-500 hover:bg-green-600"
                                                  : "bg-blue-500 hover:bg-blue-600"
                                              }
                                            >
                                              {quizResult.passed
                                                ? "Continue Journey"
                                                : "Review & Retry"}
                                            </Button>
                                          </div>
                                        </Card>
                                      )}
                                    </div>
                                  </Card>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Button disabled className="w-full">
                          <Lock className="h-4 w-4 mr-2" />
                          Locked
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Achievements */}
        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progress.achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`${achievement.unlocked ? "bg-accent/50" : "opacity-60"}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {achievement.title}
                        {achievement.unlocked && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </CardTitle>
                      <CardDescription>
                        {achievement.description}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 text-yellow-700 border-yellow-200"
                    >
                      +{achievement.reward.coins}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {achievement.progress}/{achievement.target}
                      </span>
                    </div>
                    <Progress
                      value={(achievement.progress / achievement.target) * 100}
                      className="h-2"
                    />
                    {achievement.unlocked && achievement.unlockedAt && (
                      <p className="text-xs text-muted-foreground">
                        Unlocked:{" "}
                        {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Progress */}
        <TabsContent value="progress">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-accent/50 rounded-lg">
                    <div className="text-2xl font-bold">{progress.level}</div>
                    <p className="text-sm text-muted-foreground">
                      Current Level
                    </p>
                  </div>
                  <div className="text-center p-4 bg-accent/50 rounded-lg">
                    <div className="text-2xl font-bold">
                      {progress.experiencePoints}
                    </div>
                    <p className="text-sm text-muted-foreground">Total XP</p>
                  </div>
                  <div className="text-center p-4 bg-accent/50 rounded-lg">
                    <div className="text-2xl font-bold">
                      {progress.totalCoinsEarned}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Coins Earned
                    </p>
                  </div>
                  <div className="text-center p-4 bg-accent/50 rounded-lg">
                    <div className="text-2xl font-bold">
                      {Math.round(
                        (progress.modulesCompleted / modules.length) * 100,
                      )}
                      %
                    </div>
                    <p className="text-sm text-muted-foreground">Completion</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getUnlockedAchievements()
                    .sort((a, b) => (b.unlockedAt || 0) - (a.unlockedAt || 0))
                    .slice(0, 5)
                    .map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg"
                      >
                        <div className="text-xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 border-yellow-200"
                        >
                          +{achievement.reward.coins}
                        </Badge>
                      </div>
                    ))}
                  {getUnlockedAchievements().length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Complete lessons and quizzes to unlock achievements!
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
