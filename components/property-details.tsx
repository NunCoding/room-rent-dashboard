"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  DoorOpen, 
  Users, 
  DollarSign,
  Calendar,
  Phone,
  Mail,
  Edit,
  Plus,
  Wrench,
  Receipt,
  TrendingUp,
  Home
} from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from an API
const properties = [
  {
    id: "1",
    name: "Sunset Apartments",
    address: "123 Main Street, Downtown",
    totalRooms: 12,
    occupiedRooms: 10,
    monthlyRevenue: 14400,
    image: "/property/sunset.png",
    description: "Modern apartment complex with excellent amenities and prime downtown location.",
    yearBuilt: 2018,
    propertyType: "Apartment Complex",
    totalArea: "15,000 sq ft",
    parkingSpaces: 24,
    amenities: ["Swimming Pool", "Gym", "Laundry", "Security", "Elevator"],
    manager: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah@sunsetapts.com"
    }
  },
  {
    id: "2", 
    name: "Riverside Complex",
    address: "456 River Road, Westside",
    totalRooms: 8,
    occupiedRooms: 7,
    monthlyRevenue: 10500,
    image: "/property/russey-kao.png",
    description: "Peaceful riverside location with scenic views and modern facilities.",
    yearBuilt: 2020,
    propertyType: "Residential Complex",
    totalArea: "12,000 sq ft",
    parkingSpaces: 16,
    amenities: ["River View", "Garden", "Parking", "Security"],
    manager: {
      name: "Mike Chen",
      phone: "+1 (555) 987-6543",
      email: "mike@riverside.com"
    }
  },
  {
    id: "3",
    name: "Green Valley Residences", 
    address: "789 Valley Drive, Northside",
    totalRooms: 16,
    occupiedRooms: 14,
    monthlyRevenue: 19200,
    image: "/property/green-valley.png",
    description: "Luxury residences in a quiet valley setting with premium amenities.",
    yearBuilt: 2019,
    propertyType: "Luxury Apartments",
    totalArea: "20,000 sq ft",
    parkingSpaces: 32,
    amenities: ["Pool", "Spa", "Concierge", "Gym", "Garden", "Security"],
    manager: {
      name: "Emily Davis",
      phone: "+1 (555) 456-7890", 
      email: "emily@greenvalley.com"
    }
  },
  {
    id: "4",
    name: "Toul House",
    address: "321 Center Avenue, City Center",
    totalRooms: 6,
    occupiedRooms: 6,
    monthlyRevenue: 7200,
    image: "/property/toul-house.png",
    description: "Boutique residential building in the heart of the city center.",
    yearBuilt: 2017,
    propertyType: "Boutique Residence",
    totalArea: "8,000 sq ft",
    parkingSpaces: 12,
    amenities: ["Rooftop Terrace", "Security", "Elevator"],
    manager: {
      name: "David Kim",
      phone: "+1 (555) 321-0987",
      email: "david@toulhouse.com"
    }
  }
]

// Mock rooms data
const mockRooms = [
  { id: 1, number: "101", floor: 1, size: 850, rent: 1200, status: "occupied", tenant: "John Smith" },
  { id: 2, number: "102", floor: 1, size: 900, rent: 1300, status: "occupied", tenant: "Jane Doe" },
  { id: 3, number: "103", floor: 1, size: 750, rent: 1100, status: "vacant", tenant: null },
  { id: 4, number: "201", floor: 2, size: 850, rent: 1200, status: "occupied", tenant: "Bob Wilson" },
  { id: 5, number: "202", floor: 2, size: 900, rent: 1300, status: "occupied", tenant: "Alice Brown" },
  { id: 6, number: "203", floor: 2, size: 750, rent: 1100, status: "maintenance", tenant: null },
]

// Mock maintenance requests
const mockMaintenance = [
  { id: 1, room: "101", issue: "Leaky faucet", priority: "Medium", status: "In Progress", date: "2024-03-15" },
  { id: 2, room: "203", issue: "AC not working", priority: "High", status: "Pending", date: "2024-03-18" },
  { id: 3, room: "102", issue: "Light bulb replacement", priority: "Low", status: "Completed", date: "2024-03-10" },
]

// Mock financial data
const mockFinancials = [
  { month: "January", revenue: 14400, expenses: 2800, profit: 11600 },
  { month: "February", revenue: 14400, expenses: 3200, profit: 11200 },
  { month: "March", revenue: 13200, expenses: 2900, profit: 10300 },
]

interface PropertyDetailsProps {
  propertyId: string
}

export function PropertyDetails({ propertyId }: PropertyDetailsProps) {
  const property = properties.find(p => p.id === propertyId)
  
  if (!property) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/properties">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Property Not Found</h1>
            <p className="text-muted-foreground">The requested property could not be found.</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Property Not Available</h3>
            <p className="text-muted-foreground mb-4">
              This property may have been removed or the ID is incorrect.
            </p>
            <Link href="/properties">
              <Button>Back to Properties</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const occupancyRate = (property.occupiedRooms / property.totalRooms) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/properties">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{property.name}</h1>
          <div className="flex items-center text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {property.address}
          </div>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Property
        </Button>
      </div>

      {/* Property Image and Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <img 
                src={property.image || "/placeholder.svg"} 
                alt={property.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Property Overview</h3>
                <p className="text-muted-foreground mb-4">{property.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Building2 className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">{property.propertyType}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Built {property.yearBuilt}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Home className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">{property.totalArea}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <DoorOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">{property.parkingSpaces} Parking</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Key Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DoorOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Occupancy Rate</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{occupancyRate.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">{property.occupiedRooms}/{property.totalRooms} rooms</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Monthly Revenue</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${property.monthlyRevenue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Avg. Rent/Room</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${Math.round(property.monthlyRevenue / property.totalRooms).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Per month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Manager */}
          <Card>
            <CardHeader>
              <CardTitle>Property Manager</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{property.manager.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.manager.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.manager.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="rooms" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="rooms" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Room Management</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Room
            </Button>
          </div>
          
          <div className="grid gap-4">
            {mockRooms.map((room) => (
              <Card key={room.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <DoorOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Room {room.number}</h4>
                        <p className="text-sm text-muted-foreground">
                          Floor {room.floor} • {room.size} sq ft • ${room.rent}/month
                        </p>
                        {room.tenant && (
                          <p className="text-sm text-muted-foreground">Tenant: {room.tenant}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={
                          room.status === "occupied" ? "default" : 
                          room.status === "vacant" ? "secondary" : "destructive"
                        }
                      >
                        {room.status}
                      </Badge>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Maintenance Requests</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </div>
          
          <div className="grid gap-4">
            {mockMaintenance.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <Wrench className="h-6 w-6 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{request.issue}</h4>
                        <p className="text-sm text-muted-foreground">
                          Room {request.room} • {request.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={
                          request.priority === "High" ? "destructive" :
                          request.priority === "Medium" ? "default" : "secondary"
                        }
                      >
                        {request.priority}
                      </Badge>
                      <Badge variant="outline">
                        {request.status}
                      </Badge>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="financials" className="space-y-4">
          <h3 className="text-lg font-semibold">Financial Overview</h3>
          
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$42,000</div>
                <p className="text-xs text-muted-foreground">Last 3 months</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$8,900</div>
                <p className="text-xs text-muted-foreground">Last 3 months</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">$33,100</div>
                <p className="text-xs text-muted-foreground">Last 3 months</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFinancials.map((month) => (
                  <div key={month.month} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{month.month}</span>
                    <div className="flex gap-6 text-sm">
                      <span className="text-green-600">Revenue: ${month.revenue.toLocaleString()}</span>
                      <span className="text-red-600">Expenses: ${month.expenses.toLocaleString()}</span>
                      <span className="font-semibold">Profit: ${month.profit.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Property Documents</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
          
          <div className="grid gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Receipt className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Property Insurance Policy</h4>
                      <p className="text-sm text-muted-foreground">Updated: March 1, 2024</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Receipt className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Building Permits</h4>
                      <p className="text-sm text-muted-foreground">Updated: January 15, 2024</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}