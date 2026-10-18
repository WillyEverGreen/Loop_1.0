import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import { GitBranch } from "lucide-react";
import DeploymentTracker from "@/components/DeploymentTracker";

export default function DeploymentsPage() {
  return (
    <DashboardLayout>
      <PageHeader icon={GitBranch} title="Deployments" subtitle="Canary, rolling and rolled-back releases across services" kicker="Delivery" tone="primary" />
      <DeploymentTracker />
    </DashboardLayout>
  );
}
