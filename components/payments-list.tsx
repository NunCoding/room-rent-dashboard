"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, DollarSign, Calendar, User, AlertCircle } from "lucide-react"
import { PaymentForm } from "@/components/forms/payment-form"

const mockPayments = [
  {
    id: 1,
    tenant: "John Doe",
    property: "Sunset Apartments",
    room: "101",
    amount: 1200,
    dueDate: "2024-04-01",
    paidDate: "2024-03-28",
    status: "paid",
    method: "Bank Transfer",
  },
  {
    id: 2,
    tenant: "Jane Smith",
    property: "Sunset Apartments",
    room: "201",
    amount: 2000,
    dueDate: "2024-04-01",
    paidDate: null,
    status: "pending",
    method: null,
  },
  {
    id: 3,
    tenant: "Mike Johnson",
    property: "Downtown Plaza",
    room: "A1",
    amount: 1400,
    dueDate: "2024-03-25",
    paidDate: null,
    status: "overdue",
    method: null,
  },
  {
    id: 4,
    tenant: "Sarah Williams",
    property: "Riverside Complex",
    room: "305",
    amount: 1800,
    dueDate: "2024-04-05",
    paidDate: "2024-04-03",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: 5,
    tenant: "David Brown",
    property: "Sunset Apartments",
    room: "102",
    amount: 1500,
    dueDate: "2024-04-01",
    paidDate: null,
    status: "pending",
    method: null,
  },
]

export function PaymentsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "overdue":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search payments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Record Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Record New Payment</DialogTitle>
                <DialogDescription>Record a rent payment from a tenant.</DialogDescription>
              </DialogHeader>
              <PaymentForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </Card>

      <div className="grid gap-4">
        {mockPayments.map((payment) => (
          <Card key={payment.id} className="p-6 hover:border-primary/50 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        {payment.tenant}
                      </h3>
                      <Badge variant="outline" className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {payment.property} - Room {payment.room}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Amount
                    </p>
                    <p className="font-semibold text-primary text-lg">${payment.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Due Date
                    </p>
                    <p className="font-medium">{new Date(payment.dueDate).toLocaleDateString()}</p>
                  </div>
                  {payment.paidDate && (
                    <div>
                      <p className="text-muted-foreground">Paid Date</p>
                      <p className="font-medium">{new Date(payment.paidDate).toLocaleDateString()}</p>
                    </div>
                  )}
                  {payment.method && (
                    <div>
                      <p className="text-muted-foreground">Method</p>
                      <p className="font-medium">{payment.method}</p>
                    </div>
                  )}
                </div>

                {payment.status === "overdue" && (
                  <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <AlertCircle className="h-4 w-4" />
                    <span>This payment is overdue. Please follow up with the tenant.</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {payment.status !== "paid" && <Button size="sm">Mark as Paid</Button>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
