import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SkipLink, LiveRegion, ErrorBoundary } from "@aidonic/ui";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aidonic Challenge - Distribution Dashboard",
  description: "Web dashboard for managing distributions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <div className="min-h-screen bg-gray-50">
            {/* Skip Link for Accessibility */}
            <SkipLink href="#main-content" />

            {/* Live Region for Announcements */}
            <LiveRegion role="status" ariaLive="polite">
              <div
                id="announcements"
                aria-live="polite"
                className="sr-only"
              ></div>
            </LiveRegion>

            <nav
              className="bg-white shadow-sm border-b"
              role="navigation"
              aria-label="Main navigation"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <Link
                      href="/"
                      className="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                      role="menuitem"
                    >
                      AC
                    </Link>
                  </div>
                  <div className="flex items-center space-x-4" role="menubar">
                    <Link
                      href="/"
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      role="menuitem"
                      aria-current="page"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/distributions"
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      role="menuitem"
                    >
                      Distributions
                    </Link>
                    <Link
                      href="/charts"
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      role="menuitem"
                    >
                      Charts
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
            <main id="main-content" role="main" tabIndex={-1}>
              {children}
            </main>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
