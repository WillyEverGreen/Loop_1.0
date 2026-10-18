import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import StatusCard from "@/components/StatusCard";
import { useSimulation } from "@/context/SimulationContext";
import { GitBranch, Rocket, Loader2, CheckCircle, RotateCcw } from "lucide-react";
import DeploymentTracker from "@/components/DeploymentTracker";

export default function DeploymentsPage() {
  const { deployments } = useSimulation();
  const count = (st: string) => deployments.filter((d) => d.status === st).length;
  return (
    <DashboardLayout>
      <PageHeader icon={GitBranch} title="Deployments" subtitle="Canary, rolling and rolled-back releases across services" kicker="Delivery" tone="primary" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatusCard title="Total releases" value={deployments.length} icon={Rocket} variant="default" />
        <StatusCard title="In progress" value={count("rolling") + count("canary")} icon={Loader2} variant="info" />
        <StatusCard title="Completed" value={count("completed")} icon={CheckCircle} variant="success" />
        <StatusCard title="Rolled back" value={count("rolled-back")} icon={RotateCcw} variant="danger" />
      </div>

      <DeploymentTracker />
    </DashboardLayout>
  );
}
