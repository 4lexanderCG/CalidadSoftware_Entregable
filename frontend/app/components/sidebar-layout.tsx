"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users } from "lucide-react";

const navItems = [
    {   href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    {   href: "/users", label: "Usuarios", icon: Users },
];

interface SidebarProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    headerRight?: React.ReactNode;
}

export default function SidebarLayout({ 
    children, 
    title, 
    description, 
    headerRight 
}: SidebarProps) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
             <aside className="w-52 bg-white border-r border-gray-100 flex flex-col fixed top-0 left-0 h-full z-10">
                {/* Logo */}
                <div className="flex items-center gap-2 px-5 py-5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="3" width="7" height="7" rx="1" fill="white" />
                            <rect x="14" y="3" width="7" height="7" rx="1" fill="white" opacity="0.6" />
                            <rect x="3" y="14" width="7" height="7" rx="1" fill="white" opacity="0.6" />
                            <rect x="14" y="14" width="7" height="7" rx="1" fill="white" opacity="0.3" />
                        </svg>
                    </div>
                    <span className="text-base font-bold text-gray-800">CRUD Usuarios</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-2 space-y-1">
                    {navItems.map(({ href, label, icon: Icon }) => {
                        const active = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                    }`}
                            >
                                <Icon size={17} />
                                {label}
                            </Link>
                        );
                    })}
                </nav>


            </aside>

            {/* Main Content */}
            <div className="flex-1 ml-52 flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-100 min-h-20 flex items-center justify-between px-8 py-5">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                        {description && (
                            <p className="text-sm text-gray-500 mt-1">{description}</p>
                        )}
                    </div>
                    {headerRight && <div>{headerRight}</div>}
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8 bg-[#f8fafc]">{children}</main>
            </div>
        </div>
    );
}