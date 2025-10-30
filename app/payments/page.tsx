import { DashboardLayout } from "@/components/dashboard-layout"
import { PaymentsList } from "@/components/payments-list"

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Payments</h1>
            <p className="text-muted-foreground mt-1">Track rent payments and financial transactions</p>
          </div>
        </div>
        <PaymentsList />
      </div>
    </DashboardLayout>
  )
}