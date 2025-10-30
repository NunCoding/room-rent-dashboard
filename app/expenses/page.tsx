import { DashboardLayout } from "@/components/dashboard-layout"
import { ExpensesList } from "@/components/expenses-list"

export default function ExpensesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Expenses</h1>
            <p className="text-muted-foreground mt-1">Track and manage all your property expenses.</p>
          </div>
        </div>
        <ExpensesList />
      </div>
    </DashboardLayout>
  )
}