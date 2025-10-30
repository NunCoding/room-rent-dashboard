"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download } from "lucide-react"

const payments = [
  {
    id: 1,
    tenant: "Sarah Johnson",
    room: "A-101",
    property: "Sunset Apartments",
    month: "October 2025",
    amountDue: 1200,
    amountPaid: 1200,
    status: "paid",
    date: "2025-10-25",
  },
  {
    id: 2,
    tenant: "Mike Chen",
    room: "B-205",
    property: "Riverside Complex",
    month: "October 2025",
    amountDue: 1350,
    amountPaid: 1350,
    status: "paid",
    date: "2025-10-24",
  },
  {
    id: 3,
    tenant: "Emma Davis",
    room: "C-302",
    property: "Green Valley",
    month: "October 2025",
    amountDue: 1100,
    amountPaid: 0,
    status: "pending",
    date: "2025-10-28",
  },
  {
    id: 4,
    tenant: "James Wilson",
    room: "A-104",
    property: "Sunset Apartments",
    month: "October 2025",
    amountDue: 1250,
    amountPaid: 0,
    status: "overdue",
    date: "2025-10-15",
  },
  {
    id: 5,
    tenant: "Lisa Anderson",
    room: "B-201",
    property: "Riverside Complex",
    month: "October 2025",
    amountDue: 1400,
    amountPaid: 1400,
    status: "paid",
    date: "2025-10-23",
  },
  {
    id: 6,
    tenant: "David Brown",
    room: "C-105",
    property: "Green Valley",
    month: "October 2025",
    amountDue: 1150,
    amountPaid: 600,
    status: "partial",
    date: "2025-10-20",
  },
  {
    id: 7,
    tenant: "Maria Garcia",
    room: "A-203",
    property: "Downtown Studios",
    month: "October 2025",
    amountDue: 1300,
    amountPaid: 1300,
    status: "paid",
    date: "2025-10-22",
  },
  {
    id: 8,
    tenant: "Robert Taylor",
    room: "B-108",
    property: "Riverside Complex",
    month: "October 2025",
    amountDue: 1250,
    amountPaid: 0,
    status: "pending",
    date: "2025-10-28",
  },
]

export function PaymentsTable() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by tenant or room..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tenant</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Room</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Property</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Month</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount Due</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount Paid</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <p className="text-sm font-medium">{payment.tenant}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-muted-foreground">{payment.room}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-muted-foreground">{payment.property}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-muted-foreground">{payment.month}</p>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className="text-sm font-medium">${payment.amountDue}</p>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className="text-sm font-medium">${payment.amountPaid}</p>
                </td>
                <td className="py-4 px-4">
                  <Badge
                    variant={
                      payment.status === "paid"
                        ? "default"
                        : payment.status === "pending"
                          ? "secondary"
                          : payment.status === "partial"
                            ? "outline"
                            : "destructive"
                    }
                  >
                    {payment.status}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-muted-foreground">{payment.date}</p>
                </td>
                <td className="py-4 px-4 text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
