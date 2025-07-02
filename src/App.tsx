
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Rewards from "./pages/Rewards";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import BottomNavigation from "./components/BottomNavigation";

const queryClient = new QueryClient();

const App = () => {
  const [dailyGoal, setDailyGoal] = useState(4);
  const [points, setPoints] = useState(150);
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const [consumableItems, setConsumableItems] = useState<{[key: string]: number}>({});
  const [dailyRewardsClaimed, setDailyRewardsClaimed] = useState<{[key: number]: Date | null}>({});

  const isGoalMet = true; // This would be calculated based on actual usage

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="relative">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route 
                path="/goals" 
                element={
                  <Goals 
                    dailyGoal={dailyGoal}
                    setDailyGoal={setDailyGoal}
                  />
                } 
              />
              <Route 
                path="/rewards" 
                element={
                  <Rewards 
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
                } 
              />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNavigation />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
