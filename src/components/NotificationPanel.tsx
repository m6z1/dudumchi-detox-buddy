
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Bell, AlertTriangle, Info, CheckCircle, Clock } from "lucide-react";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState(true);
  const [reminderInterval, setReminderInterval] = useState([30]);
  const [warningThreshold, setWarningThreshold] = useState([80]);

  const recentNotifications = [
    {
      id: 1,
      type: 'warning',
      title: '사용 시간 주의!',
      message: '유튜브 사용 시간이 30분을 초과했습니다. 두둠치가 걱정하고 있어요!',
      time: '10분 전',
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      id: 2,
      type: 'achievement',
      title: '목표 달성!',
      message: '오늘 스마트폰 사용 목표를 달성했습니다! 🎉',
      time: '1시간 전',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'reminder',
      title: '집중 시간 시작',
      message: '집중 시간이 시작되었습니다. SNS 앱이 차단됩니다.',
      time: '2시간 전',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      id: 4,
      type: 'info',
      title: '두둠치가 배고파해요',
      message: '바나나를 주면 두둠치가 더 행복해할 것 같아요!',
      time: '3시간 전',
      icon: Info,
      color: 'text-purple-600'
    }
  ];

  const handleReminderChange = (value: number[]) => {
    setReminderInterval(value);
  };

  const handleWarningChange = (value: number[]) => {
    setWarningThreshold(value);
  };

  const clearNotifications = () => {
    // In a real app, this would clear the notifications
    console.log('Notifications cleared');
  };

  return (
    <div className="space-y-6">
      {/* Notification Settings */}
      <Card className="bg-white/70 backdrop-blur-sm border-orange-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Bell className="w-5 h-5" />
            알림 설정
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">푸시 알림 활성화</Label>
              <p className="text-sm text-gray-600">중요한 알림을 받아보세요</p>
            </div>
            <Switch 
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          {notifications && (
            <div className="space-y-6 p-4 bg-blue-50 rounded-lg">
              <div className="space-y-3">
                <Label className="font-medium">리마인더 간격</Label>
                <div className="px-3">
                  <Slider
                    value={reminderInterval}
                    onValueChange={handleReminderChange}
                    max={120}
                    min={15}
                    step={15}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>15분</span>
                  <span className="font-medium text-blue-600">{reminderInterval[0]}분 간격</span>
                  <span>2시간</span>
                </div>
                <p className="text-xs text-blue-700">
                  설정한 간격마다 사용 시간을 체크하고 알려드려요
                </p>
              </div>

              <div className="space-y-3">
                <Label className="font-medium">경고 임계점</Label>
                <div className="px-3">
                  <Slider
                    value={warningThreshold}
                    onValueChange={handleWarningChange}
                    max={100}
                    min={50}
                    step={10}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>50%</span>
                  <span className="font-medium text-orange-600">{warningThreshold[0]}%</span>
                  <span>100%</span>
                </div>
                <p className="text-xs text-orange-700">
                  일일 목표의 {warningThreshold[0]}%에 도달하면 경고 알림을 보내드려요
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card className="bg-white/70 backdrop-blur-sm border-orange-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Bell className="w-5 h-5" />
            최근 알림
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearNotifications}
            className="text-gray-600"
          >
            모두 지우기
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentNotifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div 
                key={notification.id}
                className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`mt-0.5 ${notification.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-800 truncate">
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {notification.message}
                  </p>
                  <div className="mt-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        notification.type === 'warning' ? 'border-orange-200 text-orange-700' :
                        notification.type === 'achievement' ? 'border-green-200 text-green-700' :
                        notification.type === 'reminder' ? 'border-blue-200 text-blue-700' :
                        'border-purple-200 text-purple-700'
                      }`}
                    >
                      {notification.type === 'warning' ? '경고' :
                       notification.type === 'achievement' ? '달성' :
                       notification.type === 'reminder' ? '리마인더' :
                       '정보'}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Notification Types */}
      <Card className="bg-white/70 backdrop-blur-sm border-orange-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            🔔 알림 종류
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-800">사용량 경고</span>
              </div>
              <p className="text-sm text-orange-700">
                설정한 임계점에 도달하면 알림을 보내드려요
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">목표 달성</span>
              </div>
              <p className="text-sm text-green-700">
                일일 목표를 달성하면 축하 메시지를 보내요
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">집중 시간</span>
              </div>
              <p className="text-sm text-blue-700">
                집중 시간 시작/종료를 알려드려요
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-800">두둠치 케어</span>
              </div>
              <p className="text-sm text-purple-700">
                두둠치의 상태 변화를 알려드려요
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationPanel;
