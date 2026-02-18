import DashboardLayout from "@/components/DashboardLayout";
import { useSimulation } from "@/context/SimulationContext";
import { FlaskConical, CheckCircle, Loader2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const statusIcons = { running: Loader2, completed: CheckCircle, scheduled: Clock };

export default function ChaosPage() {
  const { chaosExperiments } = useSimulation();
  return (
    <DashboardLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg gradient-warning flex items-center justify-center">
          <FlaskConical className="h-5 w-5 text-warning-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Chaos Engineering</h1>
          <p className="text-sm text-muted-foreground">Continuous resilience testing • Automated failure injection</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chaosExperiments.map((exp, i) => {
          const Icon = statusIcons[exp.status];
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className={cn("h-4 w-4", exp.status === "running" ? "text-warning animate-spin" : exp.status === "completed" ? "text-success" : "text-muted-foreground")} />
                  <h3 className="text-sm font-semibold text-foreground">{exp.name}</h3>
                </div>
                <span className="text-[10px] font-mono uppercase text-muted-foreground bg-secondary px-2 py-0.5 rounded">{exp.type}</span>
              </div>
              <p className="text-xs font-mono text-primary mb-3">Target: {exp.target}</p>
              {exp.status !== "scheduled" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Resilience Score</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                        <div className={cn("h-full rounded-full", exp.resilience > 80 ? "bg-success" : exp.resilience > 60 ? "bg-warning" : "bg-destructive")} style={{ width: `${exp.resilience}%` }} />
                      </div>
                      <span className="text-xs font-mono text-foreground">{exp.resilience}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Recovery Time</p>
                    <p className="text-sm font-mono text-foreground mt-1">{exp.recoveryTime}s</p>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
