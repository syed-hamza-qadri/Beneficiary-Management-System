import SignUpForm from "../../components/SignUpForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-extrabold text-center">Create a new account</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  )
}

