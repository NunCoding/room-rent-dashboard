import { DashboardLayout } from "@/components/dashboard-layout"
import { StatsCards } from "@/components/stats-cards"
import { RevenueChart } from "@/components/revenue-chart"
import { RecentPayments } from "@/components/recent-payments"
import { MaintenanceRequests } from "@/components/maintenance-requests"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-balance">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your property overview.</p>
        </div>

        <StatsCards />

        <div className="grid gap-6 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <RevenueChart />
          </div>
          <div className="lg:col-span-3">
            <RecentPayments />
          </div>
        </div>

        <MaintenanceRequests />
      </div>
    </DashboardLayout>
  )
}