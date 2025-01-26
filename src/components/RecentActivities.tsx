"use client"

import { useState, useEffect } from "react"
import { Activity, CheckCircle2, AlertCircle, RefreshCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "./Spinner"

interface ActivityItem {
  id: string
  type: string
  description: string
  timestamp: string
}

export default function RecentActivities() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/recent-activities")
        const data = await response.json()
        setActivities(data)
      } catch (error) {
        console.error("Failed to fetch recent activities:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center text-primary">
          <Activity className="mr-2" />
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start space-x-3 border-b border-border pb-3 last:border-b-0">
              <div className="flex-shrink-0">
                <Badge variant={getActivityBadgeVariant(activity.type)}>{getActivityIcon(activity.type)}</Badge>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function getActivityBadgeVariant(type: string): "default" | "secondary" | "destructive" {
  switch (type) {
    case "registration":
      return "default"
    case "scan":
      return "secondary"
    case "update":
      return "destructive"
    default:
      return "default"
  }
}

function getActivityIcon(type: string) {
  switch (type) {
    case "registration":
      return <CheckCircle2 className="h-4 w-4" />
    case "scan":
      return <RefreshCcw className="h-4 w-4" />
    case "update":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <Activity className="h-4 w-4" />
  }
}

