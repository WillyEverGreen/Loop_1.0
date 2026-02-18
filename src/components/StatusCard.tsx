import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatusCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

const variantStyles = {
  default: "border-border",
  success: "border-success/30 glow-success",
  warning: "border-warning/30",
  danger: "border-destructive/30 glow-danger",
  info: "border-info/30 glow-primary",
};

const iconVariants = {
  default: "text-muted-foreground",
  success: "text-success",
  warning: "text-warning",
  danger: "text-destructive",
  info: "text-info",
};

export default function StatusCard({ title, value, subtitle, icon: Icon, trend, trendValue, variant = "default" }: StatusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-lg border bg-card p-4 transition-all hover:border-primary/20", variantStyles[variant])}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider truncate">{title}</p>
          <p className="text-xl font-bold font-mono text-foreground truncate">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={cn("p-2 rounded-md bg-secondary", iconVariants[variant])}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      {trend && trendValue && (
        <div className="mt-2 flex items-center gap-1">
          <span className={cn("text-xs font-mono font-medium", trend === "down" ? "text-success" : trend === "up" ? "text-destructive" : "text-muted-foreground")}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
          </span>
        </div>
      )}
    </motion.div>
  );
}
