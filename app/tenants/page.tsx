import { DashboardLayout } from "@/components/dashboard-layout"
import { TenantsList } from "@/components/tenants-list"

export default function TenantsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Tenants</h1>
            <p className="text-muted-foreground mt-1">Manage tenant information and rental relationships</p>
          </div>
        </div>
        <TenantsList />
      </div>
    </DashboardLayout>
  )
}