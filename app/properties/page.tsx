import { DashboardLayout } from "@/components/dashboard-layout"
import { PropertiesList } from "@/components/properties-list"

export default function PropertiesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Properties</h1>
            <p className="text-muted-foreground mt-1">Manage your property portfolio and real estate assets</p>
          </div>
        </div>
        <PropertiesList />
      </div>
    </DashboardLayout>
  )
}