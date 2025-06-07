// Dashboard page using new modular layout and UI components
import { AppLayout } from "@/components/layout/app-layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { HomeIcon, ShoppingBagIcon, UsersIcon, ChartBarIcon, CubeIcon, BellIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

// Sidebar navigation items
const navItems = [
  { label: "Dashboard", href: "/", icon: <HomeIcon className="w-5 h-5" />, active: true },
  { label: "Inventory", href: "/inventory", icon: <CubeIcon className="w-5 h-5" /> },
  { label: "Orders", href: "/orders", icon: <ShoppingBagIcon className="w-5 h-5" /> },
  { label: "Vendors", href: "/vendors", icon: <UsersIcon className="w-5 h-5" /> },
  { label: "Customers", href: "/customers", icon: <UsersIcon className="w-5 h-5" /> },
  { label: "Analytics", href: "/analytics", icon: <ChartBarIcon className="w-5 h-5" /> },
  { label: "Notifications", href: "/notifications", icon: <BellIcon className="w-5 h-5" /> },
  { label: "Settings", href: "/settings", icon: <Cog6ToothIcon className="w-5 h-5" /> },
];

// Stat cards data
const stats = [
  {
    label: "Total Revenue",
    value: "$127,350",
    change: "+12.5% from last month",
    changeColor: "text-green-600",
    icon: "$",
    cardClass: "bg-white dark:bg-zinc-900",
  },
  {
    label: "Active Orders",
    value: "1,248",
    change: "+8.2% from last month",
    changeColor: "text-green-600",
    icon: <ShoppingBagIcon className="w-6 h-6 text-rose-400" />,
    cardClass: "bg-white dark:bg-zinc-900",
  },
  {
    label: "Products in Stock",
    value: "5,672",
    change: "-2.1% from last month",
    changeColor: "text-red-600",
    icon: <CubeIcon className="w-6 h-6 text-gray-400" />,
    cardClass: "bg-white dark:bg-zinc-900",
  },
  {
    label: "Active Vendors",
    value: "89",
    change: "+5.4% from last month",
    changeColor: "text-green-600",
    icon: <UsersIcon className="w-6 h-6 text-gray-400" />,
    cardClass: "bg-white dark:bg-zinc-900",
  },
];

// Recent orders data
const recentOrders = [
  { id: "#ORD-001", customer: "John Smith", product: "Wireless Headphones", date: "2024-06-04", status: "Shipped", price: "$299", statusColor: "bg-emerald-100 text-emerald-700" },
  { id: "#ORD-002", customer: "Sarah Johnson", product: "Smartphone Case", date: "2024-06-04", status: "Processing", price: "$49", statusColor: "bg-yellow-100 text-yellow-700" },
  { id: "#ORD-003", customer: "Mike Wilson", product: "Bluetooth Speaker", date: "2024-06-04", status: "Delivered", price: "$199", statusColor: "bg-green-100 text-green-700" },
];

export default function Home() {
  return (
    <AppLayout navItems={navItems} title="Dashboard">
      {/* Stat cards section - legacy DropCart style */}
      <section className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
              changeColor={stat.changeColor}
              className={
                // Emulate legacy DropCart card look
                `flex flex-row items-center gap-4 p-6 rounded-2xl shadow border bg-white dark:bg-zinc-900 ${stat.cardClass}`
              }
            />
          ))}
        </div>
      </section>

      {/* Recent Orders section - legacy DropCart style */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Recent Orders</h2>
          <a href="/orders" className="text-sm text-primary font-medium hover:underline">View all</a>
        </div>
        <div className="rounded-2xl border bg-white dark:bg-zinc-900 shadow p-0">
          <RecentOrders orders={recentOrders} />
        </div>
      </section>
    </AppLayout>
  );
}
