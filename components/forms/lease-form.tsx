"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LeaseFormProps {
  lease?: {
    id: string
    tenantId: string
    roomId: string
    startDate: string
    endDate: string
    rentAmount: number
    securityDeposit: number
    paymentDueDay: number
    status: string
    terms: string
  }
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function LeaseForm({ lease, onSubmit, onCancel }: LeaseFormProps) {
  const [formData, setFormData] = useState({
    tenantId: lease?.tenantId || "",
    roomId: lease?.roomId || "",
    startDate: lease?.startDate || "",
    endDate: lease?.endDate || "",
    rentAmount: lease?.rentAmount || 0,
    securityDeposit: lease?.securityDeposit || 0,
    paymentDueDay: lease?.paymentDueDay || 1,
    status: lease?.status || "active",
    terms: lease?.terms || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lease ? "Edit Lease" : "Create New Lease"}</CardTitle>
        <CardDescription>
          {lease ? "Update lease agreement details" : "Enter details for the new lease agreement"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tenantId">Tenant</Label>
              <Select
                value={formData.tenantId}
                onValueChange={(value) => setFormData({ ...formData, tenantId: value })}
              >
                <SelectTrigger id="tenantId">
                  <SelectValue placeholder="Select tenant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">John Smith</SelectItem>
                  <SelectItem value="2">Sarah Johnson</SelectItem>
                  <SelectItem value="3">Michael Brown</SelectItem>
                  <SelectItem value="4">Emily Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomId">Room</Label>
              <Select value={formData.roomId} onValueChange={(value) => setFormData({ ...formData, roomId: value })}>
                <SelectTrigger id="roomId">
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Room 101 - Sunset Apartments</SelectItem>
                  <SelectItem value="2">Room 205 - Ocean View Complex</SelectItem>
                  <SelectItem value="3">Room 302 - Downtown Residences</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="rentAmount">Monthly Rent ($)</Label>
              <Input
                id="rentAmount"
                type="number"
                min="0"
                step="0.01"
                placeholder="1200.00"
                value={formData.rentAmount}
                onChange={(e) => setFormData({ ...formData, rentAmount: Number.parseFloat(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="securityDeposit">Security Deposit ($)</Label>
              <Input
                id="securityDeposit"
                type="number"
                min="0"
                step="0.01"
                placeholder="2400.00"
                value={formData.securityDeposit}
                onChange={(e) => setFormData({ ...formData, securityDeposit: Number.parseFloat(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentDueDay">Payment Due Day</Label>
              <Input
                id="paymentDueDay"
                type="number"
                min="1"
                max="31"
                placeholder="1"
                value={formData.paymentDueDay}
                onChange={(e) => setFormData({ ...formData, paymentDueDay: Number.parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="terminated">Terminated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="terms">Lease Terms & Conditions</Label>
            <Textarea
              id="terms"
              placeholder="Enter lease terms, conditions, and special agreements..."
              value={formData.terms}
              onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
              rows={6}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{lease ? "Update Lease" : "Create Lease"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
