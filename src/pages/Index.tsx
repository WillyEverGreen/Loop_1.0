import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import StatusCard from "@/components/StatusCard";
import MetricsChart from "@/components/MetricsChart";
import IncidentTimeline from "@/components/IncidentTimeline";
import ServiceMap from "@/components/ServiceMap";
import DeploymentTracker from "@/components/DeploymentTracker";
import AuditLog from "@/components/AuditLog";
import { useSimulation } from "@/context/SimulationContext";
import {
  Activity, AlertTriangle, Bot, Clock, Home, Server, Shield, TrendingDown, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import DetailedLogList from "@/components/DetailedLogList";

export default function Index() {
  const { 
    systemStats, services, incidents, 
    cpuMetrics, memoryMetrics, latencyMetrics, errorRateMetrics, throughputMetrics 
  } = useSimulation();

  return (
    <DashboardLayout>
      <PageHeader
        icon={Home}
        title="System Overview"
        kicker="Dashboard"
        subtitle={<>Last updated <span className="font-medium text-primary">2s ago</span> • Processing {systemStats.eventsPerSec} events/sec</>}
      >
        <div className="flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
          <span className="text-xs font-semibold uppercase tracking-wider text-success">Demo mode</span>
        </div>
      </PageHeader>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6"
      >
        <StatusCard title="Services" value={`${systemStats.healthyServices}/${systemStats.totalServices}`} icon={Server} variant="success" subtitle="Healthy" />
        <StatusCard title="Active Incidents" value={systemStats.activeIncidents} icon={AlertTriangle} variant="danger" />
        <StatusCard title="Predicted" value={systemStats.predictedFailures} icon={Zap} variant="warning" subtitle="Next 60min" />
        <StatusCard title="Avg MTTR" value={`${systemStats.avgMTTR}m`} icon={Clock} variant="info" trend="down" trendValue="73% vs baseline" />
        <StatusCard title="Auto-Fix Rate" value={`${systemStats.autoRemediationRate}%`} icon={Bot} variant="success" trend="up" trendValue="+5% this week" />
        <StatusCard title="False Positive" value={`${systemStats.falsePositiveRate}%`} icon={Shield} variant="success" />
        <StatusCard title="Uptime" value={`${systemStats.uptime}%`} icon={Activity} variant="success" />
        <StatusCard title="Cost Saved" value={`$${(systemStats.totalCostSavings / 1000).toFixed(0)}K`} icon={TrendingDown} variant="info" subtitle="/month" />
      </motion.div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        <MetricsChart data={cpuMetrics} title="CPU Usage" color="hsl(220, 83%, 65%)" unit="%" />
        <MetricsChart data={memoryMetrics} title="Memory" color="hsl(260, 70%, 70%)" unit="%" />
        <MetricsChart data={latencyMetrics} title="P99 Latency" color="hsl(38, 85%, 52%)" unit="ms" />
        <MetricsChart data={errorRateMetrics} title="Error Rate" color="hsl(347, 80%, 67%)" unit="%" />
        <MetricsChart data={throughputMetrics} title="Throughput" color="hsl(160, 56%, 42%)" unit=" rps" />
      </div>

      {/* Service Map */}
      <div className="mb-6">
        <ServiceMap services={services} />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <IncidentTimeline incidents={incidents} />
        </div>
        <div className="lg:col-span-1">
          <DeploymentTracker />
        </div>
        <div className="lg:col-span-1">
          <AuditLog />
        </div>
      </div>

      {/* Detailed Logs */}
      <div className="mt-6">
        <DetailedLogList />
      </div>
    </DashboardLayout>
  );
}
