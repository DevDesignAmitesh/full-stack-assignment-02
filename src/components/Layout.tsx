"use client";

import { Calendar, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-900 font-semibold text-lg"
              >
                <Calendar className="w-5 h-5" />
                Event Management
              </Link>
              <nav className="flex items-center gap-6">
                <Link
                  href="/"
                  className={`text-sm font-medium transition-colors ${
                    pathname === "/"
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Events
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for anything"
                  className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
