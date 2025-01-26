"use client"

import { useState } from "react"
import { Spinner } from "./Spinner"
import { UserPlus, AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    cnic: "",
    name: "",
    phone: "",
    address: "",
    purpose: "",
    gender: "",
    age: "",
    familyMembers: "",
  })
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccessMessage("")
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data.success) {
        setSuccessMessage(`Beneficiary registered successfully. Token: ${data.token}`)
        setFormData({ cnic: "", name: "", phone: "", address: "", purpose: "", gender: "", age: "", familyMembers: "" })
      } else {
        throw new Error(data.message || "Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary flex items-center">
          <UserPlus className="mr-2" />
          Beneficiary Registration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="CNIC" name="cnic" value={formData.cnic} onChange={handleChange} />
            <FormField label="Name" name="name" value={formData.name} onChange={handleChange} />
            <FormField label="Phone" name="phone" value={formData.phone} onChange={handleChange} type="tel" />
            <FormField label="Age" name="age" value={formData.age} onChange={handleChange} type="number" />
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                name="gender"
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <FormField
              label="Family Members"
              name="familyMembers"
              value={formData.familyMembers}
              onChange={handleChange}
              type="number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="min-h-[100px]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Select
              name="purpose"
              value={formData.purpose}
              onValueChange={(value) => setFormData({ ...formData, purpose: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="financial">Financial Aid</SelectItem>
                <SelectItem value="medical">Medical Assistance</SelectItem>
                <SelectItem value="education">Education Support</SelectItem>
                <SelectItem value="food">Food Support</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Spinner /> : "Register Beneficiary"}
          </Button>
        </form>
        {successMessage && (
          <Alert className="mt-4" variant="success">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert className="mt-4" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} id={name} name={name} value={value} onChange={onChange} required />
    </div>
  )
}

