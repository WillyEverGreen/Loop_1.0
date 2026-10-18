import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import { Shield } from "lucide-react";
import AuditLog from "@/components/AuditLog";

export default function AuditPage() {
  return (
    <DashboardLayout>
      <PageHeader icon={Shield} title="Audit Log" subtitle="Blockchain-verified record of every action Loop takes" kicker="Governance" tone="accent" />
      <AuditLog />
    </DashboardLayout>
  );
}
