import DashboardLayout from "@/components/DashboardLayout";
import DetailedLogList from "@/components/DetailedLogList";

export default function LogsPage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">System Logs</h1>
        <p className="text-sm text-muted-foreground mt-0.5 font-mono">
          Detailed stream of all system events, errors, and warnings.
        </p>
      </div>
      <DetailedLogList />
    </DashboardLayout>
  );
}
