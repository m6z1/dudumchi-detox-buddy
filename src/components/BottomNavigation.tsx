
import { Button } from "@/components/ui/button";
import { Home, Target, BarChart3, Gift, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-100 shadow-lg">
      <div className="flex justify-around items-center py-2 max-w-sm mx-auto">
        <Link to="/">
          <Button variant="ghost" className={`flex flex-col items-center gap-1 h-12 ${
            isActive('/') ? 'text-orange-600' : 'text-gray-600'
          }`}>
            <Home className="w-5 h-5" />
            <span className="text-xs">홈</span>
          </Button>
        </Link>

        <Link to="/dashboard">
          <Button variant="ghost" className={`flex flex-col items-center gap-1 h-12 ${
            isActive('/dashboard') ? 'text-orange-600' : 'text-gray-600'
          }`}>
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">대시보드</span>
          </Button>
        </Link>

        <Link to="/goals">
          <Button variant="ghost" className={`flex flex-col items-center gap-1 h-12 ${
            isActive('/goals') ? 'text-orange-600' : 'text-gray-600'
          }`}>
            <Target className="w-5 h-5" />
            <span className="text-xs">목표설정</span>
          </Button>
        </Link>

        <Link to="/rewards">
          <Button variant="ghost" className={`flex flex-col items-center gap-1 h-12 ${
            isActive('/rewards') ? 'text-orange-600' : 'text-gray-600'
          }`}>
            <Gift className="w-5 h-5" />
            <span className="text-xs">리워드</span>
          </Button>
        </Link>

        <Link to="/notifications">
          <Button variant="ghost" className={`flex flex-col items-center gap-1 h-12 ${
            isActive('/notifications') ? 'text-orange-600' : 'text-gray-600'
          }`}>
            <Bell className="w-5 h-5" />
            <span className="text-xs">알림</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
