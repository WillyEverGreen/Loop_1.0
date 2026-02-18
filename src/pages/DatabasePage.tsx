import DashboardLayout from "@/components/DashboardLayout";
import { useSimulation } from "@/context/SimulationContext";
import { Database } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function DatabasePage() {
  const { databaseQueries: queries } = useSimulation();
  return (
    <DashboardLayout>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
          <Database className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Database Auto-Optimizer</h1>
          <p className="text-sm text-muted-foreground">AI-driven query analysis and index recommendations</p>
        </div>
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
