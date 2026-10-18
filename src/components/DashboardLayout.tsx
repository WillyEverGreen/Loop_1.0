import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_70%_40%_at_70%_0%,hsl(347_90%_95%/0.9),transparent),radial-gradient(ellipse_50%_35%_at_10%_0%,hsl(220_90%_93%/0.9),transparent)] bg-no-repeat">
      <AppSidebar />
      <main className="ml-56 min-h-screen">
        <div className="mx-auto max-w-[1400px] p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
