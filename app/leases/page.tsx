import { DashboardLayout } from "@/components/dashboard-layout"
import { LeasesList } from "@/components/leases-list"

export default function LeasesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Leases</h1>
            <p className="text-muted-foreground mt-1">Track and manage all lease agreements</p>
          </div>
        </div>
        <LeasesList />
      </div>
    </DashboardLayout>
  )
}