import DashboardLayout from "@/components/DashboardLayout";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useSimulation } from "@/context/SimulationContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Why is payment-service unstable?",
  "Rollback last deployment",
  "Show cost savings this week",
  "What's the MTTR trend?",
];

export default function ChatOpsPage() {
  const { services, incidents, costItems, deployments } = useSimulation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateResponse = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // 1. Service Analysis
    if (lowerText.includes("unstable") || lowerText.includes("status")) {
      const serviceName = services.find(s => lowerText.includes(s.name))?.name || "payment-service";
      const service = services.find(s => s.name === serviceName);
      
      if (service) {
        if (service.status === "healthy") {
          return `**${service.name}** is currently **healthy**.\n\n- Uptime: ${service.uptime}%\n- Latency: ${service.latency}ms\n- Error Rate: ${service.errorRate}%\n\nNo issues detected.`;
        } else {
          const activeIncident = incidents.find(i => i.service === service.name && i.status === "active");
          return `**${service.name}** is showing **${service.status}** status (Risk Score: ${service.riskScore}).\n\n1. **Latency**: ${service.latency}ms\n2. **Error Rate**: ${service.errorRate}%\n3. **Active Incident**: ${activeIncident?.title || "None"}\n\n**Predicted failure**: ${service.predictedFailure || "None"}\n\n**Recommended Action**: Check logs for errors and consider rolling back recent changes.`;
        }
      }
    }

    // 2. Deployment Rollback
    if (lowerText.includes("rollback") || lowerText.includes("deployment")) {
      const recentDep = deployments[0];
      return `**Last deployment:** ${recentDep.service} ${recentDep.version}\n\n**Status:** ${recentDep.status.toUpperCase()}\n**Health Score:** ${recentDep.healthScore}%\n\n${recentDep.status === 'rolled-back' ? '⚠️ This deployment was automatically rolled back due to error rate thresholds.' : 'Deployment is stable.'}`;
    }

    // 3. Cost Savings
    if (lowerText.includes("cost") || lowerText.includes("savings")) {
      const totalSavings = costItems.reduce((acc, item) => acc + item.savings, 0);
      return `**💰 Cost Optimization Report:**\n\nTotal identified savings: **$${totalSavings.toLocaleString()}**\n\nTop recommendations:\n${costItems.map(c => `- **${c.service}**: Save $${c.savings} (${c.recommendation})`).join('\n')}`;
    }

    // Default
    return `I analyzed your request: "${text}"\n\n**System Status:** ${incidents.filter(i => i.status === 'active').length} active incidents.\n**Healthy Services:** ${services.filter(s => s.status === 'healthy').length}/${services.length}\n\nAsk me about specific services or incidents.`;
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(text);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1200);
  };
   return (
    <DashboardLayout>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
          <MessageSquare className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">ChatOps</h1>
          <p className="text-sm text-muted-foreground">Ask AutoSRE anything about your infrastructure</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card flex flex-col" style={{ height: "calc(100vh - 180px)" }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Bot className="h-12 w-12 text-primary/30 mb-4" />
              <p className="text-sm text-muted-foreground mb-4">Ask me about your infrastructure</p>
              <div className="flex flex-wrap gap-2 justify-center max-w-md">
                {suggestions.map(s => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
            >
              {msg.role === "assistant" && (
                <div className="h-7 w-7 rounded-md gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
              )}
              <div className={cn(
                "max-w-[70%] rounded-lg px-4 py-2.5 text-sm",
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
              )}>
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{msg.content}</pre>
              </div>
              {msg.role === "user" && (
                <div className="h-7 w-7 rounded-md bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="h-7 w-7 rounded-md gradient-primary flex items-center justify-center flex-shrink-0">
                <Bot className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <div className="bg-secondary rounded-lg px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border p-3">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AutoSRE..."
              className="flex-1 bg-secondary rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
            />
            <button type="submit" disabled={!input.trim()} className="p-2 rounded-md bg-primary text-primary-foreground disabled:opacity-30 transition-opacity hover:opacity-90">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
