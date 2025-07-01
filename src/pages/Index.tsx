
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import DudumchiCharacter from "@/components/DudumchiCharacter";
import GoalSetting from "@/components/GoalSetting";
import StatsPanel from "@/components/StatsPanel";
import RewardSystem from "@/components/RewardSystem";
import NotificationPanel from "@/components/NotificationPanel";
import { Smartphone, Target, BarChart3, Gift } from "lucide-react";

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayUsage, setTodayUsage] = useState(3.2); // hours
  const [dailyGoal, setDailyGoal] = useState(4); // hours
  const [dudumchiMood, setDudumchiMood] = useState('happy');
  const [points, setPoints] = useState(150);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const usagePercentage = (todayUsage / dailyGoal) * 100;
  const isGoalMet = todayUsage <= dailyGoal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🦊</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  DuDumChi
                </h1>
                <p className="text-sm text-gray-600">디지털 디톡스 챌린지</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">현재 시간</p>
                <p className="font-mono text-lg">{currentTime.toLocaleTimeString()}</p>
              </div>
              <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full">
                <Gift className="w-4 h-4 text-amber-600" />
                <span className="font-medium text-amber-700">{points}P</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Daily Progress Card */}
        <Card className="bg-white/70 backdrop-blur-sm border-orange-100 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Smartphone className="w-5 h-5" />
              오늘의 스마트폰 사용 현황
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">사용 시간</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-orange-600">{todayUsage}시간</span>
                  <span className="text-gray-500"> / {dailyGoal}시간</span>
                </div>
              </div>
              <Progress value={Math.min(usagePercentage, 100)} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className={isGoalMet ? "text-green-600" : "text-red-500"}>
                  {isGoalMet ? "목표 달성 중! 🎉" : "목표 초과 주의 ⚠️"}
                </span>
                <span className="text-gray-500">
                  {Math.max(0, dailyGoal - todayUsage).toFixed(1)}시간 남음
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Dudumchi Character */}
          <div className="lg:col-span-1">
            <DudumchiCharacter 
              mood={dudumchiMood} 
              isGoalMet={isGoalMet}
              todayUsage={todayUsage}
              dailyGoal={dailyGoal}
            />
          </div>

          {/* Main Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="dashboard" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  대시보드
                </TabsTrigger>
                <TabsTrigger value="goals" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  목표설정
                </TabsTrigger>
                <TabsTrigger value="rewards" className="flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  리워드
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  알림
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <StatsPanel />
              </TabsContent>

              <TabsContent value="goals">
                <GoalSetting 
                  dailyGoal={dailyGoal}
                  setDailyGoal={setDailyGoal}
                />
              </TabsContent>

              <TabsContent value="rewards">
                <RewardSystem 
                  points={points}
                  setPoints={setPoints}
                  isGoalMet={isGoalMet}
                />
              </TabsContent>

              <TabsContent value="notifications">
                <NotificationPanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button 
          size="lg" 
          className="rounded-full w-16 h-16 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 shadow-2xl"
        >
          <span className="text-2xl">🦊</span>
        </Button>
      </div>
    </div>
  );
};

export default Index;
