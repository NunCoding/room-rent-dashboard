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
import { Plus, Search, Bed, DollarSign, User, MapPin } from "lucide-react"
import { RoomForm } from "@/components/forms/room-form"

const mockRooms = [
  {
    id: 1,
    number: "101",
    property: "Sunset Apartments",
    type: "Studio",
    size: 450,
    rent: 1200,
    status: "occupied",
    tenant: "John Doe",
    floor: 1,
  },
  {
    id: 2,
    number: "102",
    property: "Sunset Apartments",
    type: "1 Bedroom",
    size: 650,
    rent: 1500,
    status: "vacant",
    tenant: null,
    floor: 1,
  },
  {
    id: 3,
    number: "201",
    property: "Sunset Apartments",
    type: "2 Bedroom",
    size: 900,
    rent: 2000,
    status: "occupied",
    tenant: "Jane Smith",
    floor: 2,
  },
  {
    id: 4,
    number: "202",
    property: "Sunset Apartments",
    type: "1 Bedroom",
    size: 700,
    rent: 1600,
    status: "maintenance",
    tenant: null,
    floor: 2,
  },
  {
    id: 5,
    number: "A1",
    property: "Downtown Plaza",
    type: "Studio",
    size: 500,
    rent: 1400,
    status: "occupied",
    tenant: "Mike Johnson",
    floor: 1,
  },
  {
    id: 6,
    number: "A2",
    property: "Downtown Plaza",
    type: "2 Bedroom",
    size: 950,
    rent: 2200,
    status: "vacant",
    tenant: null,
    floor: 1,
  },
]

export function RoomsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "vacant":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "maintenance":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
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
              placeholder="Search rooms..."
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
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="vacant">Vacant</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Room
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Room</DialogTitle>
                <DialogDescription>Fill in the details below to add a new room to your property.</DialogDescription>
              </DialogHeader>
              <RoomForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockRooms.map((room) => (
          <Card key={room.id} className="p-6 hover:border-primary/50 transition-colors">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">Room {room.number}</h3>
                    <Badge variant="outline" className={getStatusColor(room.status)}>
                      {room.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {room.property}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Bed className="h-4 w-4" />
                    Type
                  </span>
                  <span className="font-medium">{room.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Size</span>
                  <span className="font-medium">{room.size} sq ft</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Rent
                  </span>
                  <span className="font-semibold text-primary">${room.rent.toLocaleString()}/mo</span>
                </div>
                {room.tenant && (
                  <div className="flex items-center justify-between text-sm pt-2 border-t">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Tenant
                    </span>
                    <span className="font-medium">{room.tenant}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
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
