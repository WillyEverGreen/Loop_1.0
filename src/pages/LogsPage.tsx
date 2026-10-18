import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import { ScrollText } from "lucide-react";
import DetailedLogList from "@/components/DetailedLogList";

export default function LogsPage() {
  return (
    <DashboardLayout>
      <PageHeader icon={ScrollText} title="System Logs" subtitle="Detailed stream of all system events, errors, and warnings" kicker="Monitor" tone="accent" />
      <DetailedLogList />
    </DashboardLayout>
  );
}
