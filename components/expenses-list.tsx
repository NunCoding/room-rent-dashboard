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
import { Plus, Search, DollarSign, Calendar, Tag, TrendingUp, TrendingDown } from "lucide-react"
import { ExpenseForm } from "@/components/forms/expense-form"

const mockExpenses = [
    {
        id: 1,
        description: "Plumbing Repair - Room 202",
        category: "Maintenance",
        property: "Sunset Apartments",
        amount: 450,
        date: "2024-03-15",
        status: "paid",
        vendor: "ABC Plumbing",
    },
    {
        id: 2,
        description: "Property Insurance Premium",
        category: "Insurance",
        property: "All Properties",
        amount: 2400,
        date: "2024-03-01",
        status: "paid",
        vendor: "SafeGuard Insurance",
    },
    {
        id: 3,
        description: "Landscaping Service",
        category: "Maintenance",
        property: "Downtown Plaza",
        amount: 300,
        date: "2024-03-20",
        status: "pending",
        vendor: "Green Thumb Landscaping",
    },
    {
        id: 4,
        description: "HVAC System Maintenance",
        category: "Maintenance",
        property: "Riverside Complex",
        amount: 850,
        date: "2024-03-10",
        status: "paid",
        vendor: "Cool Air HVAC",
    },
    {
        id: 5,
        description: "Property Tax Q1",
        category: "Tax",
        property: "Sunset Apartments",
        amount: 3200,
        date: "2024-03-05",
        status: "paid",
        vendor: "City Tax Office",
    },
    {
        id: 6,
        description: "Elevator Inspection",
        category: "Maintenance",
        property: "Downtown Plaza",
        amount: 500,
        date: "2024-03-25",
        status: "pending",
        vendor: "Lift Tech Services",
    },
]

const categoryColors: Record<string, string> = {
    Maintenance: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Insurance: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    Tax: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Utilities: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
}

export function ExpensesList() {
    const [searchQuery, setSearchQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const totalExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    const paidExpenses = mockExpenses.filter((e) => e.status === "paid").reduce((sum, expense) => sum + expense.amount, 0)
    const pendingExpenses = mockExpenses
        .filter((e) => e.status === "pending")
        .reduce((sum, expense) => sum + expense.amount, 0)

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Expenses</p>
                            <p className="text-2xl font-bold mt-1">${totalExpenses.toLocaleString()}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                        <TrendingUp className="h-4 w-4 text-red-500" />
                        <span>This month</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Paid</p>
                            <p className="text-2xl font-bold mt-1 text-emerald-500">${paidExpenses.toLocaleString()}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <TrendingDown className="h-6 w-6 text-emerald-500" />
                        </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                        {mockExpenses.filter((e) => e.status === "paid").length} transactions
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Pending</p>
                            <p className="text-2xl font-bold mt-1 text-amber-500">${pendingExpenses.toLocaleString()}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-amber-500" />
                        </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                        {mockExpenses.filter((e) => e.status === "pending").length} pending payments
                    </div>
                </Card>
            </div>

            <Card className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search expenses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="insurance">Insurance</SelectItem>
                            <SelectItem value="tax">Tax</SelectItem>
                            <SelectItem value="utilities">Utilities</SelectItem>
                        </SelectContent>
                    </Select>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Add Expense
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Add New Expense</DialogTitle>
                                <DialogDescription>Record a new expense for your property management.</DialogDescription>
                            </DialogHeader>
                            <ExpenseForm onSuccess={() => setIsDialogOpen(false)} />
                        </DialogContent>
                    </Dialog>
                </div>
            </Card>

            <div className="grid gap-4">
                {mockExpenses.map((expense) => (
                    <Card key={expense.id} className="p-6 hover:border-primary/50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-lg">{expense.description}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">{expense.property}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    <Badge variant="outline" className={categoryColors[expense.category]}>
                                        <Tag className="h-3 w-3 mr-1" />
                                        {expense.category}
                                    </Badge>
                                    <span className="text-muted-foreground flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(expense.date).toLocaleDateString()}
                                    </span>
                                    <span className="text-muted-foreground">Vendor: {expense.vendor}</span>
                                    <Badge
                                        variant="outline"
                                        className={
                                            expense.status === "paid"
                                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                        }
                                    >
                                        {expense.status}
                                    </Badge>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-primary">${expense.amount.toLocaleString()}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        View
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
