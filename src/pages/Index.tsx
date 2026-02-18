import DashboardLayout from "@/components/DashboardLayout";
import StatusCard from "@/components/StatusCard";
import MetricsChart from "@/components/MetricsChart";
import IncidentTimeline from "@/components/IncidentTimeline";
import ServiceMap from "@/components/ServiceMap";
import DeploymentTracker from "@/components/DeploymentTracker";
import AuditLog from "@/components/AuditLog";
import { useSimulation } from "@/context/SimulationContext";
import {
  Activity, AlertTriangle, Bot, Clock, Server, Shield, TrendingDown, Zap
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">System Overview</h1>
          <p className="text-sm text-muted-foreground mt-0.5 font-mono">
            Last updated: <span className="text-primary">2s ago</span> • Processing {systemStats.eventsPerSec} events/sec
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-success/10 border border-success/20">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse-glow" />
            <span className="text-xs font-mono text-success">DEMO MODE</span>
          </div>
        </div>
      </div>

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
        <MetricsChart data={cpuMetrics} title="CPU Usage" color="hsl(185, 80%, 50%)" unit="%" />
        <MetricsChart data={memoryMetrics} title="Memory" color="hsl(210, 100%, 60%)" unit="%" />
        <MetricsChart data={latencyMetrics} title="P99 Latency" color="hsl(38, 95%, 55%)" unit="ms" />
        <MetricsChart data={errorRateMetrics} title="Error Rate" color="hsl(0, 85%, 55%)" unit="%" />
        <MetricsChart data={throughputMetrics} title="Throughput" color="hsl(145, 70%, 45%)" unit=" rps" />
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
