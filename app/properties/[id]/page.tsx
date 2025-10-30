import { DashboardLayout } from "@/components/dashboard-layout"
import { PropertyDetails } from "@/components/property-details"

interface PropertyPageProps {
    params: Promise<{ id: string }>
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
    const { id } = await params

    return (
        <DashboardLayout>
            <PropertyDetails propertyId={id} />
        </DashboardLayout>
    )
}