"use client"

import { useState, useEffect } from "react"
import { Spinner } from "./Spinner"

export default function DashboardMetrics() {
  const [metrics, setMetrics] = useState({
    totalVisitors: 0,
    newBeneficiaries: 0,
    returningBeneficiaries: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/metrics")
        const data = await response.json()
        setMetrics(data)
      } catch (error) {
        console.error("Failed to fetch metrics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard title="Total Visitors" value={metrics.totalVisitors} />
      <MetricCard title="New Beneficiaries" value={metrics.newBeneficiaries} />
      <MetricCard title="Returning Beneficiaries" value={metrics.returningBeneficiaries} />
    </div>
  )
}

function MetricCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
      <p className="text-4xl font-bold text-foreground">{value}</p>
    </div>
  )
}

