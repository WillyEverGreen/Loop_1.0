import DashboardLayout from "@/components/DashboardLayout";
import AuditLog from "@/components/AuditLog";

export default function AuditPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-foreground mb-6">Blockchain Audit Log</h1>
      <AuditLog />
    </DashboardLayout>
  );
}
