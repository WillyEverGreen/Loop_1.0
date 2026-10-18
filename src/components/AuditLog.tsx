import { useSimulation } from "@/context/SimulationContext";
import { Shield, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface AuditLogProps {
  limit?: number;
  viewAll?: { to: string; label: string };
}

export default function AuditLog({ limit, viewAll }: AuditLogProps = {}) {
  const { auditEntries } = useSimulation();
  return (
    <div className="rounded-lg border border-border bg-card p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" /> Audit Log
        </h3>
        <span className="text-xs font-mono text-success flex items-center gap-1">
          <CheckCircle className="h-3 w-3" /> Blockchain verified
        </span>
      </div>
      <div className="space-y-2">
        {(limit ? auditEntries.slice(0, limit) : auditEntries).map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-secondary/60 min-h-[68px] transition-colors hover:bg-secondary"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{entry.action}</p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-xs font-mono text-primary">{entry.actor}</span>
                <span className="text-xs text-muted-foreground">→</span>
                <span className="text-xs font-mono text-muted-foreground">{entry.target}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-muted-foreground">{entry.timestamp}</p>
              <p className="text-xs font-mono text-success/70">{entry.hash}</p>
            </div>
          </motion.div>
        ))}
      </div>
      {viewAll && (
        <Link to={viewAll.to} className="mt-auto pt-4 text-xs font-semibold text-primary hover:underline">
          {viewAll.label} →
        </Link>
      )}
    </div>
  );
}
