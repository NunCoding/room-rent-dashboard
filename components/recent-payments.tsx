import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const payments = [
  { tenant: "Sarah Johnson", room: "A-101", amount: 1200, status: "paid", date: "2025-10-25" },
  { tenant: "Mike Chen", room: "B-205", amount: 1350, status: "paid", date: "2025-10-24" },
  { tenant: "Emma Davis", room: "C-302", amount: 1100, status: "pending", date: "2025-10-28" },
  { tenant: "James Wilson", room: "A-104", amount: 1250, status: "overdue", date: "2025-10-15" },
  { tenant: "Lisa Anderson", room: "B-201", amount: 1400, status: "paid", date: "2025-10-23" },
]

export function RecentPayments() {
  return (
    <Card className="p-6">
      <div className="space-y-1 mb-6">
        <h3 className="text-lg font-semibold">Recent Payments</h3>
        <p className="text-sm text-muted-foreground">Latest rent payment activities</p>
      </div>
      <div className="space-y-4">
        {payments.map((payment, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium">{payment.tenant}</p>
              <p className="text-xs text-muted-foreground">Room {payment.room}</p>
            </div>
            <div className="text-right mr-4">
              <p className="text-sm font-semibold">${payment.amount}</p>
              <p className="text-xs text-muted-foreground">{payment.date}</p>
            </div>
            <Badge
              variant={
                payment.status === "paid" ? "default" : payment.status === "pending" ? "secondary" : "destructive"
              }
            >
              {payment.status}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  )
}
