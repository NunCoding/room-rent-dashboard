"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Calendar, DollarSign, FileText, AlertCircle } from "lucide-react"
import { LeaseForm } from "@/components/forms/lease-form"

const mockLeases = [
  {
    id: 1,
    tenant: "John Doe",
    property: "Sunset Apartments",
    room: "101",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    monthlyRent: 1200,
    deposit: 2400,
    status: "active",
    daysRemaining: 245,
  },
  {
    id: 2,
    tenant: "Jane Smith",
    property: "Sunset Apartments",
    room: "201",
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    monthlyRent: 2000,
    deposit: 4000,
    status: "active",
    daysRemaining: 276,
  },
  {
    id: 3,
    tenant: "Mike Johnson",
    property: "Downtown Plaza",
    room: "A1",
    startDate: "2023-12-01",
    endDate: "2024-11-30",
    monthlyRent: 1400,
    deposit: 2800,
    status: "expiring",
    daysRemaining: 214,
  },
  {
    id: 4,
    tenant: "Sarah Williams",
    property: "Riverside Complex",
    room: "305",
    startDate: "2024-03-01",
    endDate: "2024-08-31",
    monthlyRent: 1800,
    deposit: 3600,
    status: "expiring",
    daysRemaining: 153,
  },
  {
    id: 5,
    tenant: "David Brown",
    property: "Sunset Apartments",
    room: "102",
    startDate: "2023-06-01",
    endDate: "2024-01-15",
    monthlyRent: 1500,
    deposit: 3000,
    status: "expired",
    daysRemaining: 0,
  },
]

export function LeasesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "expiring":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "expired":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const calculateProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    const now = Date.now()
    const total = end - start
    const elapsed = now - start
    return Math.min(Math.max((elapsed / total) * 100, 0), 100)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leases..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expiring">Expiring Soon</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Lease
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Lease</DialogTitle>
                <DialogDescription>Fill in the lease details below to create a new rental agreement.</DialogDescription>
              </DialogHeader>
              <LeaseForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </Card>

      <div className="grid gap-4">
        {mockLeases.map((lease) => (
          <Card key={lease.id} className="p-6 hover:border-primary/50 transition-colors">
            <div className="space-y-4">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold">{lease.tenant}</h3>
                    <Badge variant="outline" className={getStatusColor(lease.status)}>
                      {lease.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {lease.property} - Room {lease.room}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Contract
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Start Date
                  </p>
                  <p className="font-medium">{new Date(lease.startDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    End Date
                  </p>
                  <p className="font-medium">{new Date(lease.endDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Monthly Rent
                  </p>
                  <p className="font-semibold text-primary">${lease.monthlyRent.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Security Deposit</p>
                  <p className="font-medium">${lease.deposit.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Lease Progress</span>
                  <span className="font-medium">
                    {lease.daysRemaining > 0 ? `${lease.daysRemaining} days remaining` : "Expired"}
                  </span>
                </div>
                <Progress value={calculateProgress(lease.startDate, lease.endDate)} className="h-2" />
              </div>

              {lease.status === "expiring" && (
                <div className="flex items-center gap-2 text-sm text-amber-500 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                  <AlertCircle className="h-4 w-4" />
                  <span>This lease is expiring soon. Consider renewal or finding a new tenant.</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
