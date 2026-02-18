import { useSimulation } from "@/context/SimulationContext";
import { Shield, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AuditLog() {
  const { auditEntries } = useSimulation();
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" /> Audit Log
        </h3>
        <span className="text-[10px] font-mono text-success flex items-center gap-1">
          <CheckCircle className="h-3 w-3" /> Blockchain verified
        </span>
      </div>
      <div className="space-y-2">
        {auditEntries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-start gap-3 p-2 rounded-md bg-secondary/30"
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground">{entry.action}</p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-[10px] font-mono text-primary">{entry.actor}</span>
                <span className="text-[10px] text-muted-foreground">→</span>
                <span className="text-[10px] font-mono text-muted-foreground">{entry.target}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[10px] text-muted-foreground">{entry.timestamp}</p>
              <p className="text-[10px] font-mono text-success/70">{entry.hash}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
