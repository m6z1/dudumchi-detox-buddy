
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star, Zap } from "lucide-react";

interface DudumchiCharacterProps {
  mood: string;
  isGoalMet: boolean;
  todayUsage: number;
  dailyGoal: number;
}

const DudumchiCharacter = ({ mood, isGoalMet, todayUsage, dailyGoal }: DudumchiCharacterProps) => {
  const [currentMood, setCurrentMood] = useState(mood);
  const [energy, setEnergy] = useState(85);
  const [happiness, setHappiness] = useState(90);
  const [growth, setGrowth] = useState(65);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const getFoxImage = () => {
    return (
      <img 
        src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop&crop=face"
        alt="두둠치 여우"
        className="w-32 h-32 rounded-full object-cover mx-auto"
      />
    );
  };

  const getMoodMessage = () => {
    if (isGoalMet) {
      return "와! 오늘 정말 잘하고 있어요! 디지털 디톡스 성공! 🎉";
    } else {
      return "음... 스마트폰을 조금 많이 쓰고 있는 것 같아요. 함께 절제해봐요! 💪";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-orange-100 to-amber-100 border-orange-200 shadow-xl">
      <CardHeader>
        <CardTitle className="text-center text-orange-800">두둠치와 함께해요!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Fox Character Display */}
        <div className="text-center">
          <div className={`transition-transform duration-1000 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
            <div className="bg-gradient-to-b from-orange-50 to-orange-100 rounded-lg p-6 border-2 border-orange-200 shadow-inner">
              {getFoxImage()}
            </div>
          </div>
          <div className="mt-4 p-3 bg-white/70 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800 font-medium">
              {getMoodMessage()}
            </p>
          </div>
        </div>

        {/* Status Bars */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-red-500" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>행복도</span>
                <span>{happiness}%</span>
              </div>
              <div className="w-full bg-gray-300 rounded h-3 border border-gray-400">
                <div 
                  className="bg-gradient-to-r from-pink-400 to-red-400 h-full transition-all duration-500 rounded"
                  style={{ width: `${happiness}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-yellow-500" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>에너지</span>
                <span>{energy}%</span>
              </div>
              <div className="w-full bg-gray-300 rounded h-3 border border-gray-400">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full transition-all duration-500 rounded"
                  style={{ width: `${energy}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-blue-500" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>성장도</span>
                <span>{growth}%</span>
              </div>
              <div className="w-full bg-gray-300 rounded h-3 border border-gray-400">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-purple-400 h-full transition-all duration-500 rounded"
                  style={{ width: `${growth}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleInteraction('feed')}
            className="bg-orange-50 border-orange-300 hover:bg-orange-100 text-xs"
          >
            🍌 먹이주기
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleInteraction('play')}
            className="bg-amber-50 border-amber-300 hover:bg-amber-100 text-xs"
          >
            🎾 놀아주기
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleInteraction('pet')}
            className="bg-yellow-50 border-yellow-300 hover:bg-yellow-100 text-xs"
          >
            👋 쓰다듬기
          </Button>
        </div>

        {/* Daily Achievement */}
        <div className="text-center">
          <div className={`inline-flex items-center gap-2 px-3 py-1 border-2 text-sm font-medium rounded ${
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
