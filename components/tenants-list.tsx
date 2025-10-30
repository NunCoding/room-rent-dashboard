"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Mail, Phone, MapPin, Calendar } from "lucide-react"
import { TenantForm } from "@/components/forms/tenant-form"

const mockTenants = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    room: "101",
    property: "Sunset Apartments",
    leaseStart: "2024-01-01",
    leaseEnd: "2024-12-31",
    status: "active",
    rent: 1200,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1 (555) 234-5678",
    room: "201",
    property: "Sunset Apartments",
    leaseStart: "2024-02-01",
    leaseEnd: "2025-01-31",
    status: "active",
    rent: 2000,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.j@email.com",
    phone: "+1 (555) 345-6789",
    room: "A1",
    property: "Downtown Plaza",
    leaseStart: "2023-12-01",
    leaseEnd: "2024-11-30",
    status: "active",
    rent: 1400,
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.w@email.com",
    phone: "+1 (555) 456-7890",
    room: "305",
    property: "Riverside Complex",
    leaseStart: "2024-03-01",
    leaseEnd: "2024-08-31",
    status: "notice",
    rent: 1800,
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@email.com",
    phone: "+1 (555) 567-8901",
    room: "102",
    property: "Sunset Apartments",
    leaseStart: "2023-06-01",
    leaseEnd: "2024-01-15",
    status: "expired",
    rent: 1500,
  },
]

export function TenantsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "notice":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "expired":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tenants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Tenant
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Tenant</DialogTitle>
                <DialogDescription>Fill in the tenant information below to add them to your system.</DialogDescription>
              </DialogHeader>
              <TenantForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </Card>

      <div className="grid gap-4">
        {mockTenants.map((tenant) => (
          <Card key={tenant.id} className="p-6 hover:border-primary/50 transition-colors">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex items-start gap-4 flex-1">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(tenant.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold">{tenant.name}</h3>
                      <Badge variant="outline" className={getStatusColor(tenant.status)}>
                        {tenant.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {tenant.property} - Room {tenant.room}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{tenant.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{tenant.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Lease: {new Date(tenant.leaseStart).toLocaleDateString()} -{" "}
                        {new Date(tenant.leaseEnd).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Rent:</span>
                      <span className="font-semibold text-primary">${tenant.rent.toLocaleString()}/mo</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col gap-2">
                <Button variant="outline" size="sm" className="flex-1 md:flex-none bg-transparent">
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1 md:flex-none bg-transparent">
                  Contact
                </Button>
                <Button variant="outline" size="sm" className="flex-1 md:flex-none bg-transparent">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
