"use client";

import { useState } from "react";
import { Spinner } from "./Spinner";
import { Scan, User, CreditCard, FileText, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function TokenScanner() {
  const [tokenId, setTokenId] = useState("");
  const [beneficiaryData, setBeneficiaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/scan-token?id=${tokenId}`);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setBeneficiaryData(null);
      } else {
        setBeneficiaryData(data);
      }
    } catch (error) {
      console.error("Failed to scan token:", error);
      setError("An error occurred while scanning the token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary flex items-center">
          <Scan className="mr-2" />
          Token Scanner
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleScan} className="flex space-x-2 mb-6">
          <Input
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="Enter token ID"
            className="flex-grow"
          />
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner /> : "Scan"}
          </Button>
        </form>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {beneficiaryData && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                Beneficiary Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <DetailItem
                  icon={<User />}
                  label="Name"
                  value={beneficiaryData.name}
                />
                <DetailItem
                  icon={<CreditCard />}
                  label="CNIC"
                  value={beneficiaryData.cnic}
                />
                <DetailItem
                  icon={<FileText />}
                  label="Purpose"
                  value={beneficiaryData.purpose}
                />
                <DetailItem
                  icon={<AlertCircle />}
                  label="Status"
                  value={beneficiaryData.status}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
