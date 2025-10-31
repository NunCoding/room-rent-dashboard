"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
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
  Settings,
  UserPlus,
  FileText,
  Eye,
  Send,
  Download,
} from "lucide-react";
import Link from "next/link";
import { RoomForm } from "@/components/forms/room-form";
import { TenantForm } from "@/components/forms/tenant-form";
import { MaintenanceForm } from "@/components/forms/maintenance-form";

// Mock data - same as property-details
const properties = [
  {
    id: "1",
    name: "Sunset Apartments",
    address: "123 Main Street, Downtown",
    totalRooms: 12,
    occupiedRooms: 10,
    monthlyRevenue: 14400,
    image: "/property/sunset.png",
    description:
      "Modern apartment complex with excellent amenities and prime downtown location.",
    yearBuilt: 2018,
    propertyType: "Apartment Complex",
    totalArea: "15,000 sq ft",
    parkingSpaces: 24,
    amenities: ["Swimming Pool", "Gym", "Laundry", "Security", "Elevator"],
    manager: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah@sunsetapts.com",
    },
  },
  {
    id: "2",
    name: "Riverside Complex",
    address: "456 River Road, Westside",
    totalRooms: 8,
    occupiedRooms: 7,
    monthlyRevenue: 10500,
    image: "/property/russey-kao.png",
    description:
      "Peaceful riverside location with scenic views and modern facilities.",
    yearBuilt: 2020,
    propertyType: "Residential Complex",
    totalArea: "12,000 sq ft",
    parkingSpaces: 16,
    amenities: ["River View", "Garden", "Parking", "Security"],
    manager: {
      name: "Mike Chen",
      phone: "+1 (555) 987-6543",
      email: "mike@riverside.com",
    },
  },
  {
    id: "3",
    name: "Green Valley Residences",
    address: "789 Valley Drive, Northside",
    totalRooms: 16,
    occupiedRooms: 14,
    monthlyRevenue: 19200,
    image: "/property/green-valley.png",
    description:
      "Luxury residences in a quiet valley setting with premium amenities.",
    yearBuilt: 2019,
    propertyType: "Luxury Apartments",
    totalArea: "20,000 sq ft",
    parkingSpaces: 32,
    amenities: ["Pool", "Spa", "Concierge", "Gym", "Garden", "Security"],
    manager: {
      name: "Emily Davis",
      phone: "+1 (555) 456-7890",
      email: "emily@greenvalley.com",
    },
  },
  {
    id: "4",
    name: "Toul House",
    address: "321 Center Avenue, City Center",
    totalRooms: 6,
    occupiedRooms: 6,
    monthlyRevenue: 7200,
    image: "/property/toul-house.png",
    description:
      "Boutique residential building in the heart of the city center.",
    yearBuilt: 2017,
    propertyType: "Boutique Residence",
    totalArea: "8,000 sq ft",
    parkingSpaces: 12,
    amenities: ["Rooftop Terrace", "Security", "Elevator"],
    manager: {
      name: "David Kim",
      phone: "+1 (555) 321-0987",
      email: "david@toulhouse.com",
    },
  },
];

// Mock management data
const mockTenants = [
  {
    id: 1,
    name: "John Smith",
    room: "101",
    phone: "+1 (555) 111-1111",
    email: "john@email.com",
    leaseEnd: "2024-12-31",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Doe",
    room: "102",
    phone: "+1 (555) 222-2222",
    email: "jane@email.com",
    leaseEnd: "2024-11-30",
    status: "active",
  },
  {
    id: 3,
    name: "Bob Wilson",
    room: "201",
    phone: "+1 (555) 333-3333",
    email: "bob@email.com",
    leaseEnd: "2025-01-15",
    status: "active",
  },
  {
    id: 4,
    name: "Alice Brown",
    room: "202",
    phone: "+1 (555) 444-4444",
    email: "alice@email.com",
    leaseEnd: "2024-10-31",
    status: "notice",
  },
];

const mockRooms = [
  {
    id: 1,
    number: "101",
    floor: 1,
    size: 850,
    rent: 1200,
    status: "occupied",
    tenant: "John Smith",
    lastInspection: "2024-02-15",
  },
  {
    id: 2,
    number: "102",
    floor: 1,
    size: 900,
    rent: 1300,
    status: "occupied",
    tenant: "Jane Doe",
    lastInspection: "2024-02-20",
  },
  {
    id: 3,
    number: "103",
    floor: 1,
    size: 750,
    rent: 1100,
    status: "vacant",
    tenant: null,
    lastInspection: "2024-03-01",
  },
  {
    id: 4,
    number: "201",
    floor: 2,
    size: 850,
    rent: 1200,
    status: "occupied",
    tenant: "Bob Wilson",
    lastInspection: "2024-01-30",
  },
  {
    id: 5,
    number: "202",
    floor: 2,
    size: 900,
    rent: 1300,
    status: "occupied",
    tenant: "Alice Brown",
    lastInspection: "2024-02-10",
  },
  {
    id: 6,
    number: "203",
    floor: 2,
    size: 750,
    rent: 1100,
    status: "maintenance",
    tenant: null,
    lastInspection: "2024-03-05",
  },
];

const mockMaintenanceRequests = [
  {
    id: 1,
    room: "101",
    tenant: "John Smith",
    issue: "Leaky faucet",
    priority: "Medium",
    status: "In Progress",
    date: "2024-03-15",
    assignedTo: "Mike's Plumbing",
  },
  {
    id: 2,
    room: "203",
    tenant: null,
    issue: "AC not working",
    priority: "High",
    status: "Pending",
    date: "2024-03-18",
    assignedTo: null,
  },
  {
    id: 3,
    room: "102",
    tenant: "Jane Doe",
    issue: "Light bulb replacement",
    priority: "Low",
    status: "Completed",
    date: "2024-03-10",
    assignedTo: "Maintenance Team",
  },
];

const mockPayments = [
  {
    id: 1,
    tenant: "John Smith",
    room: "101",
    amount: 1200,
    dueDate: "2024-03-01",
    paidDate: "2024-02-28",
    status: "paid",
  },
  {
    id: 2,
    tenant: "Jane Doe",
    room: "102",
    amount: 1300,
    dueDate: "2024-03-01",
    paidDate: "2024-03-02",
    status: "paid",
  },
  {
    id: 3,
    tenant: "Bob Wilson",
    room: "201",
    amount: 1200,
    dueDate: "2024-03-01",
    paidDate: null,
    status: "overdue",
  },
  {
    id: 4,
    tenant: "Alice Brown",
    room: "202",
    amount: 1300,
    dueDate: "2024-04-01",
    paidDate: null,
    status: "pending",
  },
];

interface PropertyManagementProps {
  propertyId: string;
}

export function PropertyManagement({ propertyId }: PropertyManagementProps) {
  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false);
  const [isTenantDialogOpen, setIsTenantDialogOpen] = useState(false);
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);

  const property = properties.find((p) => p.id === propertyId);

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
            <p className="text-muted-foreground">
              The requested property could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/properties/${propertyId}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Manage {property.name}</h1>
          <div className="flex items-center text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {property.address}
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/properties/${propertyId}`}>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>
          <Link href={`/properties/${propertyId}/settings`}>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Property Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Dialog open={isRoomDialogOpen} onOpenChange={setIsRoomDialogOpen}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <DoorOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Add Room</h3>
                <p className="text-sm text-muted-foreground">
                  Create new rental unit
                </p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>
                Create a new rental unit for this property.
              </DialogDescription>
            </DialogHeader>
            <RoomForm
              onSuccess={() => setIsRoomDialogOpen(false)}
              onCancel={() => setIsRoomDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={isTenantDialogOpen} onOpenChange={setIsTenantDialogOpen}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <UserPlus className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Add Tenant</h3>
                <p className="text-sm text-muted-foreground">
                  Register new tenant
                </p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Tenant</DialogTitle>
              <DialogDescription>
                Register a new tenant for this property.
              </DialogDescription>
            </DialogHeader>
            <TenantForm
              onSuccess={() => setIsTenantDialogOpen(false)}
              onCancel={() => setIsTenantDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={isMaintenanceDialogOpen}
          onOpenChange={setIsMaintenanceDialogOpen}
        >
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Wrench className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Maintenance Request</h3>
                <p className="text-sm text-muted-foreground">
                  Report maintenance issue
                </p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>New Maintenance Request</DialogTitle>
              <DialogDescription>
                Report a maintenance issue for this property.
              </DialogDescription>
            </DialogHeader>
            <MaintenanceForm
              onSuccess={() => setIsMaintenanceDialogOpen(false)}
              onCancel={() => setIsMaintenanceDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold">Generate Report</h3>
            <p className="text-sm text-muted-foreground">
              Property performance report
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="tenants" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>

        <TabsContent value="tenants" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Tenant Management</h3>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export List
              </Button>
              <Button onClick={() => setIsTenantDialogOpen(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Tenant
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {mockTenants.map((tenant) => (
              <Card key={tenant.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{tenant.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Room {tenant.room}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {tenant.phone}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {tenant.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          Lease ends: {tenant.leaseEnd}
                        </p>
                        <Badge
                          variant={
                            tenant.status === "active"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {tenant.status}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Mail className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Room Management</h3>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Inspection
              </Button>
              <Button onClick={() => setIsRoomDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Room
              </Button>
            </div>
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
                          Floor {room.floor} • {room.size} sq ft • ${room.rent}
                          /month
                        </p>
                        {room.tenant && (
                          <p className="text-sm text-muted-foreground">
                            Tenant: {room.tenant}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Last inspection: {room.lastInspection}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          room.status === "occupied"
                            ? "default"
                            : room.status === "vacant"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {room.status}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Calendar className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Maintenance Management</h3>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Maintenance
              </Button>
              <Button onClick={() => setIsMaintenanceDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {mockMaintenanceRequests.map((request) => (
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
                          Room {request.room} • {request.tenant || "Vacant"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Reported: {request.date}
                          {request.assignedTo &&
                            ` • Assigned to: ${request.assignedTo}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          request.priority === "High"
                            ? "destructive"
                            : request.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {request.priority}
                      </Badge>
                      <Badge variant="outline">{request.status}</Badge>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Payment Management</h3>
            <div className="flex gap-2">
              <Button variant="outline">
                <Send className="h-4 w-4 mr-2" />
                Send Reminders
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {mockPayments.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{payment.tenant}</h4>
                        <p className="text-sm text-muted-foreground">
                          Room {payment.room} • ${payment.amount}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Due: {payment.dueDate}
                          {payment.paidDate && ` • Paid: ${payment.paidDate}`}
                        </p>
                        <Badge
                          className="mt-2 px-2 py-1"
                          variant={
                            payment.status === "paid"
                              ? "default"
                              : payment.status === "overdue"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Send className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Communications</h3>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Send Announcement
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Message</CardTitle>
                <CardDescription>
                  Send a message to tenants or staff
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-tenants">All Tenants</SelectItem>
                      <SelectItem value="specific-tenant">
                        Specific Tenant
                      </SelectItem>
                      <SelectItem value="maintenance-team">
                        Maintenance Team
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Message subject" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message..."
                    rows={4}
                  />
                </div>
                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Communications</CardTitle>
                <CardDescription>
                  Latest messages and announcements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Maintenance Notice
                      </span>
                      <span className="text-xs text-muted-foreground">
                        2 days ago
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Scheduled maintenance for elevator on March 20th
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Rent Reminder</span>
                      <span className="text-xs text-muted-foreground">
                        1 week ago
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Monthly rent payment reminder sent to all tenants
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Welcome Message
                      </span>
                      <span className="text-xs text-muted-foreground">
                        2 weeks ago
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Welcome message sent to new tenant in Room 103
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
