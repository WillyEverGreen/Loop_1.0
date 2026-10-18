import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: ReactNode;
  kicker?: string;
  tone?: string;
  children?: ReactNode;
  className?: string;
}

export default function PageHeader({ title, subtitle, kicker, children, className }: PageHeaderProps) {
  return (
    <header className={cn("mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5", className)}>
      <div>
        {kicker && <p className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{kicker}</p>}
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </header>
  );
}
