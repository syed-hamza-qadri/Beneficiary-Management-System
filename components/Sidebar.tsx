"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, UserPlus, Search, Users, ScanIcon as Scanner, FileText, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  const toggleSidebar = () => setIsOpen(!isOpen)

  const navItems = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/registration", icon: UserPlus, label: "Registration" },
    { href: "/scanner", icon: Scanner, label: "Token Scanner" },
    { href: "/search", icon: Search, label: "Search" },
    { href: "/users", icon: Users, label: "Users" },
    { href: "/reports", icon: FileText, label: "Reports" },
  ]

  return (
    <>
      <div
        className={cn(
          "bg-sidebar text-card-foreground fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            <span className="text-xl font-bold text-primary">BMS</span>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="fixed top-3 left-4 z-50 md:hidden" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
      </Button>
    </>
  )
}

export default Sidebar

