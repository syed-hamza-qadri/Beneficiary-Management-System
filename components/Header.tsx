import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center w-1/3">{/* Menu button will be here */}</div>
          <div className="flex items-center justify-center w-1/3">
            <span className="text-2xl font-bold text-primary md:hidden">BMS</span>
          </div>
          <div className="flex items-center justify-end space-x-4 w-1/3">
            <ThemeToggle />
            <Link href="/login" className="hidden sm:inline-block">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup" className="hidden sm:inline-block">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

