import { useSimulation } from "@/context/SimulationContext";
import { cn } from "@/lib/utils";
import { GitBranch, CheckCircle, RotateCcw, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const statusIcon = {
  rolling: Loader2,
  canary: Loader2,
  completed: CheckCircle,
  "rolled-back": RotateCcw,
};

const statusText = {
  rolling: "text-info",
  canary: "text-warning",
  completed: "text-success",
  "rolled-back": "text-destructive",
};

export default function DeploymentTracker() {
  const { deployments } = useSimulation();
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-primary" /> Active Deployments
        </h3>
      </div>
      <div className="space-y-3">
        {deployments.map((dep, i) => {
          const Icon = statusIcon[dep.status];
          return (
            <motion.div
              key={dep.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-2 rounded-md bg-secondary/30"
            >
              <Icon className={cn("h-4 w-4 flex-shrink-0", statusText[dep.status], (dep.status === "rolling" || dep.status === "canary") && "animate-spin")} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-foreground">{dep.service}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">{dep.version}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", dep.status === "rolled-back" ? "bg-destructive" : "bg-primary")}
                      style={{ width: `${dep.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">{dep.progress}%</span>
                </div>
              </div>
              <div className="text-right">
                <span className={cn("text-[10px] font-mono uppercase", statusText[dep.status])}>{dep.status}</span>
                <p className="text-[10px] text-muted-foreground">Health: {dep.healthScore}%</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
