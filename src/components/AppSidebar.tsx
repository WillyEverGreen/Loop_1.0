import { NavLink, useLocation } from "react-router-dom";
import {
  Activity, AlertTriangle, BarChart3, Bot, Cloud, Database,
  FlaskConical, GitBranch, Home, MessageSquare, Server, Shield,
  Zap, ChevronLeft, ChevronRight
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/logs", icon: FlaskConical, label: "System Logs" },
  { to: "/", icon: Home, label: "Overview" },
  { to: "/incidents", icon: AlertTriangle, label: "Incidents" },
  { to: "/services", icon: Server, label: "Services" },
  { to: "/predictions", icon: Zap, label: "Predictions" },
  { to: "/remediation", icon: Bot, label: "Remediation" },
  { to: "/rca", icon: Activity, label: "Root Cause" },
  { to: "/deployments", icon: GitBranch, label: "Deployments" },
  { to: "/database", icon: Database, label: "DB Optimizer" },
  { to: "/cost", icon: Cloud, label: "FinOps" },
  { to: "/chaos", icon: FlaskConical, label: "Chaos" },
  { to: "/chatops", icon: MessageSquare, label: "ChatOps" },
  { to: "/audit", icon: Shield, label: "Audit Log" },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-sidebar flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-border">
        <div className="h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 bg-sidebar-accent">
          <img src="/logo.png" alt="Loop Logo" className="h-full w-full object-cover" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold text-foreground tracking-tight">Loop</h1>
            <p className="text-[10px] text-muted-foreground font-mono">AUTONOMOUS OPS</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-2 px-2 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-150 group",
                isActive
                  ? "bg-sidebar-accent text-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4 flex-shrink-0", isActive && "text-primary")} />
              {!collapsed && <span>{label}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center py-3 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
}
