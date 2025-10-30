import { DashboardLayout } from "@/components/dashboard-layout"
import { MaintenanceRequestsList } from "@/components/maintenance-requests-list"

export default function MaintenancePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Maintenance Requests</h1>
            <p className="text-muted-foreground mt-1">Manage and track all maintenance requests</p>
          </div>
        </div>
        <MaintenanceRequestsList />
      </div>
    </DashboardLayout>
  )
}