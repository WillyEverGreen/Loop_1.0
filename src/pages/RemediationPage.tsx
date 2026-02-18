import DashboardLayout from "@/components/DashboardLayout";
import { useSimulation } from "@/context/SimulationContext";
import { Bot, CheckCircle, RotateCcw, ArrowUpCircle, RefreshCw, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const typeIcons = { restart: RefreshCw, scale: ArrowUpCircle, reroute: GitBranch, rollback: RotateCcw };
const statusStyles = {
  executing: "text-warning bg-warning/10 border-warning/20",
  completed: "text-success bg-success/10 border-success/20",
  ready: "text-info bg-info/10 border-info/20",
};

export default function RemediationPage() {
  const { remediations } = useSimulation();
  return (
    <DashboardLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Autonomous Remediation</h1>
          <p className="text-sm text-muted-foreground">AI-driven auto-fix engine • 83% success rate • All actions reversible</p>
        </div>
      </div>

      <div className="space-y-3">
        {remediations.map((r, i) => {
          const Icon = typeIcons[r.type as keyof typeof typeIcons] || RefreshCw;
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-start gap-4">
                <div className={cn("p-2 rounded-md border", statusStyles[r.status as keyof typeof statusStyles])}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{r.action}</p>
                    <span className={cn("text-[10px] font-mono px-1.5 py-0.5 rounded uppercase", statusStyles[r.status as keyof typeof statusStyles])}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-primary mt-0.5">{r.target}</p>
                  <p className="text-xs text-muted-foreground mt-1">{r.reason}</p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{r.time}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
