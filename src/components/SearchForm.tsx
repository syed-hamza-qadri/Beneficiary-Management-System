"use client"

import { useState } from "react"
import { Search, User, CreditCard, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`/api/search?term=${searchTerm}`)
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary flex items-center">
          <Search className="mr-2" />
          Search Beneficiaries
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-6">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by CNIC, phone, or name"
            className="flex-grow"
          />
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? "Searching..." : "Search"}
          </Button>
        </form>

        {searchResults.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>CNIC</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Purpose</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchResults.map((result: any) => (
                <TableRow key={result.cnic}>
                  <TableCell className="flex items-center">
                    <User className="mr-2" size={16} />
                    {result.name}
                  </TableCell>
                  <TableCell>
                    <CreditCard className="mr-2 inline" size={16} />
                    {result.cnic}
                  </TableCell>
                  <TableCell>
                    <Phone className="mr-2 inline" size={16} />
                    {result.phone}
                  </TableCell>
                  <TableCell>{result.purpose}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

