import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Target, Clock, Smartphone, Plus, X } from "lucide-react";

interface GoalSettingProps {
  dailyGoal: number;
  setDailyGoal: (goal: number) => void;
}

const GoalSetting = ({ dailyGoal, setDailyGoal }: GoalSettingProps) => {
  const [focusMode, setFocusMode] = useState(true);
  const [focusStartTime, setFocusStartTime] = useState('09:00');
  const [focusEndTime, setFocusEndTime] = useState('18:00');
  const [blockedApps, setBlockedApps] = useState(['유튜브', '인스타그램', '틱톡']);
  const [newApp, setNewApp] = useState('');

  const addBlockedApp = () => {
    if (newApp.trim() && !blockedApps.includes(newApp.trim())) {
      setBlockedApps([...blockedApps, newApp.trim()]);
      setNewApp('');
    }
  };

  const removeBlockedApp = (app: string) => {
    setBlockedApps(blockedApps.filter(a => a !== app));
  };

  const handleGoalChange = (value: number[]) => {
    setDailyGoal(value[0]);
  };

  return (
    <div className="space-y-6">
      {/* Daily Goal Setting */}
      <Card className="bg-white/70 backdrop-blur-sm border-orange-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Target className="w-5 h-5" />
            일일 사용 목표 설정
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">하루 스마트폰 사용 목표</Label>
            <div className="px-3">
              <Slider
                value={[dailyGoal]}
                onValueChange={handleGoalChange}
                max={2}
                min={1}
                step={0.5}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>1시간</span>
              <span className="font-medium text-orange-600">{dailyGoal}시간</span>
              <span>2시간</span>
            </div>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-800">
              현재 목표: <strong>{dailyGoal}시간</strong>
              <br />
              건강한 디지털 라이프를 위해 적정 사용량을 설정해보세요! 🎯
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Focus Mode Setting */}
      <Card className="bg-white/70 backdrop-blur-sm border-orange-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Clock className="w-5 h-5" />
            집중 시간 설정
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">집중 모드 활성화</Label>
              <p className="text-sm text-gray-600">설정한 시간 동안 특정 앱을 차단합니다</p>
            </div>
            <Switch 
              checked={focusMode}
              onCheckedChange={setFocusMode}
            />
          </div>

          {focusMode && (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-time" className="text-sm font-medium">시작 시간</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={focusStartTime}
                    onChange={(e) => setFocusStartTime(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="end-time" className="text-sm font-medium">종료 시간</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={focusEndTime}
                    onChange={(e) => setFocusEndTime(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="text-center p-2 bg-white rounded border">
                <span className="text-sm font-medium text-blue-800">
                  집중 시간: {focusStartTime} - {focusEndTime}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Blocked Apps Setting */}
      <Card className="bg-white/70 backdrop-blur-sm border-orange-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Smartphone className="w-5 h-5" />
            차단할 앱 설정
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="차단할 앱 이름 입력"
              value={newApp}
              onChange={(e) => setNewApp(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addBlockedApp()}
              className="flex-1"
            />
            <Button onClick={addBlockedApp} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">차단된 앱 목록</Label>
            <div className="flex flex-wrap gap-2">
              {blockedApps.map((app) => (
                <Badge
                  key={app}
                  variant="secondary"
                  className="flex items-center gap-1 bg-red-100 text-red-800 hover:bg-red-200"
                >
                  {app}
                  <button
                    onClick={() => removeBlockedApp(app)}
                    className="ml-1 hover:bg-red-300 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              🚫 집중 시간 동안 이 앱들은 사용할 수 없습니다.
              <br />
              두둠치가 여러분의 집중을 응원하고 있어요!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button 
          size="lg"
          className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white px-8"
        >
          설정 저장하기
        </Button>
      </div>
    </div>
  );
};

export default GoalSetting;
