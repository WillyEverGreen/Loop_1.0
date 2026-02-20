// Mock data for Loop platform

export interface Service {
  id: string;
  name: string;
  status: "healthy" | "warning" | "critical" | "degraded";
  uptime: number;
  latency: number;
  errorRate: number;
  cpu: number;
  memory: number;
  riskScore: number;
  predictedFailure?: string;
  confidence?: number;
  dependencies: string[];
}

export interface Incident {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "active" | "investigating" | "resolved" | "predicted";
  service: string;
  startedAt: string;
  resolvedAt?: string;
  mttr?: number;
  autoRemediated: boolean;
  rootCause?: string;
}

export interface MetricDataPoint {
  time: string;
  value: number;
}

export interface CostItem {
  service: string;
  currentCost: number;
  optimizedCost: number;
  savings: number;
  recommendation: string;
}

export interface Deployment {
  id: string;
  service: string;
  version: string;
  status: "rolling" | "canary" | "completed" | "rolled-back";
  progress: number;
  startedAt: string;
  healthScore: number;
}

export interface AuditEntry {
  id: string;
  action: string;
  actor: string;
  target: string;
  timestamp: string;
  hash: string;
  verified: boolean;
}

export interface ChaosExperiment {
  id: string;
  name: string;
  type: "pod-kill" | "latency" | "network-drop" | "cpu-stress";
  target: string;
  status: "running" | "completed" | "scheduled";
  resilience: number;
  recoveryTime: number;
}

export const services: Service[] = [
  { id: "svc-1", name: "api-gateway", status: "healthy", uptime: 99.99, latency: 12, errorRate: 0.01, cpu: 34, memory: 52, riskScore: 5, dependencies: ["auth-service", "user-service", "payment-service"] },
  { id: "svc-2", name: "payment-service", status: "warning", uptime: 99.91, latency: 245, errorRate: 2.3, cpu: 78, memory: 81, riskScore: 72, predictedFailure: "18 min", confidence: 89, dependencies: ["database-primary", "redis-cache"] },
  { id: "svc-3", name: "user-service", status: "healthy", uptime: 99.98, latency: 18, errorRate: 0.05, cpu: 22, memory: 38, riskScore: 8, dependencies: ["database-primary", "redis-cache"] },
  { id: "svc-4", name: "auth-service", status: "healthy", uptime: 99.97, latency: 24, errorRate: 0.12, cpu: 28, memory: 44, riskScore: 12, dependencies: ["database-primary", "redis-cache"] },
  { id: "svc-5", name: "notification-service", status: "degraded", uptime: 99.82, latency: 156, errorRate: 1.8, cpu: 65, memory: 72, riskScore: 58, predictedFailure: "42 min", confidence: 76, dependencies: ["message-queue", "email-provider"] },
  { id: "svc-6", name: "search-service", status: "healthy", uptime: 99.95, latency: 45, errorRate: 0.2, cpu: 41, memory: 55, riskScore: 15, dependencies: ["elasticsearch"] },
  { id: "svc-7", name: "database-primary", status: "healthy", uptime: 99.999, latency: 3, errorRate: 0.001, cpu: 45, memory: 68, riskScore: 3, dependencies: [] },
  { id: "svc-8", name: "redis-cache", status: "critical", uptime: 98.5, latency: 890, errorRate: 12.5, cpu: 95, memory: 94, riskScore: 95, predictedFailure: "3 min", confidence: 97, dependencies: [] },
  { id: "svc-9", name: "message-queue", status: "healthy", uptime: 99.96, latency: 8, errorRate: 0.03, cpu: 30, memory: 42, riskScore: 7, dependencies: [] },
  { id: "svc-10", name: "cdn-edge", status: "healthy", uptime: 99.99, latency: 5, errorRate: 0.005, cpu: 15, memory: 25, riskScore: 2, dependencies: [] },
];

export const incidents: Incident[] = [
  { id: "inc-1", title: "Redis cache memory exhaustion", severity: "critical", status: "active", service: "redis-cache", startedAt: "2 min ago", autoRemediated: false, rootCause: "Memory leak in session handler" },
  { id: "inc-2", title: "Payment latency spike detected", severity: "high", status: "predicted", service: "payment-service", startedAt: "Predicted in 18 min", autoRemediated: false },
  { id: "inc-3", title: "Notification delivery delays", severity: "medium", status: "investigating", service: "notification-service", startedAt: "12 min ago", autoRemediated: false },
  { id: "inc-4", title: "Auth token refresh failure", severity: "high", status: "resolved", service: "auth-service", startedAt: "1h ago", resolvedAt: "45 min ago", mttr: 15, autoRemediated: true, rootCause: "Certificate expiry" },
  { id: "inc-5", title: "Search index corruption", severity: "medium", status: "resolved", service: "search-service", startedAt: "3h ago", resolvedAt: "2h ago", mttr: 60, autoRemediated: true, rootCause: "Disk space threshold" },
  { id: "inc-6", title: "API gateway 502 errors", severity: "critical", status: "resolved", service: "api-gateway", startedAt: "6h ago", resolvedAt: "5.5h ago", mttr: 30, autoRemediated: true, rootCause: "Upstream timeout" },
  { id: "inc-7", title: "CDN cache invalidation storm", severity: "low", status: "resolved", service: "cdn-edge", startedAt: "1d ago", resolvedAt: "1d ago", mttr: 8, autoRemediated: true, rootCause: "Config push" },
];

export const generateMetricsData = (base: number, variance: number, spike?: { at: number; magnitude: number }): MetricDataPoint[] => {
  return Array.from({ length: 60 }, (_, i) => {
    let value = base + (Math.random() - 0.5) * variance;
    if (spike && Math.abs(i - spike.at) < 3) {
      value += spike.magnitude * Math.exp(-Math.abs(i - spike.at));
    }
    return { time: `${i}m`, value: Math.max(0, Math.round(value * 100) / 100) };
  });
};

export const cpuMetrics = generateMetricsData(45, 15, { at: 48, magnitude: 40 });
export const memoryMetrics = generateMetricsData(62, 10, { at: 50, magnitude: 25 });
export const latencyMetrics = generateMetricsData(35, 20, { at: 45, magnitude: 200 });
export const errorRateMetrics = generateMetricsData(0.5, 0.8, { at: 47, magnitude: 8 });
export const throughputMetrics = generateMetricsData(8500, 2000);
export const eventsPerSecMetrics = generateMetricsData(4200000, 1500000);

export const costItems: CostItem[] = [
  { service: "compute-cluster-prod", currentCost: 12400, optimizedCost: 8900, savings: 3500, recommendation: "Right-size 12 overprovisioned instances" },
  { service: "storage-s3-archives", currentCost: 4200, optimizedCost: 1800, savings: 2400, recommendation: "Move cold data to Glacier" },
  { service: "database-replicas", currentCost: 6800, optimizedCost: 5100, savings: 1700, recommendation: "Consolidate 3 idle read replicas" },
  { service: "load-balancers", currentCost: 2100, optimizedCost: 1400, savings: 700, recommendation: "Remove 4 unused ALBs" },
  { service: "logging-pipeline", currentCost: 3500, optimizedCost: 2800, savings: 700, recommendation: "Reduce log retention to 30 days" },
];

export const deployments: Deployment[] = [
  { id: "dep-1", service: "payment-service", version: "v2.14.3", status: "canary", progress: 25, startedAt: "10 min ago", healthScore: 94 },
  { id: "dep-2", service: "user-service", version: "v3.8.1", status: "rolling", progress: 72, startedAt: "25 min ago", healthScore: 99 },
  { id: "dep-3", service: "api-gateway", version: "v5.2.0", status: "completed", progress: 100, startedAt: "2h ago", healthScore: 100 },
  { id: "dep-4", service: "search-service", version: "v1.12.0", status: "rolled-back", progress: 45, startedAt: "4h ago", healthScore: 42 },
];

export const auditEntries: AuditEntry[] = [
  { id: "aud-1", action: "Auto-remediation: Service restart", actor: "Loop AI", target: "redis-cache", timestamp: "2 min ago", hash: "0xa3f2...8b1c", verified: true },
  { id: "aud-2", action: "Deployment initiated", actor: "CI/CD Pipeline", target: "payment-service v2.14.3", timestamp: "10 min ago", hash: "0xb7d1...4e2a", verified: true },
  { id: "aud-3", action: "Auto-scale up", actor: "Loop AI", target: "notification-service (3→5 pods)", timestamp: "15 min ago", hash: "0xc9e4...7f3b", verified: true },
  { id: "aud-4", action: "Config change", actor: "admin@company.com", target: "api-gateway rate limits", timestamp: "1h ago", hash: "0xd2f8...1a5c", verified: true },
  { id: "aud-5", action: "Rollback executed", actor: "Loop AI", target: "search-service v1.12.0 → v1.11.8", timestamp: "4h ago", hash: "0xe5a3...9d4e", verified: true },
];

export const chaosExperiments: ChaosExperiment[] = [
  { id: "chaos-1", name: "Redis failover test", type: "pod-kill", target: "redis-cache", status: "running", resilience: 72, recoveryTime: 45 },
  { id: "chaos-2", name: "Payment latency injection", type: "latency", target: "payment-service", status: "completed", resilience: 88, recoveryTime: 12 },
  { id: "chaos-3", name: "Network partition sim", type: "network-drop", target: "database-primary", status: "completed", resilience: 95, recoveryTime: 8 },
  { id: "chaos-4", name: "CPU stress test", type: "cpu-stress", target: "api-gateway", status: "scheduled", resilience: 0, recoveryTime: 0 },
];

export const systemStats = {
  totalServices: 10,
  healthyServices: 7,
  activeIncidents: 3,
  predictedFailures: 2,
  avgMTTR: 14.2,
  autoRemediationRate: 83,
  eventsPerSec: "4.2M",
  falsePositiveRate: 3.8,
  totalCostSavings: 9000,
  uptime: 99.94,
};

export interface DetailedLog {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "debug";
  source: string;
  message: string;
  report: {
    stackTrace?: string;
    requestParams?: any;
    userId?: string;
    context?: any;
    performanceMetrics?: any;
  };
}

export const detailedLogs: DetailedLog[] = [
  {
    id: "log-101",
    timestamp: "2024-05-20T10:30:00Z",
    level: "error",
    source: "payment-service",
    message: "Upstream Payment Gateway Timeout (504)",
    report: {
      stackTrace: "GatewayTimeoutError: Upstream provider failed to respond within 5000ms\n    at PaymentProvider.charge (src/providers/stripe.ts:112:7)\n    at process.metrics (src/monitoring/latency.ts:45:3)",
      requestParams: { amount: 1250.00, currency: "USD", provider: "Stripe-US" },
      userId: "user-8821",
      context: { transactionId: "tx-9928-xkw", region: "us-east-1", attempt: 3 }
    }
  },
  {
    id: "log-102",
    timestamp: "2024-05-20T10:32:15Z",
    level: "warning",
    source: "api-gateway",
    message: "High latency detected on /api/v1/search (P99 > 800ms)",
    report: {
      performanceMetrics: { duration: 2500, threshold: 800, p95: 2100 },
      context: { endpoint: "/api/v1/search", query: "?q=summer+sale", clientIp: "192.168.1.105" }
    }
  },
  {
    id: "log-103",
    timestamp: "2024-05-20T10:35:42Z",
    level: "info",
    source: "auth-service",
    message: "Auth Traffic Spike Detected (10k req/sec)",
    report: {
      userId: "system",
      context: { provider: "google-oauth", region: "global", activeSessions: 85000 }
    }
  },
  {
    id: "log-104",
    timestamp: "2024-05-20T10:40:05Z",
    level: "error",
    source: "database-primary",
    message: "Connection timeout: Active connections limit reached (100/100)",
    report: {
      stackTrace: "TimeoutError: ResourceRequest timed out\n    at internal/pool/ResourceRequest.js:52:9\n    at Object.callback (internal/pool/ResourceRequest.js:45:10)",
      context: { poolSize: 100, activeConnections: 100, waitingRequests: 250 },
      performanceMetrics: { waitTime: 5005, timeout: 5000 }
    }
  },
  {
    id: "log-105",
    timestamp: "2024-05-20T10:45:00Z",
    level: "warning",
    source: "notification-service",
    message: "Email Queue Backlog Critical (>5000 pending)",
    report: {
      context: { queue: "email-delivery", dlq_size: 15, oldest_message: "45000ms" },
      performanceMetrics: { queueDepth: 5240, processingTime: 15 }
    }
  }
];

export interface Remediation {
  id: number;
  action: string;
  target: string;
  status: "executing" | "completed" | "ready" | "failed";
  type: "restart" | "scale" | "reroute" | "rollback";
  time: string;
  reason: string;
}

export const remediations: Remediation[] = [
  { id: 1, action: "Service restart", target: "redis-cache", status: "executing", type: "restart", time: "Now", reason: "Memory exhaustion detected (94% usage, OOM threshold breach)" },
  { id: 2, action: "Auto-scale up (3→5 pods)", target: "notification-service", status: "completed", type: "scale", time: "15 min ago", reason: "Latency spike: P99 > 150ms threshold" },
  { id: 3, action: "Traffic reroute", target: "payment-service", status: "ready", type: "reroute", time: "Pending", reason: "Predicted failure in 18 min (89% confidence)" },
  { id: 4, action: "Rollback v1.12.0 → v1.11.8", target: "search-service", status: "completed", type: "rollback", time: "4h ago", reason: "Error rate exceeded 5% post-deploy" },
  { id: 5, action: "Certificate renewal", target: "auth-service", status: "completed", type: "restart", time: "1h ago", reason: "TLS certificate expired, auto-renewed from vault" },
];

export interface RcaData {
  incident: string;
  service: string;
  timeline: { time: string; event: string; type: string }[];
  rootCause: string;
  affectedServices: string[];
  recommendation: string;
}

export const rcaData: RcaData = {
  incident: "Redis cache memory exhaustion",
  service: "redis-cache",
  timeline: [
    { time: "T-45min", event: "Deploy: session-handler v2.3.1", type: "deploy" },
    { time: "T-30min", event: "Memory growth rate +12%/min detected", type: "metric" },
    { time: "T-15min", event: "Cache eviction rate spiked 400%", type: "metric" },
    { time: "T-5min", event: "OOM warning threshold (90%) breached", type: "alert" },
    { time: "T-2min", event: "Connection pool saturation", type: "trace" },
    { time: "T-0", event: "Service degradation — latency >800ms", type: "incident" },
  ],
  rootCause: "Memory leak in session-handler v2.3.1: Sessions not released after JWT refresh flow. Commit abc1234 introduced unbounded session map.",
  affectedServices: ["redis-cache", "auth-service", "payment-service", "user-service"],
  recommendation: "Rollback session-handler to v2.3.0 or apply hotfix for session cleanup on JWT refresh.",
};

export interface DatabaseQuery {
  query: string;
  time: string;
  optimized: string;
  improvement: string;
  fix: string;
  applied: boolean;
}

export const databaseQueries: DatabaseQuery[] = [
  { query: "SELECT * FROM orders WHERE user_id = ? AND status = 'pending'", time: "2.4s", optimized: "45ms", improvement: "98%", fix: "Add composite index on (user_id, status)", applied: true },
  { query: "SELECT COUNT(*) FROM logs WHERE timestamp > NOW() - INTERVAL 1 DAY", time: "8.2s", optimized: "120ms", improvement: "98.5%", fix: "Add partitioned index on timestamp", applied: false },
  { query: "SELECT u.*, o.* FROM users u JOIN orders o ON u.id = o.user_id", time: "1.8s", optimized: "90ms", improvement: "95%", fix: "Add covering index, limit columns", applied: true },
  { query: "UPDATE sessions SET last_active = NOW() WHERE session_id = ?", time: "450ms", optimized: "12ms", improvement: "97%", fix: "Add primary key index on session_id", applied: false },
];
