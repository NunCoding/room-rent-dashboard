import { DashboardLayout } from "@/components/dashboard-layout"
import { RoomsList } from "@/components/rooms-list"

export default function RoomsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Rooms</h1>
            <p className="text-muted-foreground mt-1">Manage individual rooms and rental units</p>
          </div>
        </div>
        <RoomsList />
      </div>
    </DashboardLayout>
  )
}