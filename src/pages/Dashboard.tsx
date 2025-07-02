
import StatsPanel from "@/components/StatsPanel";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 w-full max-w-sm mx-auto pb-16">
      <div className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="px-3 py-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            대시보드
          </h1>
        </div>
      </div>
      
      <div className="px-3 py-4">
        <StatsPanel />
      </div>
    </div>
  );
};

export default Dashboard;
