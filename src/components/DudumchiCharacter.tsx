
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

  const getPixelFox = () => {
    const baseStyle = "font-mono text-6xl leading-none select-none";
    
    if (currentMood === 'happy') {
      return (
        <div className={`${baseStyle} text-orange-600`}>
          <div className="pixel-art">
            <div className="text-center space-y-1">
              <div>  ╭─╮  </div>
              <div> ╱◉ ◉╲ </div>
              <div>╰─ ᵕ ─╯</div>
              <div>  ╱╲╱╲  </div>
            </div>
          </div>
        </div>
      );
    } else if (currentMood === 'worried') {
      return (
        <div className={`${baseStyle} text-orange-500`}>
          <div className="pixel-art">
            <div className="text-center space-y-1">
              <div>  ╭─╮  </div>
              <div> ╱◔ ◔╲ </div>
              <div>╰─ ⌒ ─╯</div>
              <div>  ╱╲╱╲  </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={`${baseStyle} text-orange-500`}>
          <div className="pixel-art">
            <div className="text-center space-y-1">
              <div>  ╭─╮  </div>
              <div> ╱● ●╲ </div>
              <div>╰─ ― ─╯</div>
              <div>  ╱╲╱╲  </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const getPixelBanana = () => {
    return (
      <div className="font-mono text-4xl text-yellow-500 select-none">
        <div className="pixel-art">
          <div className="text-center">
            <div>╭─╮</div>
            <div>│ │</div>
            <div>╰─╯</div>
          </div>
        </div>
      </div>
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
        <CardTitle className="text-center text-orange-800 font-mono">두둠치와 함께해요!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pixel Character Display */}
        <div className="text-center">
          <div className={`transition-transform duration-1000 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
            <div className="bg-gradient-to-b from-orange-50 to-orange-100 rounded-lg p-6 border-2 border-orange-200 shadow-inner">
              {getPixelFox()}
              <div className="mt-2">
                {getPixelBanana()}
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white/70 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800 font-medium font-mono">
              {getMoodMessage()}
            </p>
          </div>
        </div>

        {/* Pixel-style Status Bars */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-red-500" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1 font-mono">
                <span>행복도</span>
                <span>{happiness}%</span>
              </div>
              <div className="w-full bg-gray-300 rounded-none h-3 border border-gray-400 pixel-bar">
                <div 
                  className="bg-gradient-to-r from-pink-400 to-red-400 h-full transition-all duration-500 pixel-fill"
                  style={{ width: `${happiness}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-yellow-500" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1 font-mono">
                <span>에너지</span>
                <span>{energy}%</span>
              </div>
              <div className="w-full bg-gray-300 rounded-none h-3 border border-gray-400 pixel-bar">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full transition-all duration-500 pixel-fill"
                  style={{ width: `${energy}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-blue-500" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1 font-mono">
                <span>성장도</span>
                <span>{growth}%</span>
              </div>
              <div className="w-full bg-gray-300 rounded-none h-3 border border-gray-400 pixel-bar">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-purple-400 h-full transition-all duration-500 pixel-fill"
                  style={{ width: `${growth}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pixel-style Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleInteraction('feed')}
            className="bg-orange-50 border-2 border-orange-300 hover:bg-orange-100 font-mono text-xs rounded-none pixel-button"
          >
            🍌 먹이주기
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleInteraction('play')}
            className="bg-amber-50 border-2 border-amber-300 hover:bg-amber-100 font-mono text-xs rounded-none pixel-button"
          >
            🎾 놀아주기
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleInteraction('pet')}
            className="bg-yellow-50 border-2 border-yellow-300 hover:bg-yellow-100 font-mono text-xs rounded-none pixel-button"
          >
            👋 쓰다듬기
          </Button>
        </div>

        {/* Daily Achievement */}
        <div className="text-center">
          <div className={`inline-flex items-center gap-2 px-3 py-1 border-2 text-sm font-mono font-medium rounded-none ${
            isGoalMet 
              ? 'bg-green-100 text-green-800 border-green-300' 
              : 'bg-orange-100 text-orange-800 border-orange-300'
          }`}>
            <span>{isGoalMet ? '🏆' : '🎯'}</span>
            {isGoalMet ? '오늘 목표 달성!' : '목표까지 조금 더!'}
          </div>
        </div>

        <style jsx>{`
          .pixel-art {
            image-rendering: pixelated;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
          }
          .pixel-bar {
            image-rendering: pixelated;
          }
          .pixel-fill {
            image-rendering: pixelated;
          }
          .pixel-button {
            image-rendering: pixelated;
            box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
          }
          .pixel-button:hover {
            box-shadow: 1px 1px 0px rgba(0,0,0,0.2);
            transform: translate(1px, 1px);
          }
        `}</style>
      </CardContent>
    </Card>
  );
};

export default DudumchiCharacter;
