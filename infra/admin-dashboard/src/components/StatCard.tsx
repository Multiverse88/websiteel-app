interface StatCardProps {
  title: string
  value: string | number
  icon: string
  trend?: string
}

export default function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-body">
        <div className="stat-card-title">{title}</div>
        <div className="stat-card-value">{value}</div>
        {trend && <div className="stat-card-trend">{trend}</div>}
      </div>
    </div>
  )
}
