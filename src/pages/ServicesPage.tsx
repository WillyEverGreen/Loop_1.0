import DashboardLayout from "@/components/DashboardLayout";
import ServiceMap from "@/components/ServiceMap";
import { useSimulation } from "@/context/SimulationContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Service } from "@/data/mockData";

export default function ServicesPage() {
  const { services } = useSimulation();

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-foreground mb-6">Services</h1>
      <ServiceMap services={services} />

      <div className="mt-6 rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              {["Service", "Status", "Uptime", "Latency", "Error Rate", "CPU", "Memory", "Risk Score"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map((svc, i) => (
              <motion.tr
                key={svc.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-foreground">{svc.name}</td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "text-[10px] font-mono px-2 py-0.5 rounded-full uppercase",
                    svc.status === "healthy" && "bg-success/10 text-success",
                    svc.status === "warning" && "bg-warning/10 text-warning",
                    svc.status === "critical" && "bg-destructive/10 text-destructive",
                    svc.status === "degraded" && "bg-warning/10 text-warning",
                  )}>
                    {svc.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-foreground">{svc.uptime}%</td>
                <td className="px-4 py-3 font-mono text-xs text-foreground">{svc.latency}ms</td>
                <td className="px-4 py-3 font-mono text-xs text-foreground">{svc.errorRate}%</td>
                <td className="px-4 py-3 font-mono text-xs text-foreground">{svc.cpu}%</td>
                <td className="px-4 py-3 font-mono text-xs text-foreground">{svc.memory}%</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden max-w-16">
                      <div
                        className={cn("h-full rounded-full", svc.riskScore > 70 ? "bg-destructive" : svc.riskScore > 40 ? "bg-warning" : "bg-success")}
                        style={{ width: `${svc.riskScore}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{svc.riskScore}</span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
