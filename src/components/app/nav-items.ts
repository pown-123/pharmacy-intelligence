import {
  BarChart3,
  Boxes,
  CalendarDays,
  FileUp,
  HeartHandshake,
  PackagePlus,
  ReceiptText,
  Settings,
  ShoppingCart,
  Users
} from "lucide-react";

export const navItems = [
  { label: "Today", href: "/app/today", icon: CalendarDays },
  { label: "Sales", href: "/app/sales", icon: ReceiptText },
  { label: "Inventory", href: "/app/inventory", icon: Boxes },
  { label: "Purchase", href: "/app/purchase", icon: PackagePlus },
  { label: "Customers", href: "/app/customers", icon: Users },
  { label: "Wanted", href: "/app/wanted", icon: HeartHandshake },
  { label: "Upload Data", href: "/app/upload", icon: FileUp },
  { label: "Reports", href: "/app/reports", icon: BarChart3 },
  { label: "Settings", href: "/app/settings", icon: Settings }
] as const;
