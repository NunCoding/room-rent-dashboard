import { DashboardLayout } from "@/components/dashboard-layout"
import { PropertyManagement } from "@/components/property-management"

interface PropertyManagePageProps {
    params: Promise<{ id: string }>
}

export default async function PropertyManagePage({ params }: PropertyManagePageProps) {
    const { id } = await params

    return (
        <DashboardLayout>
            <PropertyManagement propertyId={id} />
        </DashboardLayout>
    )
}