import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import StatusCard from "@/components/StatusCard";
import { useSimulation } from "@/context/SimulationContext";
import { ScrollText, AlertCircle, AlertTriangle, Info } from "lucide-react";
import DetailedLogList from "@/components/DetailedLogList";

export default function LogsPage() {
  const { detailedLogs } = useSimulation();
  const count = (l: string) => detailedLogs.filter((d) => d.level === l).length;
  return (
    <DashboardLayout>
      <PageHeader icon={ScrollText} title="System Logs" subtitle="Detailed stream of all system events, errors, and warnings" kicker="Monitor" tone="accent" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatusCard title="Total events" value={detailedLogs.length} icon={ScrollText} variant="default" />
        <StatusCard title="Errors" value={count("error")} icon={AlertCircle} variant="danger" />
        <StatusCard title="Warnings" value={count("warning")} icon={AlertTriangle} variant="warning" />
        <StatusCard title="Info" value={count("info")} icon={Info} variant="info" />
      </div>

      <DetailedLogList />
    </DashboardLayout>
  );
}
