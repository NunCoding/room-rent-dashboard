import { Building2, DoorOpen, Users, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"

const stats = [
  {
    name: "Total Properties",
    value: "12",
    change: "+2 this month",
    icon: Building2,
    trend: "up",
  },
  {
    name: "Total Rooms",
    value: "48",
    change: "8 vacant",
    icon: DoorOpen,
    trend: "neutral",
  },
  {
    name: "Active Tenants",
    value: "40",
    change: "+5 this month",
    icon: Users,
    trend: "up",
  },
  {
    name: "Monthly Revenue",
    value: "$48,500",
    change: "+12.5% from last month",
    icon: TrendingUp,
    trend: "up",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
              <p className="text-3xl font-semibold mt-2">{stat.value}</p>
              <p className={`text-xs mt-2 ${stat.trend === "up" ? "text-success" : "text-muted-foreground"}`}>
                {stat.change}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
