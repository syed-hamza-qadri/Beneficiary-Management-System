"use client"

import { useState, useEffect } from "react"
import { Spinner } from "./Spinner"

export default function DepartmentActivity() {
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch("/api/department-activity")
        const data = await response.json()
        setActivity(data)
      } catch (error) {
        console.error("Failed to fetch department activity:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="card">
      <h3 className="text-2xl font-semibold mb-4 text-primary">Department Activity</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Department</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Visitors</th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Completed</th>
            </tr>
          </thead>
          <tbody>
            {activity.map((dept: any) => (
              <tr key={dept.name} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{dept.name}</td>
                <td className="py-3 px-4">{dept.visitors}</td>
                <td className="py-3 px-4">{dept.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

