"use client"

import { useState } from "react"
import { Spinner } from "./Spinner"
import { FileText, Download, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function ReportGenerator() {
  const [reportType, setReportType] = useState("")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [loading, setLoading] = useState(false)
  const [reportUrl, setReportUrl] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportType, dateRange }),
      })
      const data = await response.json()
      setReportUrl(data.reportUrl)
    } catch (error) {
      console.error("Failed to generate report:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary flex items-center">
          <FileText className="mr-2" />
          Generate Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="reportType">Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beneficiary">Beneficiary Report</SelectItem>
                <SelectItem value="department">Department Activity Report</SelectItem>
                <SelectItem value="financial">Financial Aid Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="date"
                  id="startDate"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="date"
                  id="endDate"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Spinner /> : "Generate Report"}
          </Button>
        </form>
        {reportUrl && (
          <div className="mt-6">
            <Button variant="outline" className="w-full flex items-center justify-center" asChild>
              <a href={reportUrl} download>
                <Download className="mr-2" />
                Download Report
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

