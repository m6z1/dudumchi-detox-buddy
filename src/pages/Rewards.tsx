
import RewardSystem from "@/components/RewardSystem";

interface RewardsProps {
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

const Rewards = ({
  points,
  setPoints,
  isGoalMet,
  purchasedItems,
  setPurchasedItems,
  consumableItems,
  setConsumableItems,
  dailyRewardsClaimed,
  setDailyRewardsClaimed
}: RewardsProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 w-full max-w-sm mx-auto pb-16">
      <div className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="px-3 py-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            리워드
          </h1>
        </div>
      </div>
      
      <div className="px-3 py-4">
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
    </div>
  );
};

export default Rewards;
