
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gift, Star, ShoppingCart, Trophy } from "lucide-react";

interface RewardSystemProps {
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

const RewardSystem = ({ 
  points, 
  setPoints, 
  isGoalMet, 
  purchasedItems, 
  setPurchasedItems,
  consumableItems,
  setConsumableItems,
  dailyRewardsClaimed,
  setDailyRewardsClaimed
}: RewardSystemProps) => {
  const rewardItems = [
    { id: 'banana', name: '바나나 간식', cost: 50, emoji: '🍌', description: '두둠치가 좋아하는 간식', type: 'consumable' },
    { id: 'toy', name: '장난감 공', cost: 100, emoji: '🎾', description: '두둠치와 놀 수 있는 장난감', type: 'consumable' },
    { id: 'hat', name: '귀여운 모자', cost: 150, emoji: '🎩', description: '두둠치를 꾸며줄 액세서리', type: 'wearable' },
    { id: 'house', name: '작은 집', cost: 300, emoji: '🏠', description: '두둠치를 위한 아늑한 집', type: 'wearable' },
    { id: 'crown', name: '황금 왕관', cost: 500, emoji: '👑', description: '최고급 액세서리', type: 'wearable' },
  ];

  const achievements = [
    { id: 'first_goal', name: '첫 목표 달성', points: 100, unlocked: true, emoji: '🎯' },
    { id: 'three_days', name: '3일 연속 달성', points: 200, unlocked: true, emoji: '🔥' },
    { id: 'week_master', name: '일주일 마스터', points: 300, unlocked: false, emoji: '📅' },
    { id: 'month_hero', name: '한 달 영웅', points: 500, unlocked: false, emoji: '🏆' },
  ];

  const dailyRewards = [
    { day: 1, reward: 20 },
    { day: 2, reward: 30 },
    { day: 3, reward: 40 },
    { day: 4, reward: 50 },
    { day: 5, reward: 60 },
  ];

  const purchaseItem = (item: typeof rewardItems[0]) => {
    if (points >= item.cost) {
      setPoints(points - item.cost);
      
      if (item.type === 'consumable') {
        // Add to consumable items inventory
        const newConsumableItems = { ...consumableItems };
        newConsumableItems[item.id] = (newConsumableItems[item.id] || 0) + 1;
        setConsumableItems(newConsumableItems);
      } else {
        // Add to purchased items for wearables
        if (!purchasedItems.includes(item.id)) {
          setPurchasedItems([...purchasedItems, item.id]);
        }
      }
    }
  };

  const canClaimDailyReward = (day: number) => {
    const lastClaimed = dailyRewardsClaimed[day];
    if (!lastClaimed) return true;
    
    const now = new Date();
    const timeDiff = now.getTime() - lastClaimed.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    
    return hoursDiff >= 24;
  };

  const claimDailyReward = (reward: typeof dailyRewards[0]) => {
    if (isGoalMet && canClaimDailyReward(reward.day)) {
      setPoints(points + reward.reward);
      const newDailyRewardsClaimed = { ...dailyRewardsClaimed };
      newDailyRewardsClaimed[reward.day] = new Date();
      setDailyRewardsClaimed(newDailyRewardsClaimed);
    }
  };

  return (
    <div className="space-y-6 max-h-[60vh] overflow-y-auto">
      {/* Points Display */}
      <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">{points}</div>
            <div className="text-lg text-orange-800">보유 포인트</div>
            <div className="mt-3 flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-orange-700">
                {isGoalMet ? '오늘 목표 달성으로 추가 포인트 획득!' : '목표를 달성하면 포인트를 받을 수 있어요!'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shop */}
      <Card className="bg-white/70 backdrop-blur-sm border-orange-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <ShoppingCart className="w-5 h-5" />
            두둠치 상점
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rewardItems.map((item) => {
              const isConsumable = item.type === 'consumable';
              const consumableCount = consumableItems[item.id] || 0;
              const isPurchased = purchasedItems.includes(item.id);
              
              return (
                <div 
                  key={item.id} 
                  className={`p-4 rounded-lg border-2 transition-all ${
                    (isConsumable && consumableCount > 0) || (!isConsumable && isPurchased)
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200 hover:border-orange-200'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <div className="font-medium text-gray-800">{item.name}</div>
                    <div className="text-sm text-gray-600 mb-3">{item.description}</div>
                    
                    {isConsumable && consumableCount > 0 && (
                      <div className="mb-2">
                        <Badge className="bg-blue-100 text-blue-800">보유: {consumableCount}개</Badge>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        {item.cost}P
                      </Badge>
                      <Button 
                        size="sm"
                        onClick={() => purchaseItem(item)}
                        disabled={points < item.cost}
                        className="bg-orange-400 hover:bg-orange-500"
                      >
                        구매
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-white/70 backdrop-blur-sm border-orange-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Trophy className="w-5 h-5" />
            업적 시스템
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                    {achievement.emoji}
                  </div>
                  <div>
                    <div className={`font-medium ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                      {achievement.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      보상: {achievement.points}P
                    </div>
                  </div>
                </div>
                {achievement.unlocked ? (
                  <Badge className="bg-green-100 text-green-800">달성완료</Badge>
                ) : (
                  <Badge variant="outline">미달성</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Rewards */}
      <Card className="bg-white/70 backdrop-blur-sm border-orange-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Gift className="w-5 h-5" />
            일일 보상
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {dailyRewards.map((reward) => {
              const isClaimed = dailyRewardsClaimed[reward.day] !== undefined && dailyRewardsClaimed[reward.day] !== null;
              const canClaim = isGoalMet && canClaimDailyReward(reward.day);
              
              return (
                <div 
                  key={reward.day}
                  className={`text-center p-3 rounded-lg border-2 transition-all ${
                    isClaimed 
                      ? 'bg-green-50 border-green-200' 
                      : canClaim
                      ? 'bg-yellow-50 border-yellow-300 animate-pulse' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="text-sm text-gray-600 mb-1">Day {reward.day}</div>
                  <div className="text-lg font-bold text-orange-600">{reward.reward}P</div>
                  {isClaimed ? (
                    <div className="text-xs text-green-600 mt-1">✅ 획득</div>
                  ) : canClaim ? (
                    <Button 
                      size="sm" 
                      className="text-xs mt-1 h-6 bg-yellow-400 hover:bg-yellow-500"
                      onClick={() => claimDailyReward(reward)}
                    >
                      받기
                    </Button>
                  ) : (
                    <div className="text-xs text-gray-400 mt-1">
                      {!canClaimDailyReward(reward.day) && isClaimed ? '24시간 대기' : '대기중'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 text-center">
              매일 목표를 달성하면 보상을 받을 수 있어요! 🎁
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardSystem;
