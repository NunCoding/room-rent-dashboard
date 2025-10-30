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
import { Plus, Search, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react"
import { MaintenanceForm } from "@/components/forms/maintenance-form"

const mockRequests = [
  {
    id: 1,
    title: "Leaking Faucet",
    description: "Kitchen faucet is dripping constantly",
    property: "Sunset Apartments",
    room: "202",
    tenant: "Jane Smith",
    priority: "high",
    status: "in-progress",
    createdAt: "2024-03-20",
    category: "Plumbing",
  },
  {
    id: 2,
    title: "AC Not Working",
    description: "Air conditioning unit not cooling properly",
    property: "Downtown Plaza",
    room: "A1",
    tenant: "Mike Johnson",
    priority: "urgent",
    status: "pending",
    createdAt: "2024-03-22",
    category: "HVAC",
  },
  {
    id: 3,
    title: "Broken Window Lock",
    description: "Bedroom window lock is broken",
    property: "Sunset Apartments",
    room: "101",
    tenant: "John Doe",
    priority: "medium",
    status: "pending",
    createdAt: "2024-03-21",
    category: "Security",
  },
  {
    id: 4,
    title: "Light Fixture Replacement",
    description: "Living room light fixture needs replacement",
    property: "Riverside Complex",
    room: "305",
    tenant: "Sarah Williams",
    priority: "low",
    status: "completed",
    createdAt: "2024-03-15",
    category: "Electrical",
  },
  {
    id: 5,
    title: "Clogged Drain",
    description: "Bathroom sink drain is clogged",
    property: "Sunset Apartments",
    room: "202",
    tenant: "Jane Smith",
    priority: "high",
    status: "in-progress",
    createdAt: "2024-03-19",
    category: "Plumbing",
  },
]

export function MaintenanceRequestsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "high":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "medium":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "low":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in-progress":
        return <AlertCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "in-progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "completed":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const stats = {
    pending: mockRequests.filter((r) => r.status === "pending").length,
    inProgress: mockRequests.filter((r) => r.status === "in-progress").length,
    completed: mockRequests.filter((r) => r.status === "completed").length,
    urgent: mockRequests.filter((r) => r.priority === "urgent").length,
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold mt-1">{stats.pending}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-amber-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold mt-1">{stats.inProgress}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold mt-1">{stats.completed}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-emerald-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Urgent</p>
              <p className="text-2xl font-bold mt-1 text-red-500">{stats.urgent}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Maintenance Request</DialogTitle>
                <DialogDescription>Submit a new maintenance request for a property or room.</DialogDescription>
              </DialogHeader>
              <MaintenanceForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </Card>

      <div className="grid gap-4">
        {mockRequests.map((request) => (
          <Card key={request.id} className="p-6 hover:border-primary/50 transition-colors">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold text-lg">{request.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{request.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(request.status)}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1">{request.status}</span>
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Property</p>
                    <p className="font-medium">{request.property}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Room</p>
                    <p className="font-medium">{request.room}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tenant</p>
                    <p className="font-medium">{request.tenant}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Category</p>
                    <p className="font-medium">{request.category}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Created: {new Date(request.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex md:flex-col gap-2">
                <Button variant="outline" size="sm" className="flex-1 md:flex-none bg-transparent">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1 md:flex-none bg-transparent">
                  Update Status
                </Button>
                <Button variant="outline" size="sm" className="flex-1 md:flex-none bg-transparent">
                  Assign
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
