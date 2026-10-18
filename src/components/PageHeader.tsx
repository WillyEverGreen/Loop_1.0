import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: ReactNode;
  kicker?: string;
  tone?: "primary" | "accent" | "success" | "warning" | "danger";
  children?: ReactNode;
  className?: string;
}

const tones = {
  primary: "bg-primary shadow-[3px_3px_0_hsl(var(--accent))]",
  accent: "bg-accent shadow-[3px_3px_0_hsl(var(--primary))]",
  success: "bg-success shadow-[3px_3px_0_hsl(var(--accent))]",
  warning: "bg-warning shadow-[3px_3px_0_hsl(var(--primary))]",
  danger: "bg-destructive shadow-[3px_3px_0_hsl(var(--accent))]",
};

export default function PageHeader({ icon: Icon, title, subtitle, kicker, tone = "primary", children, className }: PageHeaderProps) {
  return (
    <header className={cn("mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5", className)}>
      <div className="flex items-center gap-4">
        <div className={cn("flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl -rotate-3", tones[tone])}>
          <Icon className="h-6 w-6 text-white" strokeWidth={1.9} />
        </div>
        <div>
          {kicker && <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{kicker}</p>}
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </header>
  );
}
