import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  services as initialServices,
  incidents as initialIncidents,
  cpuMetrics as initialCpu,
  memoryMetrics as initialMemory,
  latencyMetrics as initialLatency,
  errorRateMetrics as initialError,
  throughputMetrics as initialThroughput,
  deployments as initialDeployments,
  auditEntries as initialAudit,
  chaosExperiments as initialChaos,
  costItems as initialCostItems,
  detailedLogs as initialLogs,
  remediations as initialRemediations,
  rcaData as initialRca,
  databaseQueries as initialDbQueries,
  Service, Incident, MetricDataPoint, Deployment, AuditEntry, ChaosExperiment, DetailedLog, CostItem, Remediation, RcaData, DatabaseQuery
} from "@/data/mockData";

// Define the shape of our Context
interface SimulationContextType {
  services: Service[];
  incidents: Incident[];
  cpuMetrics: MetricDataPoint[];
  memoryMetrics: MetricDataPoint[];
  latencyMetrics: MetricDataPoint[];
  errorRateMetrics: MetricDataPoint[];
  throughputMetrics: MetricDataPoint[];
  deployments: Deployment[];
  auditEntries: AuditEntry[];
  chaosExperiments: ChaosExperiment[];
  costItems: CostItem[];
  detailedLogs: DetailedLog[];
  remediations: Remediation[];
  rcaData: RcaData;
  databaseQueries: DatabaseQuery[];
  systemStats: any; // We might need to recalculate this based on state
  activateLog: (log: DetailedLog) => void;
  resetSimulation: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [cpuMetrics, setCpuMetrics] = useState<MetricDataPoint[]>(initialCpu);
  const [memoryMetrics, setMemoryMetrics] = useState<MetricDataPoint[]>(initialMemory);
  const [latencyMetrics, setLatencyMetrics] = useState<MetricDataPoint[]>(initialLatency);
  const [errorRateMetrics, setErrorRateMetrics] = useState<MetricDataPoint[]>(initialError);
  const [throughputMetrics, setThroughputMetrics] = useState<MetricDataPoint[]>(initialThroughput);
  const [deployments, setDeployments] = useState<Deployment[]>(initialDeployments);
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>(initialAudit);
  const [chaosExperiments, setChaosExperiments] = useState<ChaosExperiment[]>(initialChaos);
  const [costItems, setCostItems] = useState<CostItem[]>(initialCostItems);
  const [detailedLogs, setDetailedLogs] = useState<DetailedLog[]>(initialLogs);
  const [remediations, setRemediations] = useState<Remediation[]>(initialRemediations);
  const [rcaData, setRcaData] = useState<RcaData>(initialRca);
  const [databaseQueries, setDatabaseQueries] = useState<DatabaseQuery[]>(initialDbQueries);

  // Helper to generate a spike in metrics
  const triggerSpike = (currentMetrics: MetricDataPoint[], magnitude: number) => {
    return currentMetrics.map((m, i) => {
      // Spike the last 10 minutes
      if (i > currentMetrics.length - 10) {
        return { ...m, value: m.value + magnitude * Math.random() };
      }
      return m;
    });
  };

  const activateLog = (log: DetailedLog) => {
    console.log("Activating Scenario for Log:", log.id);

    // Reset to baseline before applying new scenario to ensure clean state
    // resetSimulation(); // Optional: decided to keep cumulative effect or reset? Let's cumulative for now, or maybe manual reset is better.
    // User requested "proper and fixed info", so maybe a hard set is better than cumulative to avoid mess. 
    // Let's do a partial reset of the specific affected components first to ensure clean "story".

    const timestamp = new Date().toISOString();

    if (log.id === "log-101") { // SCENARIO: Critical Payment Failure
      // 1. Services
      setServices(prev => prev.map(s => {
        if (s.id === "svc-2") return { ...s, status: "critical", errorRate: 15.5, latency: 450, riskScore: 98 }; // Payment
        if (s.id === "svc-1") return { ...s, status: "warning", errorRate: 2.1 }; // API Gateway affected
        return s;
      }));

      // 2. Incident
      setIncidents(prev => [
        { 
          id: `inc-${Date.now()}`, 
          title: "Payment Gateway Latency Spike", 
          severity: "critical", 
          status: "active", 
          service: "payment-service", 
          startedAt: "Just now", 
          autoRemediated: false,
          rootCause: "3rd Party API Timeout" 
        }, 
        ...prev
      ]);

      // 3. Metrics
      setErrorRateMetrics(prev => triggerSpike(prev, 25)); // Huge error spike

      // 4. Remediation
      setRemediations(prev => [{
        id: Date.now(),
        action: "Reroute to Backup Gateway",
        target: "payment-service",
        status: "executing",
        type: "reroute",
        time: "Just now",
        reason: "Primary gateway unresponsive (504 Gateway Timeout)"
      }, ...prev]);

      // 5. RCA
      setRcaData({
        incident: "Payment Service Outcome Failure",
        service: "payment-service",
        timeline: [
          { time: "T-2min", event: "Gateway response time > 5000ms", type: "metric" },
          { time: "T-1min", event: "Circuit breaker status: OPEN", type: "alert" },
          { time: "T-0", event: "Transaction failures detected", type: "incident" }
        ],
        rootCause: "Upstream provider 'Stripe' experiencing regional outage in us-east-1.",
        affectedServices: ["payment-service", "checkout-frontend", "order-service"],
        recommendation: "Failover to PayPal/Square for 100% of traffic until recovery."
      });
    } 
    else if (log.id === "log-102") { // SCENARIO: High Latency (API Gateway)
      // 1. Services
      setServices(prev => prev.map(s => {
        if (s.id === "svc-1") return { ...s, status: "warning", latency: 850, riskScore: 75 }; // API Gateway
        if (s.id === "svc-6") return { ...s, status: "degraded", latency: 400 }; // Search Service
        return s;
      }));

      // 2. Incident
      setIncidents(prev => [
        { 
          id: `inc-${Date.now()}`, 
          title: "High Latency on Search API", 
          severity: "high", 
          status: "investigating", 
          service: "api-gateway", 
          startedAt: "Just now", 
          autoRemediated: false,
          rootCause: "Unexpected Traffic Spike"
        },
        ...prev
      ]);

      // 3. Metrics
      setLatencyMetrics(prev => triggerSpike(prev, 600));

      // 4. Remediation
      setRemediations(prev => [{
        id: Date.now(),
        action: "Scale up api-gateway (3->6 replicas)",
        target: "api-gateway",
        status: "executing",
        type: "scale",
        time: "Just now",
        reason: "P99 Latency > 800ms threshold breached"
      }, ...prev]);

      // 5. RCA
      setRcaData({
        incident: "Search API Latency Degradation",
        service: "api-gateway",
        timeline: [
          { time: "T-10min", event: "Traffic spike: +400% RPS", type: "metric" },
          { time: "T-5min", event: "HPA max replicas reached (3)", type: "alert" },
          { time: "T-0", event: "Client timeout increase detected", type: "incident" }
        ],
        rootCause: "Marketing campaign 'Summer Sale' triggered unpredicted load. Autoscaler config too conservative.",
        affectedServices: ["api-gateway", "search-service"],
        recommendation: "Increase HPA max replicas to 10 and adjust CPU target to 60%."
      });
    }
    else if (log.id === "log-103") { // SCENARIO: Auth Success (High Traffic / Recovery)
      // This is a "Good" log, maybe trigger a healthy high-traffic state?
      // Or treat it as "Recovery" - clearing critical statuses?
      // Let's do "High Load but Healthy" (Cyber Monday style)
      setServices(prev => prev.map(s => {
         // All healthy but high CPU
         return { ...s, status: "healthy", cpu: s.cpu + 20, uptime: 100 };
      }));
      setThroughputMetrics(prev => triggerSpike(prev, 5000)); // Huge traffic
      
      // Clear recent critical incidents? No, let's just log a "Scaling" event
      setRemediations(prev => [{
        id: Date.now(),
        action: "Pre-emptive scaling",
        target: "auth-service",
        status: "completed",
        type: "scale",
        time: "Just now",
        reason: "Login spike detected (10k auth/sec)"
      }, ...prev]);
    }
    else if (log.id === "log-104") { // SCENARIO: Database Connection Timeout
      // 1. Services
      setServices(prev => prev.map(s => {
        if (s.id === "svc-7") return { ...s, status: "critical", uptime: 0, errorRate: 100 }; // DB Down
        if (s.id === "svc-3") return { ...s, status: "critical" }; // User service depends on DB
        if (s.id === "svc-4") return { ...s, status: "critical" }; // Auth service depends on DB
        return s;
      }));

      // 2. Incident
      setIncidents(prev => [
        { 
          id: `inc-${Date.now()}`, 
          title: "Database Connection Pool Exhaustion", 
          severity: "critical", 
          status: "active", 
          service: "database-primary", 
          startedAt: "Just now", 
          autoRemediated: false,
          rootCause: "Blocked Queries"
        }, 
        ...prev
      ]);

      // 3. Database Query
      setDatabaseQueries(prev => [{
        query: "SELECT * FROM large_table WHERE unindexed_col = ? FOR UPDATE",
        time: "45.2s",
        optimized: "Pending",
        improvement: "TBD",
        fix: "Kill process & Add Index",
        applied: false
      }, ...prev]);

      // 4. Remediation
      setRemediations(prev => [{
        id: Date.now(),
        action: "Kill blocking queries (PID: 9921)",
        target: "database-primary",
        status: "ready", // Waiting for approval?
        type: "restart",
        time: "Just now",
        reason: "Active queries > Max Pool Size (100)"
      }, ...prev]);
      
      // 5. RCA
      setRcaData({
        incident: "Database Outage (Pool Exhaustion)",
        service: "database-primary",
        timeline: [
          { time: "T-20min", event: "Bad deployment: v3.4.0", type: "deploy" },
          { time: "T-5min", event: "Active connections: 100/100", type: "metric" },
          { time: "T-0", event: "New connections rejected", type: "incident" }
        ],
        rootCause: "Deployment v3.4.0 introduced a 'SELECT * FOR UPDATE' lock on the main user table without an index.",
        affectedServices: ["database-primary", "user-service", "auth-service"],
        recommendation: "Immediate rollback of v3.4.0 and detailed query review."
      });
    }
    else if (log.id === "log-105") { // SCENARIO: Notification Queue Full
      // 1. Services
      setServices(prev => prev.map(s => {
        if (s.id === "svc-5") return { ...s, status: "degraded", latency: 1200, riskScore: 45 }; // Notification
        return s;
      }));

      // 2. Incident
      setIncidents(prev => [
        { 
          id: `inc-${Date.now()}`, 
          title: "Email Delivery Delay", 
          severity: "medium", 
          status: "investigating", 
          service: "notification-service", 
          startedAt: "Just now", 
          autoRemediated: false,
          rootCause: "Queue Backlog"
        }, 
        ...prev
      ]);

      // 3. Chaos
      setChaosExperiments(prev => [{ 
        id: `chaos-${Date.now()}`, 
        name: "Worker Starvation Test", 
        type: "cpu-stress", 
        target: "notification-service", 
        status: "running", 
        resilience: 60, 
        recoveryTime: 0 
      }, ...prev]);

      // 4. Remediation
      setRemediations(prev => [{
        id: Date.now(),
        action: "Add Worker Pods (+5)",
        target: "notification-service", 
        status: "executing",
        type: "scale", 
        time: "Just now", 
        reason: "Queue depth > 5000 messages"
      }, ...prev]);
    }
  };

  const resetSimulation = () => {
    setServices(initialServices);
    setIncidents(initialIncidents);
    setCpuMetrics(initialCpu);
    setMemoryMetrics(initialMemory);
    setLatencyMetrics(initialLatency);
    setErrorRateMetrics(initialError);
    setRemediations(initialRemediations);
    setRcaData(initialRca);
    setDatabaseQueries(initialDbQueries);
  };

  // Recalculate stats dynamically
  const systemStats = {
    totalServices: services.length,
    healthyServices: services.filter(s => s.status === "healthy").length,
    activeIncidents: incidents.filter(i => i.status === "active" || i.status === "investigating").length,
    predictedFailures: services.filter(s => s.predictedFailure).length,
    avgMTTR: 14.2, // Static for now
    autoRemediationRate: 83,
    eventsPerSec: "4.2M",
    falsePositiveRate: 3.8,
    totalCostSavings: 9000,
    uptime: services.reduce((acc, s) => acc + s.uptime, 0) / services.length,
  };

  return (
    <SimulationContext.Provider value={{
      services, incidents, cpuMetrics, memoryMetrics, latencyMetrics, 
      errorRateMetrics, throughputMetrics, deployments, auditEntries, 
      chaosExperiments, costItems, detailedLogs, 
      remediations, rcaData, databaseQueries,
      systemStats,
      activateLog, resetSimulation
    }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error("useSimulation must be used within a SimulationProvider");
  }
  return context;
};
