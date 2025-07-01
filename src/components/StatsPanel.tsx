
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingDown, TrendingUp, Clock } from "lucide-react";

const StatsPanel = () => {
  const weeklyData = [
    { day: '월', usage: 4.2, goal: 4.0, achieved: false },
    { day: '화', usage: 3.8, goal: 4.0, achieved: true },
    { day: '수', usage: 5.1, goal: 4.0, achieved: false },
    { day: '목', usage: 3.5, goal: 4.0, achieved: true },
    { day: '금', usage: 2.9, goal: 4.0, achieved: true },
    { day: '토', usage: 6.2, goal: 4.0, achieved: false },
    { day: '일', usage: 3.2, goal: 4.0, achieved: true },
  ];

  const appUsageData = [
    { name: '유튜브', time: 1.5, color: 'bg-red-400' },
    { name: '인스타그램', time: 0.8, color: 'bg-pink-400' },
    { name: '카카오톡', time: 0.6, color: 'bg-yellow-400' },
    { name: '웹 브라우저', time: 0.3, color: 'bg-blue-400' },
  ];

  const totalWeeklyUsage = weeklyData.reduce((sum, day) => sum + day.usage, 0);
  const achievedDays = weeklyData.filter(day => day.achieved).length;
  const weeklyAverage = totalWeeklyUsage / 7;

  return (
    <div className="space-y-6">
      {/* Weekly Overview */}
      <Card className="bg-white/70 backdrop-blur-sm border-orange-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <BarChart3 className="w-5 h-5" />
            이번 주 사용 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weeklyData.map((day) => (
              <div key={day.day} className="text-center">
                <div className="text-xs text-gray-600 mb-1">{day.day}</div>
                <div className="h-20 bg-gray-100 rounded relative overflow-hidden">
                  <div 
                    className={`absolute bottom-0 w-full rounded transition-all duration-500 ${
                      day.achieved ? 'bg-green-400' : 'bg-red-400'
                    }`}
                    style={{ height: `${Math.min((day.usage / 8) * 100, 100)}%` }}
                  />
                  <div className="absolute inset-0 flex items-end justify-center pb-1">
                    <span className="text-xs font-medium text-white">
                      {day.usage}h
                    </span>
                  </div>
                </div>
                <div className="text-xs mt-1">
                  {day.achieved ? '✅' : '❌'}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{achievedDays}</div>
              <div className="text-sm text-blue-800">목표 달성일</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{weeklyAverage.toFixed(1)}h</div>
              <div className="text-sm text-green-800">일평균 사용</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{((achievedDays/7)*100).toFixed(0)}%</div>
              <div className="text-sm text-purple-800">달성률</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Usage Breakdown */}
      <Card className="bg-white/70 backdrop-blur-sm border-orange-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Clock className="w-5 h-5" />
            앱별 사용 시간 (오늘)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {appUsageData.map((app) => (
            <div key={app.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{app.name}</span>
                <span className="text-sm text-gray-600">{app.time}시간</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${app.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${(app.time / 3.2) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievement Badges */}
      <Card className="bg-white/70 backdrop-blur-sm border-orange-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            🏆 달성 뱃지
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Badge className="p-3 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border-orange-200">
              <div className="text-center w-full">
                <div className="text-lg mb-1">🥇</div>
                <div className="text-xs">첫 목표 달성</div>
              </div>
            </Badge>
            <Badge className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200">
              <div className="text-center w-full">
                <div className="text-lg mb-1">🔥</div>
                <div className="text-xs">3일 연속 달성</div>
              </div>
            </Badge>
            <Badge className="p-3 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200">
              <div className="text-center w-full">
                <div className="text-lg mb-1">📱</div>
                <div className="text-xs">디톡스 초보</div>
              </div>
            </Badge>
            <Badge className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
              <div className="text-center w-full">
                <div className="text-lg mb-1">🎯</div>
                <div className="text-xs">주간 목표 달성</div>
              </div>
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Trend Analysis */}
      <Card className="bg-white/70 backdrop-blur-sm border-orange-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            📈 사용 패턴 분석
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <TrendingDown className="w-6 h-6 text-green-600" />
            <div>
              <div className="font-medium text-green-800">좋은 개선!</div>
              <div className="text-sm text-green-700">지난주 대비 15% 사용량 감소</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Clock className="w-6 h-6 text-blue-600" />
            <div>
              <div className="font-medium text-blue-800">집중 시간 효과</div>
              <div className="text-sm text-blue-700">오후 2-6시 사용량이 50% 줄었어요</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-orange-600" />
            <div>
              <div className="font-medium text-orange-800">주의 필요</div>
              <div className="text-sm text-orange-700">주말 사용량이 평일보다 높아요</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPanel;
