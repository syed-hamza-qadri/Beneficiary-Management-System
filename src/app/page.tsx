import DashboardMetrics from "../components/DashboardMetrics"
import DepartmentActivity from "../components/DepartmentActivity.jsx"
import RecentActivities from "../components/RecentActivities"

export default function Home() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-primary mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <DashboardMetrics />
          <DepartmentActivity />
        </div>
        <div className="lg:col-span-1">
          <RecentActivities />
        </div>
      </div>
    </div>
  )
}

