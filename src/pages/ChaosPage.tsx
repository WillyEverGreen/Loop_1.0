import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import StatusCard from "@/components/StatusCard";
import { useSimulation } from "@/context/SimulationContext";
import { FlaskConical, CheckCircle, Loader2, Clock, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const statusIcons = { running: Loader2, completed: CheckCircle, scheduled: Clock };

export default function ChaosPage() {
  const { chaosExperiments } = useSimulation();
  return (
    <DashboardLayout>
      <PageHeader icon={FlaskConical} title="Chaos Engineering" subtitle="Continuous resilience testing • Automated failure injection" kicker="Resilience" tone="warning" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatusCard title="Experiments" value={chaosExperiments.length} icon={FlaskConical} variant="default" />
        <StatusCard title="Running" value={chaosExperiments.filter((e) => e.status === "running").length} icon={Loader2} variant="info" />
        <StatusCard title="Completed" value={chaosExperiments.filter((e) => e.status === "completed").length} icon={CheckCircle} variant="success" />
        <StatusCard title="Avg resilience" value={`${Math.round(chaosExperiments.filter((e) => e.resilience > 0).reduce((a, e) => a + e.resilience, 0) / Math.max(1, chaosExperiments.filter((e) => e.resilience > 0).length))}%`} icon={Gauge} variant="warning" />
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
