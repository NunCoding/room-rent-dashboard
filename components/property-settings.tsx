"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { 
  ArrowLeft, 
  MapPin, 
  Building2,
  Users, 
  DollarSign,
  Bell,
  Shield,
  FileText,
  Trash2,
  Save,
  Upload,
  Download,
  Settings,
  Key,
  Mail,
  Phone,
  Calendar,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import Link from "next/link"

// Mock data - same as other components
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
    },
    settings: {
      autoRentReminders: true,
      maintenanceNotifications: true,
      tenantPortalAccess: true,
      latePaymentFees: true,
      securityDeposit: 1500,
      petPolicy: "allowed",
      smokingPolicy: "prohibited",
      maxOccupancy: 2,
      leaseTerms: "12 months",
      rentDueDate: 1,
      gracePeriod: 5,
      lateFeeAmount: 50
    }
  }
]

interface PropertySettingsProps {
  propertyId: string
}

export function PropertySettings({ propertyId }: PropertySettingsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [settings, setSettings] = useState(properties[0]?.settings || {})
  
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
      </div>
    )
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = () => {
    // In a real app, this would save to an API
    console.log("Saving settings:", settings)
    // Show success message
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/properties/${propertyId}/manage`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Settings - {property.name}</h1>
          <div className="flex items-center text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {property.address}
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSaveSettings}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="rental">Rental</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
              <CardDescription>Basic property details and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="property-name">Property Name</Label>
                  <Input id="property-name" defaultValue={property.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="property-type">Property Type</Label>
                  <Select defaultValue={property.propertyType}>
                    <SelectTrigger id="property-type" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartment Complex">Apartment Complex</SelectItem>
                      <SelectItem value="Residential Complex">Residential Complex</SelectItem>
                      <SelectItem value="Luxury Apartments">Luxury Apartments</SelectItem>
                      <SelectItem value="Boutique Residence">Boutique Residence</SelectItem>
                      <SelectItem value="Single Family Home">Single Family Home</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue={property.address} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={property.description} rows={3} />
              </div>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="year-built">Year Built</Label>
                  <Input id="year-built" type="number" defaultValue={property.yearBuilt} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total-area">Total Area</Label>
                  <Input id="total-area" defaultValue={property.totalArea} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parking-spaces">Parking Spaces</Label>
                  <Input id="parking-spaces" type="number" defaultValue={property.parkingSpaces} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Property Manager</CardTitle>
              <CardDescription>Contact information for the property manager</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="manager-name">Manager Name</Label>
                  <Input id="manager-name" defaultValue={property.manager.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager-phone">Phone Number</Label>
                  <Input id="manager-phone" defaultValue={property.manager.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager-email">Email Address</Label>
                  <Input id="manager-email" type="email" defaultValue={property.manager.email} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
              <CardDescription>Property amenities and features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {property.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="px-3 py-1">
                    {amenity}
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-2">
                      ×
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input placeholder="Add new amenity" className="flex-1" />
                <Button>Add</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rental" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rent & Payment Settings</CardTitle>
              <CardDescription>Configure rent amounts, due dates, and payment policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="rent-due-date">Rent Due Date</Label>
                  <Select defaultValue={settings.rentDueDate?.toString()}>
                    <SelectTrigger id="rent-due" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
                        <SelectItem key={day} value={day.toString()}>
                          {day}{day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'} of the month
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grace-period">Grace Period (days)</Label>
                  <Input 
                    id="grace-period" 
                    type="number" 
                    defaultValue={settings.gracePeriod}
                    onChange={(e) => handleSettingChange('gracePeriod', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="late-fee">Late Fee Amount ($)</Label>
                  <Input 
                    id="late-fee" 
                    type="number" 
                    defaultValue={settings.lateFeeAmount}
                    onChange={(e) => handleSettingChange('lateFeeAmount', parseInt(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="security-deposit">Security Deposit ($)</Label>
                  <Input 
                    id="security-deposit" 
                    type="number" 
                    defaultValue={settings.securityDeposit}
                    onChange={(e) => handleSettingChange('securityDeposit', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lease-terms">Default Lease Terms</Label>
                  <Select defaultValue={settings.leaseTerms}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6 months">6 months</SelectItem>
                      <SelectItem value="12 months">12 months</SelectItem>
                      <SelectItem value="18 months">18 months</SelectItem>
                      <SelectItem value="24 months">24 months</SelectItem>
                      <SelectItem value="month-to-month">Month-to-month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Late Payment Fees</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically charge late fees for overdue payments
                  </p>
                </div>
                <Switch 
                  checked={settings.latePaymentFees}
                  onCheckedChange={(checked) => handleSettingChange('latePaymentFees', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure when and how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Rent Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Send automatic rent reminders to tenants before due date
                  </p>
                </div>
                <Switch 
                  checked={settings.autoRentReminders}
                  onCheckedChange={(checked) => handleSettingChange('autoRentReminders', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new maintenance requests are submitted
                  </p>
                </div>
                <Switch 
                  checked={settings.maintenanceNotifications}
                  onCheckedChange={(checked) => handleSettingChange('maintenanceNotifications', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tenant Portal Access</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow tenants to access online portal for payments and requests
                  </p>
                </div>
                <Switch 
                  checked={settings.tenantPortalAccess}
                  onCheckedChange={(checked) => handleSettingChange('tenantPortalAccess', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose which events trigger email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="new-tenant" defaultChecked />
                  <Label htmlFor="new-tenant">New tenant applications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="lease-expiry" defaultChecked />
                  <Label htmlFor="lease-expiry">Lease expiration reminders</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="payment-received" />
                  <Label htmlFor="payment-received">Payment confirmations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="maintenance-complete" defaultChecked />
                  <Label htmlFor="maintenance-complete">Maintenance completion</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Policies</CardTitle>
              <CardDescription>Set rules and policies for your property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pet-policy">Pet Policy</Label>
                  <Select 
                    defaultValue={settings.petPolicy}
                    onValueChange={(value) => handleSettingChange('petPolicy', value)}
                  >
                    <SelectTrigger id="pet-policy" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="allowed">Pets Allowed</SelectItem>
                      <SelectItem value="cats-only">Cats Only</SelectItem>
                      <SelectItem value="dogs-only">Dogs Only</SelectItem>
                      <SelectItem value="prohibited">No Pets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smoking-policy">Smoking Policy</Label>
                  <Select 
                    defaultValue={settings.smokingPolicy}
                    onValueChange={(value) => handleSettingChange('smokingPolicy', value)}
                  >
                    <SelectTrigger id="smoking-policy" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="allowed">Smoking Allowed</SelectItem>
                      <SelectItem value="designated-areas">Designated Areas Only</SelectItem>
                      <SelectItem value="prohibited">No Smoking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-occupancy">Maximum Occupancy per Unit</Label>
                <Input 
                  id="max-occupancy" 
                  type="number" 
                  defaultValue={settings.maxOccupancy}
                  onChange={(e) => handleSettingChange('maxOccupancy', parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>House Rules</CardTitle>
              <CardDescription>Additional rules and guidelines for tenants</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter house rules and guidelines..."
                rows={6}
                defaultValue="• Quiet hours: 10 PM - 8 AM
• No parties or loud gatherings without prior notice
• Keep common areas clean and tidy
• Report maintenance issues promptly
• Respect neighbors and property"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>Manage who has access to property information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Property Manager</p>
                      <p className="text-sm text-muted-foreground">Full access to all features</p>
                    </div>
                  </div>
                  <Badge>Owner</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Maintenance Staff</p>
                      <p className="text-sm text-muted-foreground">Access to maintenance requests only</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              
              <Button className="w-full">
                <Key className="h-4 w-4 mr-2" />
                Add New User
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>Control data sharing and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Share Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow anonymous usage data to improve the platform
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Communications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about new features and services
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Import, export, and backup your property data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline" className="h-20 flex-col">
                  <Upload className="h-6 w-6 mb-2" />
                  Import Data
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Download className="h-6 w-6 mb-2" />
                  Export Data
                </Button>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Last Backup</span>
                </div>
                <p className="text-sm text-muted-foreground">March 15, 2024 at 2:30 PM</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>Connect with third-party services and tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Accounting Software</p>
                    <p className="text-sm text-muted-foreground">QuickBooks, Xero, etc.</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Payment Processing</p>
                    <p className="text-sm text-muted-foreground">Stripe, PayPal, etc.</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Background Checks</p>
                    <p className="text-sm text-muted-foreground">Tenant screening services</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions that affect your property data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Property
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete the property
                      "{property.name}" and remove all associated data including tenants, 
                      rooms, payments, and maintenance records.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
                      Delete Property
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <div className="flex items-start gap-2 p-3 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-destructive">Warning</p>
                  <p className="text-muted-foreground">
                    Deleting this property will remove all data permanently. 
                    Make sure to export any important information first.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}