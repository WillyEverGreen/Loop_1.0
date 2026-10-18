import { Incident } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
  limit?: number;
  viewAll?: { to: string; label: string };
}

export default function IncidentTimeline({ incidents, limit, viewAll }: IncidentTimelineProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-primary" /> Incident Timeline</h3>
        <span className="text-xs font-mono text-muted-foreground">{incidents.length} events</span>
      </div>
      <div className={cn("space-y-2", !limit && "max-h-[400px] overflow-y-auto scrollbar-thin pr-1")}>
        {(limit ? incidents.slice(0, limit) : incidents).map((inc, i) => {
          const Icon = statusIcons[inc.status];
          return (
            <motion.div
              key={inc.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "flex items-start gap-3 p-3 rounded-xl bg-secondary/60 border-l-[3px] min-h-[68px] transition-colors hover:bg-secondary",
                severityStyles[inc.severity]
              )}
            >
              <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{inc.title}</p>
                  {inc.autoRemediated && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success font-mono flex-shrink-0">AUTO-FIX</span>
                  )}
                  {inc.status === "predicted" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-warning/10 text-warning font-mono flex-shrink-0 animate-pulse-glow">PREDICTED</span>
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
      {viewAll && (
        <Link to={viewAll.to} className="mt-auto pt-4 text-xs font-semibold text-primary hover:underline">
          {viewAll.label} →
        </Link>
      )}
    </div>
  );
}
