import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
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
      <PageHeader icon={AlertTriangle} title="Incidents" subtitle="Active, predicted and resolved incidents across your services" kicker="Monitor" tone="danger" />
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
