"use client";

import { Button, Card } from "@aidonic/ui";
import { useDistributions } from "@aidonic/shared-hooks";
import { formatCurrency } from "@aidonic/shared-utils";

export default function Home() {
  const { distributions, loading, error } = useDistributions({
    autoFetch: true,
    page: 1,
    limit: 10,
  });

  const totalAmount = distributions.reduce((sum, dist) => sum + dist.amount, 0);
  const completedCount = distributions.filter(
    (d) => d.status === "completed"
  ).length;
  const pendingCount = distributions.filter(
    (d) => d.status === "pending"
  ).length;
  const failedCount = distributions.filter((d) => d.status === "failed").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Distribution Dashboard
        </h1>
        <p className="text-xl text-gray-600">
          Monitor and manage your distribution activities
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Total Distributions
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {loading ? "..." : distributions.length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Total Amount
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {loading ? "..." : formatCurrency(totalAmount)}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
            <p className="text-3xl font-bold text-green-600">
              {loading ? "..." : completedCount}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {loading ? "..." : pendingCount}
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Distributions */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Distributions
            </h2>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/distributions")}
            >
              View All
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          ) : distributions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No distributions found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {distributions.slice(0, 5).map((distribution) => (
                <div
                  key={distribution.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {distribution.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {distribution.recipient.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {formatCurrency(
                        distribution.amount,
                        distribution.currency
                      )}
                    </p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        distribution.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : distribution.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {distribution.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-4">
            <Button
              variant="primary"
              onClick={() => (window.location.href = "/distributions")}
              className="w-full justify-center"
            >
              View All Distributions
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/charts")}
              className="w-full justify-center"
            >
              View Analytics
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                // In a real app, this would open a create form
                alert(
                  "Create new distribution functionality would be implemented here"
                );
              }}
              className="w-full justify-center"
            >
              Create New Distribution
            </Button>
          </div>

          {/* Status Summary */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Status Summary
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-sm font-medium text-green-600">
                  {completedCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-medium text-yellow-600">
                  {pendingCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Failed</span>
                <span className="text-sm font-medium text-red-600">
                  {failedCount}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Project Info */}
      <Card className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Project Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Technology Stack</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Next.js 15 with App Router</li>
              <li>• React 19 with TypeScript</li>
              <li>• Tailwind CSS for styling</li>
              <li>• Recharts for data visualization</li>
              <li>• Shared packages for reusability</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Features</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Distribution management with filters</li>
              <li>• Detailed distribution views</li>
              <li>• Interactive charts and analytics</li>
              <li>• Responsive design</li>
              <li>• Real-time data updates</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
