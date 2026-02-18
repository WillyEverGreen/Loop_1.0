import DashboardLayout from "@/components/DashboardLayout";
import { useSimulation } from "@/context/SimulationContext";
import { cn } from "@/lib/utils";
import { Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function PredictionsPage() {
  const { services } = useSimulation();
  const atRisk = services.filter(s => s.riskScore > 40).sort((a, b) => b.riskScore - a.riskScore);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-foreground mb-2">AI Failure Predictions</h1>
      <p className="text-sm text-muted-foreground mb-6">ML-powered predictions across metrics, logs, and traces. 85%+ accuracy, {"<"}5% false positives.</p>

      <div className="space-y-3">
        {atRisk.map((svc, i) => (
          <motion.div
            key={svc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "rounded-lg border p-4",
              svc.riskScore > 80 ? "border-destructive/30 glow-danger" : "border-warning/30"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center",
                  svc.riskScore > 80 ? "gradient-danger" : "gradient-warning"
                )}>
                  <Zap className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm font-mono font-semibold text-foreground">{svc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {svc.predictedFailure ? `Failure predicted in ${svc.predictedFailure}` : "Elevated risk detected"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 text-destructive" />
                  <span className={cn(
                    "text-xl font-mono font-bold",
                    svc.riskScore > 80 ? "text-destructive" : "text-warning"
                  )}>
                    {svc.riskScore}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">Risk Score</p>
                {svc.confidence && (
                  <p className="text-[10px] font-mono text-primary">{svc.confidence}% confidence</p>
                )}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-4">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">CPU</p>
                <p className="text-xs font-mono text-foreground">{svc.cpu}%</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Memory</p>
                <p className="text-xs font-mono text-foreground">{svc.memory}%</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Latency</p>
                <p className="text-xs font-mono text-foreground">{svc.latency}ms</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Error Rate</p>
                <p className="text-xs font-mono text-foreground">{svc.errorRate}%</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}
