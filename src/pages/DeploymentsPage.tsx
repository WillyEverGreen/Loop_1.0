import DashboardLayout from "@/components/DashboardLayout";
import DeploymentTracker from "@/components/DeploymentTracker";

export default function DeploymentsPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-foreground mb-6">Deployment Pipeline</h1>
      <DeploymentTracker />
    </DashboardLayout>
  );
}
