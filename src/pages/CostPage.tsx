import DashboardLayout from "@/components/DashboardLayout";
import StatusCard from "@/components/StatusCard";
import { useSimulation } from "@/context/SimulationContext";
import { Cloud, TrendingDown, DollarSign, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CostPage() {
  const { costItems, systemStats } = useSimulation();
  const chartData = costItems.map(c => ({
    name: c.service.split("-").slice(0, 2).join("-"),
    current: c.currentCost,
    optimized: c.optimizedCost,
    savings: c.savings,
  }));
  const totalCurrent = costItems.reduce((a, b) => a + b.currentCost, 0);
  const totalSavings = costItems.reduce((a, b) => a + b.savings, 0);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-foreground mb-6">FinOps — Cloud Cost Optimization</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatusCard title="Monthly Spend" value={`$${(totalCurrent / 1000).toFixed(1)}K`} icon={DollarSign} variant="default" />
        <StatusCard title="Potential Savings" value={`$${(totalSavings / 1000).toFixed(1)}K`} icon={TrendingDown} variant="success" />
        <StatusCard title="Savings Rate" value={`${Math.round((totalSavings / totalCurrent) * 100)}%`} icon={Zap} variant="info" />
        <StatusCard title="Idle Resources" value="7" icon={Cloud} variant="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Cost Comparison by Service</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" tick={{ fill: "hsl(215 12% 50%)", fontSize: 10, fontFamily: "JetBrains Mono" }} />
              <YAxis type="category" dataKey="name" width={100} tick={{ fill: "hsl(210 20% 92%)", fontSize: 10, fontFamily: "JetBrains Mono" }} />
              <Tooltip
                contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 14% 16%)", borderRadius: "6px", color: "hsl(210 20% 92%)", fontSize: "12px", fontFamily: "JetBrains Mono" }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              />
              <Bar dataKey="current" fill="hsl(0 85% 55%)" radius={[0, 4, 4, 0]} name="Current" />
              <Bar dataKey="optimized" fill="hsl(145 70% 45%)" radius={[0, 4, 4, 0]} name="Optimized" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recommendations</h3>
          <div className="space-y-3">
            {costItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-md bg-secondary/30 border-l-2 border-l-success"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-mono font-medium text-foreground">{item.service}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.recommendation}</p>
                  </div>
                  <span className="text-sm font-mono text-success font-bold flex-shrink-0">-${item.savings.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
