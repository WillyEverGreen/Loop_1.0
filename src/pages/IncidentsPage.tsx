import DashboardLayout from "@/components/DashboardLayout";
import IncidentTimeline from "@/components/IncidentTimeline";
import { useSimulation } from "@/context/SimulationContext";
import StatusCard from "@/components/StatusCard";
import { AlertTriangle, CheckCircle, Clock, Zap } from "lucide-react";

export default function IncidentsPage() {
  const { incidents, systemStats } = useSimulation();

  const active = incidents.filter(i => i.status === "active" || i.status === "investigating");
  const predicted = incidents.filter(i => i.status === "predicted");
  const resolved = incidents.filter(i => i.status === "resolved");

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-foreground mb-6">Incidents</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatusCard title="Active" value={active.length} icon={AlertTriangle} variant="danger" />
        <StatusCard title="Predicted" value={predicted.length} icon={Zap} variant="warning" />
        <StatusCard title="Resolved (24h)" value={resolved.length} icon={CheckCircle} variant="success" />
        <StatusCard title="Avg MTTR" value={`${systemStats.avgMTTR}m`} icon={Clock} variant="info" />
      </div>
      <IncidentTimeline incidents={incidents} />
    </DashboardLayout>
  );
}
