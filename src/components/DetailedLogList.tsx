import { useState } from "react";
import { DetailedLog } from "@/data/mockData";
import { useSimulation } from "@/context/SimulationContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Terminal, Play } from "lucide-react";
import { toast } from "sonner";

export default function DetailedLogList() {
  const { detailedLogs, activateLog } = useSimulation();
  const [selectedLog, setSelectedLog] = useState<DetailedLog | null>(null);

  const handleSimulate = (log: DetailedLog, e: React.MouseEvent) => {
    e.stopPropagation();
    activateLog(log);
    toast.success(`Scenario activated: ${log.message}`);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "destructive";
      case "warning":
        return "secondary"; // or "yellow" if available, but shadcn standard is usually limited
      case "info":
        return "default";
      case "debug":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" /> System Logs
        </h3>
      </div>

      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[180px]">Timestamp</TableHead>
              <TableHead className="w-[100px]">Level</TableHead>
              <TableHead className="w-[150px]">Source</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="w-[100px] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detailedLogs.map((log) => (
              <TableRow key={log.id} className="hover:bg-muted/30">
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant={getLevelColor(log.level)} className="uppercase text-[10px]">
                    {log.level}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium text-sm">{log.source}</TableCell>
                <TableCell className="text-sm">{log.message}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 border-dashed border-primary/50 text-primary hover:bg-primary/10"
                      onClick={(e) => handleSimulate(log, e)}
                      title="Simulate this scenario"
                    >
                      <Play className="h-3 w-3" />
                      <span className="sr-only">Simulate</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setSelectedLog(log)}
                    >
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">View Details</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Badge variant={getLevelColor(selectedLog?.level || "info")}>
                {selectedLog?.level.toUpperCase()}
              </Badge>
              <span>Log Details: {selectedLog?.id}</span>
            </DialogTitle>
            <DialogDescription>
              Recorded at {selectedLog && new Date(selectedLog.timestamp).toLocaleString()} from {selectedLog?.source}
            </DialogDescription>
          </DialogHeader>

          {selectedLog && (
            <div className="space-y-4">
              <div className="p-3 rounded-md bg-muted/50 border border-border">
                <p className="text-sm font-medium text-foreground">{selectedLog.message}</p>
              </div>

              {selectedLog.report.stackTrace && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Stack Trace</h4>
                  <pre className="p-3 rounded-md bg-destructive/10 text-destructive text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                    {selectedLog.report.stackTrace}
                  </pre>
                </div>
              )}

              {selectedLog.report.context && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Context</h4>
                  <pre className="p-3 rounded-md bg-secondary/30 text-xs font-mono overflow-x-auto">
                    {JSON.stringify(selectedLog.report.context, null, 2)}
                  </pre>
                </div>
              )}

               {selectedLog.report.performanceMetrics && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Performance Metrics</h4>
                  <pre className="p-3 rounded-md bg-secondary/30 text-xs font-mono overflow-x-auto">
                    {JSON.stringify(selectedLog.report.performanceMetrics, null, 2)}
                  </pre>
                </div>
              )}
              
               {selectedLog.report.requestParams && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Request Params</h4>
                  <pre className="p-3 rounded-md bg-secondary/30 text-xs font-mono overflow-x-auto">
                    {JSON.stringify(selectedLog.report.requestParams, null, 2)}
                  </pre>
                </div>
              )}

               {selectedLog.report.userId && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">User Info</h4>
                  <div className="p-2 rounded-md bg-secondary/30 text-xs font-mono">
                   User ID: {selectedLog.report.userId}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
