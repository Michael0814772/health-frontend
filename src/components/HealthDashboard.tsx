import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Activity, Moon, Footprints, Scale, Droplet } from "lucide-react";

// Default user health data
const healthData = {
  user: {
    name: "OFFORDILE, FRANCISCO CHUKWUKA (GROUP 16)",
    age: 32,
    lastUpdated: "2 minutes ago"
  },
  metrics: {
    heartRate: {
      current: 72,
      resting: 65,
      status: "normal",
      trend: "+2 from yesterday"
    },
    bloodPressure: {
      systolic: 118,
      diastolic: 76,
      status: "optimal",
      trend: "stable"
    },
    weight: {
      current: 142,
      target: 140,
      status: "good",
      trend: "-0.5 lbs this week"
    },
    steps: {
      current: 8420,
      goal: 10000,
      status: "good",
      progress: 84
    },
    sleep: {
      lastNight: 7.5,
      average: 7.2,
      status: "excellent",
      trend: "+0.3 hrs this week"
    },
    hydration: {
      current: 6,
      goal: 8,
      status: "needs attention",
      progress: 75
    }
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent":
    case "optimal":
    case "normal":
      return "success";
    case "good":
      return "primary";
    case "needs attention":
      return "warning";
    case "critical":
      return "destructive";
    default:
      return "secondary";
  }
};

const MetricCard = ({ 
  title, 
  icon: Icon, 
  value, 
  unit, 
  status, 
  trend, 
  progress 
}: {
  title: string;
  icon: any;
  value: string | number;
  unit?: string;
  status: string;
  trend?: string;
  progress?: number;
}) => (
  <Card className="bg-card shadow-sm border-border hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-card-foreground">
        {value}
        {unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
      </div>
      <div className="flex items-center justify-between mt-3">
        <Badge variant={getStatusColor(status) as any} className="text-xs">
          {status}
        </Badge>
        {trend && (
          <p className="text-xs text-muted-foreground">{trend}</p>
        )}
      </div>
      {progress !== undefined && (
        <div className="mt-3">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">{progress}% of goal</p>
        </div>
      )}
    </CardContent>
  </Card>
);

export default function HealthDashboard() {
  const { user, metrics } = healthData;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Health Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {user.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Last updated</p>
              <p className="text-sm font-medium text-foreground">{user.lastUpdated}</p>
            </div>
          </div>
        </div>

        {/* Overall Status */}
        <Card className="mb-8 bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-success/20 rounded-full">
                <Heart className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Overall Health Status</h3>
                <p className="text-success font-medium">Good - All vitals within normal ranges</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Keep up the great work! Consider increasing daily water intake.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Heart Rate"
            icon={Heart}
            value={metrics.heartRate.current}
            unit="bpm"
            status={metrics.heartRate.status}
            trend={metrics.heartRate.trend}
          />
          
          <MetricCard
            title="Blood Pressure"
            icon={Activity}
            value={`${metrics.bloodPressure.systolic}/${metrics.bloodPressure.diastolic}`}
            unit="mmHg"
            status={metrics.bloodPressure.status}
            trend={metrics.bloodPressure.trend}
          />
          
          <MetricCard
            title="Weight"
            icon={Scale}
            value={metrics.weight.current}
            unit="lbs"
            status={metrics.weight.status}
            trend={metrics.weight.trend}
          />
          
          <MetricCard
            title="Daily Steps"
            icon={Footprints}
            value={metrics.steps.current.toLocaleString()}
            status={metrics.steps.status}
            progress={metrics.steps.progress}
          />
          
          <MetricCard
            title="Sleep Duration"
            icon={Moon}
            value={metrics.sleep.lastNight}
            unit="hours"
            status={metrics.sleep.status}
            trend={metrics.sleep.trend}
          />
          
          <MetricCard
            title="Water Intake"
            icon={Droplet}
            value={metrics.hydration.current}
            unit="glasses"
            status={metrics.hydration.status}
            progress={metrics.hydration.progress}
          />
        </div>

        {/* Weekly Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Weekly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-success">Improvements</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Sleep quality increased by 15%</li>
                  <li>• Average heart rate improved</li>
                  <li>• Weight loss on track</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-warning">Areas to Focus</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Increase daily water intake</li>
                  <li>• Hit step goal more consistently</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Goals for Next Week</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Maintain current sleep schedule</li>
                  <li>• Increase daily steps by 500</li>
                  <li>• Drink 8 glasses of water daily</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}