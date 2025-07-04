
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import DudumchiCharacter from "@/components/DudumchiCharacter";
import EmojiSelector from "@/components/EmojiSelector";
import BottomNavigation from "@/components/BottomNavigation";
import { Smartphone, Gift } from "lucide-react";

interface IndexProps {
  points: number;
  setPoints: (points: number) => void;
  purchasedItems: string[];
  setPurchasedItems: (items: string[]) => void;
  consumableItems: {[key: string]: number};
  setConsumableItems: (items: {[key: string]: number}) => void;
  dailyRewardsClaimed: {[key: number]: Date | null};
  setDailyRewardsClaimed: (rewards: {[key: number]: Date | null}) => void;
}

const Index = ({ 
  points, 
  setPoints, 
  purchasedItems, 
  setPurchasedItems, 
  consumableItems, 
  setConsumableItems, 
  dailyRewardsClaimed, 
  setDailyRewardsClaimed 
}: IndexProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayUsage, setTodayUsage] = useState(1.5); // hours
  const [dailyGoal, setDailyGoal] = useState(2); // hours - changed to 2
  const [dudumchiMood, setDudumchiMood] = useState('happy');
  const [currentEmoji, setCurrentEmoji] = useState('🦊');
  const [equippedItems, setEquippedItems] = useState<{[key: string]: string}>({});
  const [isEmojiSelectorOpen, setIsEmojiSelectorOpen] = useState(false);

  const animalEmojis = ['🦊', '🐱', '🐶', '🐰', '🐹', '🐨', '🐼', '🐸', '🐯', '🦁'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEmojiSelect = (emoji: string) => {
    setCurrentEmoji(emoji);
    setIsEmojiSelectorOpen(false);
  };

  const usagePercentage = (todayUsage / dailyGoal) * 100;
  const isGoalMet = todayUsage <= dailyGoal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 w-full max-w-sm mx-auto pb-16">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">🦊</span>
              </div>
              <div>
                <h1 className="text-base font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  DuDumChi
                </h1>
                <p className="text-xs text-gray-600">디지털 디톡스 챌린지</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-xs text-gray-600">현재 시간</p>
                <p className="font-mono text-xs">{currentTime.toLocaleTimeString()}</p>
              </div>
              <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-full">
                <Gift className="w-3 h-3 text-amber-600" />
                <span className="font-medium text-amber-700 text-xs">{points}P</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 py-3 space-y-3">
        {/* Daily Progress Card */}
        <Card className="bg-white/70 backdrop-blur-sm border-orange-100 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-orange-800 text-base">
              <Smartphone className="w-4 h-4" />
              오늘의 스마트폰 사용 현황
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">사용 시간</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-orange-600">{todayUsage}시간</span>
                  <span className="text-gray-500 text-xs"> / {dailyGoal}시간</span>
                </div>
              </div>
              <Progress value={Math.min(usagePercentage, 100)} className="h-2" />
              <div className="flex justify-between text-xs">
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

        {/* Dudumchi Character */}
        <DudumchiCharacter 
          mood={dudumchiMood} 
          isGoalMet={isGoalMet}
          todayUsage={todayUsage}
          dailyGoal={dailyGoal}
          emoji={currentEmoji}
          purchasedItems={purchasedItems}
          equippedItems={equippedItems}
          setEquippedItems={setEquippedItems}
          consumableItems={consumableItems}
          setConsumableItems={setConsumableItems}
        />
      </div>

      {/* Floating Action Button for Emoji Selection */}
      <div className="fixed bottom-20 right-3">
        <Sheet open={isEmojiSelectorOpen} onOpenChange={setIsEmojiSelectorOpen}>
          <SheetTrigger asChild>
            <Button 
              size="sm" 
              className="rounded-full w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 shadow-lg"
            >
              <span className="text-lg">{currentEmoji}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[50vh]">
            <SheetHeader>
              <SheetTitle>이모티콘 선택</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <EmojiSelector 
                emojis={animalEmojis}
                currentEmoji={currentEmoji}
                onEmojiSelect={handleEmojiSelect}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
