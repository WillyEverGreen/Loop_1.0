import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import StatusCard from "@/components/StatusCard";
import { useSimulation } from "@/context/SimulationContext";
import { Shield, ShieldCheck, Bot, UserRound } from "lucide-react";
import AuditLog from "@/components/AuditLog";

export default function AuditPage() {
  const { auditEntries } = useSimulation();
  const byAi = auditEntries.filter((e) => e.actor.toLowerCase().includes("loop")).length;
  return (
    <DashboardLayout>
      <PageHeader icon={Shield} title="Audit Log" subtitle="Blockchain-verified record of every action Loop takes" kicker="Governance" tone="accent" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatusCard title="Total actions" value={auditEntries.length} icon={Shield} variant="default" />
        <StatusCard title="Verified" value={auditEntries.filter((e) => e.verified).length} icon={ShieldCheck} variant="success" />
        <StatusCard title="By Loop AI" value={byAi} icon={Bot} variant="info" />
        <StatusCard title="By humans" value={auditEntries.length - byAi} icon={UserRound} variant="warning" />
      </div>

      <AuditLog />
    </DashboardLayout>
  );
}
