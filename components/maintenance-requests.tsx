import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wrench, Droplets, Zap, Wind } from "lucide-react"

const requests = [
  {
    id: 1,
    title: "Leaking faucet in bathroom",
    tenant: "Sarah Johnson",
    room: "A-101",
    priority: "high",
    status: "pending",
    icon: Droplets,
    date: "2025-10-27",
  },
  {
    id: 2,
    title: "Air conditioning not working",
    tenant: "Mike Chen",
    room: "B-205",
    priority: "urgent",
    status: "in-progress",
    icon: Wind,
    date: "2025-10-26",
  },
  {
    id: 3,
    title: "Electrical outlet sparking",
    tenant: "Emma Davis",
    room: "C-302",
    priority: "urgent",
    status: "pending",
    icon: Zap,
    date: "2025-10-28",
  },
  {
    id: 4,
    title: "Door lock needs repair",
    tenant: "James Wilson",
    room: "A-104",
    priority: "medium",
    status: "completed",
    icon: Wrench,
    date: "2025-10-25",
  },
]

export function MaintenanceRequests() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Maintenance Requests</h3>
          <p className="text-sm text-muted-foreground">Recent maintenance issues reported by tenants</p>
        </div>
        <Button>View All</Button>
      </div>
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <request.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">{request.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {request.tenant} • Room {request.room} • {request.date}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge
                    variant={
                      request.priority === "urgent"
                        ? "destructive"
                        : request.priority === "high"
                          ? "default"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {request.priority}
                  </Badge>
                  <Badge
                    variant={
                      request.status === "completed"
                        ? "default"
                        : request.status === "in-progress"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-xs"
                  >
                    {request.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
