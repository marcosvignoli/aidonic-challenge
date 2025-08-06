"use client";

import { Button, Card, ErrorAlert, Skeleton } from "@aidonic/ui";
import { formatCurrency } from "@aidonic/shared-utils";
import { DashboardContainerState } from "@aidonic/shared-containers";

const DashboardPresentation: React.FC<DashboardContainerState> = ({
  loading,
  error,
  recentDistributions,
  statusCounts,
  totalAmount,
  refreshData,
}) => {
  // Show skeleton loading for stats
  const renderStats = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }, (_, i) => (
            <Card key={i}>
              <div className="text-center">
                <Skeleton className="h-6 w-32 mx-auto mb-2" />
                <Skeleton className="h-8 w-20 mx-auto" />
              </div>
            </Card>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Total Distributions
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {recentDistributions.length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Total Amount
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(totalAmount)}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
            <p className="text-3xl font-bold text-green-600">
              {statusCounts.completed}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {statusCounts.pending}
            </p>
          </div>
        </Card>
      </div>
    );
  };

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

      {/* Error Alert */}
      {error && (
        <div className="mb-6">
          <ErrorAlert
            error={error}
            title="Failed to load distributions"
            onRetry={refreshData}
            onDismiss={() => {}}
          />
        </div>
      )}

      {/* Quick Stats */}
      {renderStats()}

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
            <div className="space-y-4">
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentDistributions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No distributions found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentDistributions.slice(0, 5).map((distribution) => (
                <div
                  key={distribution.id}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {distribution.recipient.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {distribution.recipient.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(distribution.amount)}
                      </p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Status Overview */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Status Overview
          </h2>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">
                  {statusCounts.completed}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pending</span>
                <span className="font-semibold text-yellow-600">
                  {statusCounts.pending}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Failed</span>
                <span className="font-semibold text-red-600">
                  {statusCounts.failed}
                </span>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DashboardPresentation;
