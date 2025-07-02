
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Zap, Package } from "lucide-react";

interface DudumchiCharacterProps {
  mood: string;
  isGoalMet: boolean;
  todayUsage: number;
  dailyGoal: number;
  emoji: string;
  purchasedItems: string[];
  equippedItems: {[key: string]: string};
  setEquippedItems: (items: {[key: string]: string}) => void;
}

const DudumchiCharacter = ({ 
  mood, 
  isGoalMet, 
  todayUsage, 
  dailyGoal, 
  emoji, 
  purchasedItems, 
  equippedItems, 
  setEquippedItems 
}: DudumchiCharacterProps) => {
  const [currentMood, setCurrentMood] = useState(mood);
  const [energy, setEnergy] = useState(85);
  const [happiness, setHappiness] = useState(90);
  const [growth, setGrowth] = useState(65);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showInventory, setShowInventory] = useState(false);

  const rewardItems = [
    { id: 'banana', name: '바나나 간식', emoji: '🍌', type: 'accessory' },
    { id: 'toy', name: '장난감 공', emoji: '🎾', type: 'accessory' },
    { id: 'hat', name: '귀여운 모자', emoji: '🎩', type: 'hat' },
    { id: 'house', name: '작은 집', emoji: '🏠', type: 'background' },
    { id: 'crown', name: '황금 왕관', emoji: '👑', type: 'hat' },
  ];

  useEffect(() => {
    if (isGoalMet) {
      setCurrentMood('happy');
      setHappiness(Math.min(100, happiness + 5));
    } else {
      setCurrentMood('worried');
      setHappiness(Math.max(0, happiness - 3));
    }
  }, [isGoalMet]);

  const handleInteraction = (action: string) => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);

    switch (action) {
      case 'feed':
        setEnergy(Math.min(100, energy + 10));
        setHappiness(Math.min(100, happiness + 5));
        break;
      case 'play':
        setHappiness(Math.min(100, happiness + 10));
        setEnergy(Math.max(0, energy - 5));
        break;
      case 'pet':
        setHappiness(Math.min(100, happiness + 3));
        break;
    }
  };

  const handleEquipItem = (itemId: string, itemType: string) => {
    const newEquippedItems = { ...equippedItems };
    
    // If the same item is already equipped, unequip it
    if (newEquippedItems[itemType] === itemId) {
      delete newEquippedItems[itemType];
    } else {
      newEquippedItems[itemType] = itemId;
    }
    
    setEquippedItems(newEquippedItems);
  };

  const getMoodMessage = () => {
    if (isGoalMet) {
      return "와! 오늘 정말 잘하고 있어요! 디지털 디톡스 성공! 🎉";
    } else {
      return "음... 스마트폰을 조금 많이 쓰고 있는 것 같아요. 함께 절제해봐요! 💪";
    }
  };

  const getCharacterDisplay = () => {
    let display = emoji;
    
    // Add equipped hat
    if (equippedItems.hat) {
      const hatItem = rewardItems.find(item => item.id === equippedItems.hat);
      if (hatItem) {
        display = hatItem.emoji + display;
      }
    }
    
    return display;
  };

  const getBackgroundStyle = () => {
    if (equippedItems.background === 'house') {
      return 'bg-gradient-to-b from-amber-100 to-orange-200';
    }
    return 'bg-gradient-to-b from-orange-50 to-orange-100';
  };

  return (
    <Card className="bg-gradient-to-br from-orange-100 to-amber-100 border-orange-200 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-orange-800 text-base">두둠치와 함께해요!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Fox Character Display */}
        <div className="text-center">
          <div className={`transition-transform duration-1000 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
            <div className={`${getBackgroundStyle()} rounded-lg p-3 border-2 border-orange-200 shadow-inner`}>
              <div className="text-4xl mb-2">
                {getCharacterDisplay()}
              </div>
              {/* Show equipped accessories */}
              {equippedItems.accessory && (
                <div className="text-lg">
                  {rewardItems.find(item => item.id === equippedItems.accessory)?.emoji}
                </div>
              )}
            </div>
          </div>
          <div className="mt-2 p-2 bg-white/70 rounded-lg border border-orange-200">
            <p className="text-xs text-orange-800 font-medium">
              {getMoodMessage()}
            </p>
          </div>
        </div>

        {/* Inventory Button */}
        {purchasedItems.length > 0 && (
          <div className="text-center">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowInventory(!showInventory)}
              className="bg-purple-50 border-purple-300 hover:bg-purple-100 text-xs h-7"
            >
              <Package className="w-3 h-3 mr-1" />
              아이템 착용 ({purchasedItems.length})
            </Button>
          </div>
        )}

        {/* Inventory Display */}
        {showInventory && purchasedItems.length > 0 && (
          <div className="bg-white/80 rounded-lg p-2 border border-purple-200">
            <div className="text-xs font-medium text-purple-800 mb-2 text-center">보유 아이템</div>
            <div className="grid grid-cols-3 gap-1">
              {purchasedItems.map((itemId) => {
                const item = rewardItems.find(r => r.id === itemId);
                if (!item) return null;
                
                const isEquipped = equippedItems[item.type] === itemId;
                
                return (
                  <button
                    key={itemId}
                    onClick={() => handleEquipItem(itemId, item.type)}
                    className={`p-1 rounded border text-center transition-all ${
                      isEquipped 
                        ? 'bg-green-100 border-green-300' 
                        : 'bg-gray-50 border-gray-200 hover:bg-purple-50'
                    }`}
                  >
                    <div className="text-lg">{item.emoji}</div>
                    <div className="text-xs text-gray-600">{item.name}</div>
                    {isEquipped && (
                      <Badge className="bg-green-100 text-green-800 text-xs mt-1">착용중</Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Status Bars */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Heart className="w-3 h-3 text-red-500" />
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span>행복도</span>
                <span>{happiness}%</span>
              </div>
              <div className="w-full bg-gray-300 rounded h-1.5 border border-gray-400">
                <div 
                  className="bg-gradient-to-r from-pink-400 to-red-400 h-full transition-all duration-500 rounded"
                  style={{ width: `${happiness}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-yellow-500" />
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span>에너지</span>
                <span>{energy}%</span>
              </div>
              <div className="w-full bg-gray-300 rounded h-1.5 border border-gray-400">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full transition-all duration-500 rounded"
                  style={{ width: `${energy}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Star className="w-3 h-3 text-blue-500" />
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span>성장도</span>
                <span>{growth}%</span>
              </div>
              <div className="w-full bg-gray-300 rounded h-1.5 border border-gray-400">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-purple-400 h-full transition-all duration-500 rounded"
                  style={{ width: `${growth}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-1">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleInteraction('feed')}
            className="bg-orange-50 border-orange-300 hover:bg-orange-100 text-xs h-7"
          >
            🍌 먹이주기
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleInteraction('play')}
            className="bg-amber-50 border-amber-300 hover:bg-amber-100 text-xs h-7"
          >
            🎾 놀아주기
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleInteraction('pet')}
            className="bg-yellow-50 border-yellow-300 hover:bg-yellow-100 text-xs h-7"
          >
            👋 쓰다듬기
          </Button>
        </div>

        {/* Daily Achievement */}
        <div className="text-center">
          <div className={`inline-flex items-center gap-1 px-2 py-1 border-2 text-xs font-medium rounded ${
            isGoalMet 
              ? 'bg-green-100 text-green-800 border-green-300' 
              : 'bg-orange-100 text-orange-800 border-orange-300'
          }`}>
            <span>{isGoalMet ? '🏆' : '🎯'}</span>
            {isGoalMet ? '오늘 목표 달성!' : '목표까지 조금 더!'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DudumchiCharacter;
