import { DashboardLayout } from "@/components/dashboard-layout"
import { PropertySettings } from "@/components/property-settings"

interface PropertySettingsPageProps {
    params: Promise<{ id: string }>
}

export default async function PropertySettingsPage({ params }: PropertySettingsPageProps) {
    const { id } = await params

    return (
        <DashboardLayout>
            <PropertySettings propertyId={id} />
        </DashboardLayout>
    )
}