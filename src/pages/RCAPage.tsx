import DashboardLayout from "@/components/DashboardLayout";
import { useSimulation } from "@/context/SimulationContext";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const typeColor = {
  deploy: "text-info border-info/30",
  metric: "text-warning border-warning/30",
  alert: "text-destructive border-destructive/30",
  trace: "text-primary border-primary/30",
  incident: "text-destructive border-destructive/50",
};

export default function RCAPage() {
  const { rcaData } = useSimulation();
  return (
    <DashboardLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg gradient-danger flex items-center justify-center">
          <Activity className="h-5 w-5 text-destructive-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Root Cause Analysis</h1>
          <p className="text-sm text-muted-foreground">AI-correlated logs, metrics, and traces</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Timeline */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Correlation Timeline: {rcaData.incident}</h3>
          <div className="relative pl-6 space-y-4">
            <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />
            {rcaData.timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                <div className={cn("absolute -left-[18px] top-1 h-2.5 w-2.5 rounded-full border-2 bg-card", typeColor[item.type as keyof typeof typeColor])} />
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-mono text-muted-foreground w-16 flex-shrink-0">{item.time}</span>
                  <p className="text-sm text-foreground">{item.event}</p>
                  <span className={cn("text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border", typeColor[item.type as keyof typeof typeColor])}>
                    {item.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Analysis */}
        <div className="space-y-4">
          <div className="rounded-lg border border-destructive/20 bg-card p-4">
            <h3 className="text-xs font-semibold text-destructive uppercase tracking-wider mb-2">Root Cause</h3>
            <p className="text-sm text-foreground">{rcaData.rootCause}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Affected Services</h3>
            <div className="flex flex-wrap gap-1.5">
              {rcaData.affectedServices.map(s => (
                <span key={s} className="text-xs font-mono px-2 py-1 rounded bg-secondary text-foreground">{s}</span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-success/20 bg-card p-4">
            <h3 className="text-xs font-semibold text-success uppercase tracking-wider mb-2">Recommendation</h3>
            <p className="text-sm text-foreground">{rcaData.recommendation}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
