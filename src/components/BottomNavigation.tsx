
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import GoalSetting from "@/components/GoalSetting";
import StatsPanel from "@/components/StatsPanel";
import RewardSystem from "@/components/RewardSystem";
import NotificationPanel from "@/components/NotificationPanel";
import { Home, Target, BarChart3, Gift, Bell } from "lucide-react";

interface BottomNavigationProps {
  dailyGoal: number;
  setDailyGoal: (goal: number) => void;
  points: number;
  setPoints: (points: number) => void;
  isGoalMet: boolean;
  purchasedItems: string[];
  setPurchasedItems: (items: string[]) => void;
  consumableItems: {[key: string]: number};
  setConsumableItems: (items: {[key: string]: number}) => void;
  dailyRewardsClaimed: {[key: number]: Date | null};
  setDailyRewardsClaimed: (rewards: {[key: number]: Date | null}) => void;
}

const BottomNavigation = ({
  dailyGoal,
  setDailyGoal,
  points,
  setPoints,
  isGoalMet,
  purchasedItems,
  setPurchasedItems,
  consumableItems,
  setConsumableItems,
  dailyRewardsClaimed,
  setDailyRewardsClaimed
}: BottomNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-100 shadow-lg">
      <div className="flex justify-around items-center py-2 max-w-sm mx-auto">
        <Button variant="ghost" className="flex flex-col items-center gap-1 h-12 text-orange-600">
          <Home className="w-5 h-5" />
          <span className="text-xs">홈</span>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-12 text-gray-600">
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs">대시보드</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>대시보드</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <StatsPanel />
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-12 text-gray-600">
              <Target className="w-5 h-5" />
              <span className="text-xs">목표설정</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>목표설정</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <GoalSetting 
                dailyGoal={dailyGoal}
                setDailyGoal={setDailyGoal}
              />
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-12 text-gray-600">
              <Gift className="w-5 h-5" />
              <span className="text-xs">리워드</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>리워드</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <RewardSystem 
                points={points}
                setPoints={setPoints}
                isGoalMet={isGoalMet}
                purchasedItems={purchasedItems}
                setPurchasedItems={setPurchasedItems}
                consumableItems={consumableItems}
                setConsumableItems={setConsumableItems}
                dailyRewardsClaimed={dailyRewardsClaimed}
                setDailyRewardsClaimed={setDailyRewardsClaimed}
              />
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-12 text-gray-600">
              <Bell className="w-5 h-5" />
              <span className="text-xs">알림</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>알림</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <NotificationPanel />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default BottomNavigation;
