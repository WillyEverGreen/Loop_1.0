import { Service } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const statusColors = {
  healthy: "bg-success",
  warning: "bg-warning",
  critical: "bg-destructive",
  degraded: "bg-warning",
};

const statusBg = {
  healthy: "bg-success/5 border-success/20",
  warning: "bg-warning/5 border-warning/20",
  critical: "bg-destructive/5 border-destructive/20",
  degraded: "bg-warning/5 border-warning/20",
};

interface ServiceMapProps {
  services: Service[];
}

export default function ServiceMap({ services }: ServiceMapProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Service Health Map</h3>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success" /> Healthy</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warning" /> Warning</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-destructive" /> Critical</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {services.map((svc, i) => (
          <motion.div
            key={svc.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className={cn(
              "relative rounded-md border p-3 cursor-pointer hover:border-primary/30 transition-all",
              statusBg[svc.status]
            )}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span className={cn("h-2 w-2 rounded-full flex-shrink-0", statusColors[svc.status], svc.status === "critical" && "animate-pulse-glow")} />
              <span className="text-xs font-mono font-medium text-foreground truncate">{svc.name}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-muted-foreground">CPU</span>
                <span className="font-mono text-foreground">{svc.cpu}%</span>
              </div>
              <div className="h-1 rounded-full bg-secondary overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all", svc.cpu > 80 ? "bg-destructive" : svc.cpu > 60 ? "bg-warning" : "bg-success")}
                  style={{ width: `${svc.cpu}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-muted-foreground">Latency</span>
                <span className="font-mono text-foreground">{svc.latency}ms</span>
              </div>
            </div>
            {svc.riskScore > 50 && (
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full gradient-danger flex items-center justify-center">
                <span className="text-[8px] font-mono font-bold text-destructive-foreground">{svc.riskScore}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
