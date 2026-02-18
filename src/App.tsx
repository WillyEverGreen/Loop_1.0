import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SimulationProvider } from "@/context/SimulationContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IncidentsPage from "./pages/IncidentsPage";
import ServicesPage from "./pages/ServicesPage";
import PredictionsPage from "./pages/PredictionsPage";
import RemediationPage from "./pages/RemediationPage";
import RCAPage from "./pages/RCAPage";
import DeploymentsPage from "./pages/DeploymentsPage";
import DatabasePage from "./pages/DatabasePage";
import CostPage from "./pages/CostPage";
import ChaosPage from "./pages/ChaosPage";
import ChatOpsPage from "./pages/ChatOpsPage";
import AuditPage from "./pages/AuditPage";
import LogsPage from "./pages/LogsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SimulationProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/incidents" element={<IncidentsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/predictions" element={<PredictionsPage />} />
            <Route path="/remediation" element={<RemediationPage />} />
            <Route path="/rca" element={<RCAPage />} />
            <Route path="/deployments" element={<DeploymentsPage />} />
            <Route path="/database" element={<DatabasePage />} />
            <Route path="/cost" element={<CostPage />} />
            <Route path="/chaos" element={<ChaosPage />} />
            <Route path="/chatops" element={<ChatOpsPage />} />
            <Route path="/audit" element={<AuditPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SimulationProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
