"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Building2, MapPin, DoorOpen, Plus } from "lucide-react"
import { PropertyForm } from "@/components/forms/property-form"
import { useState } from "react"
import Link from "next/link"

const properties = [
  {
    id: 1,
    name: "Sunset Apartments",
    address: "123 Main Street, Downtown",
    totalRooms: 12,
    occupiedRooms: 10,
    monthlyRevenue: 14400,
    image: "/property/sunset.png",
  },
  {
    id: 2,
    name: "Riverside Complex",
    address: "456 River Road, Westside",
    totalRooms: 8,
    occupiedRooms: 7,
    monthlyRevenue: 10500,
    image: "/property/russey-kao.png",
  },
  {
    id: 3,
    name: "Green Valley Residences",
    address: "789 Valley Drive, Northside",
    totalRooms: 16,
    occupiedRooms: 14,
    monthlyRevenue: 19200,
    image: "/property/green-valley.png",
  },
  {
    id: 4,
    name: "Toul House",
    address: "321 Center Avenue, City Center",
    totalRooms: 6,
    occupiedRooms: 6,
    monthlyRevenue: 7200,
    image: "/property/toul-house.png",
  },
]

export function PropertiesList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
              <DialogDescription>Fill in the details below to add a new property to your portfolio.</DialogDescription>
            </DialogHeader>
            <PropertyForm onSuccess={() => setIsDialogOpen(false)} onCancel={() => setIsDialogOpen(false)}/>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <img src={property.image || "/placeholder.svg"} alt={property.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{property.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.address}
                  </div>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Occupancy</p>
                  <div className="flex items-center gap-2">
                    <DoorOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {property.occupiedRooms}/{property.totalRooms} rooms
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Monthly Revenue</p>
                  <p className="text-sm font-semibold">${property.monthlyRevenue.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={property.occupiedRooms === property.totalRooms ? "default" : "secondary"}>
                  {property.occupiedRooms === property.totalRooms
                    ? "Fully Occupied"
                    : `${property.totalRooms - property.occupiedRooms} Vacant`}
                </Badge>
              </div>

              <div className="flex gap-2 mt-4">
                <Link href={`/properties/${property.id}`} className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    View Details
                  </Button>
                </Link>
                <Button className="flex-1">Manage</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
