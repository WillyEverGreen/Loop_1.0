import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import StatusCard from "@/components/StatusCard";
import { useSimulation } from "@/context/SimulationContext";
import { Database, CheckCircle, Hourglass, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function DatabasePage() {
  const { databaseQueries: queries } = useSimulation();
  return (
    <DashboardLayout>
      <PageHeader icon={Database} title="DB Optimizer" subtitle="AI-driven query analysis and index recommendations" kicker="Data" tone="accent" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatusCard title="Queries analysed" value={queries.length} icon={Database} variant="default" />
        <StatusCard title="Indexes applied" value={queries.filter((q) => q.applied).length} icon={CheckCircle} variant="success" />
        <StatusCard title="Pending review" value={queries.filter((q) => !q.applied).length} icon={Hourglass} variant="warning" />
        <StatusCard title="Best speed-up" value={queries.map((q) => q.improvement).sort((a, b) => parseFloat(b) - parseFloat(a))[0] ?? "-"} icon={Gauge} variant="info" />
      </div>

      <div className="space-y-3">
        {queries.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-lg border border-border bg-card p-4"
          >
            <code className="text-xs font-mono text-primary block mb-3 bg-secondary/50 p-2 rounded">{q.query}</code>
            <div className="flex items-center gap-6 flex-wrap">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Before</p>
                <p className="text-sm font-mono text-destructive">{q.time}</p>
              </div>
              <span className="text-muted-foreground">→</span>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">After</p>
                <p className="text-sm font-mono text-success">{q.optimized}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Improvement</p>
                <p className="text-sm font-mono text-success">{q.improvement}</p>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-muted-foreground uppercase">Recommendation</p>
                <p className="text-xs text-foreground">{q.fix}</p>
              </div>
              <span className={cn(
                "text-[10px] font-mono px-2 py-0.5 rounded",
                q.applied ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
              )}>
                {q.applied ? "APPLIED" : "PENDING"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}
