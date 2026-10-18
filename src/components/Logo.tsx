import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return <img src="/logo.svg" alt="" aria-hidden className={cn("h-8 w-8 select-none", className)} draggable={false} />;
}

export default function Logo({ className, tagline = false }: { className?: string; tagline?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="leading-none">
        <span className="block text-lg font-bold tracking-tight text-foreground">Loop</span>
        {tagline && <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Autonomous ops</span>}
      </span>
    </span>
  );
}
