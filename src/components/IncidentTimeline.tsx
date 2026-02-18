import { Incident } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";

const severityStyles = {
  critical: "border-l-destructive text-destructive",
  high: "border-l-warning text-warning",
  medium: "border-l-info text-info",
  low: "border-l-muted-foreground text-muted-foreground",
};

const statusIcons = {
  active: AlertTriangle,
  investigating: Clock,
  resolved: CheckCircle,
  predicted: Zap,
};

interface IncidentTimelineProps {
  incidents: Incident[];
}

export default function IncidentTimeline({ incidents }: IncidentTimelineProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Incident Timeline</h3>
        <span className="text-xs font-mono text-muted-foreground">{incidents.length} events</span>
      </div>
      <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin pr-1">
        {incidents.map((inc, i) => {
          const Icon = statusIcons[inc.status];
          return (
            <motion.div
              key={inc.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "flex items-start gap-3 p-3 rounded-md bg-secondary/50 border-l-2",
                severityStyles[inc.severity]
              )}
            >
              <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{inc.title}</p>
                  {inc.autoRemediated && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-success/10 text-success font-mono flex-shrink-0">AUTO-FIX</span>
                  )}
                  {inc.status === "predicted" && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-warning/10 text-warning font-mono flex-shrink-0 animate-pulse-glow">PREDICTED</span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono text-muted-foreground">{inc.service}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{inc.startedAt}</span>
                  {inc.mttr && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs font-mono text-success">MTTR: {inc.mttr}min</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
