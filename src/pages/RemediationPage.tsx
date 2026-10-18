import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import StatusCard from "@/components/StatusCard";
import { Wrench, CheckCheck, Hourglass, Play } from "lucide-react";
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
      <PageHeader icon={Bot} title="Autonomous Remediation" subtitle="AI-driven auto-fix engine • 83% success rate • All actions reversible" kicker="Act" tone="primary" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatusCard title="Actions" value={remediations.length} icon={Wrench} variant="default" />
        <StatusCard title="Completed" value={remediations.filter((r) => r.status === "completed").length} icon={CheckCheck} variant="success" />
        <StatusCard title="Executing" value={remediations.filter((r) => r.status === "executing").length} icon={Play} variant="info" />
        <StatusCard title="Ready to run" value={remediations.filter((r) => r.status === "ready").length} icon={Hourglass} variant="warning" />
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
