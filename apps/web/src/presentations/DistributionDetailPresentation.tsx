"use client";

import { useRouter } from "next/navigation";
import { Button, Card } from "@aidonic/ui";
import { formatCurrency } from "@aidonic/shared-utils";
import { DistributionDetailContainerState } from "@aidonic/shared-containers";

const DistributionDetailPresentation: React.FC<
  DistributionDetailContainerState
> = ({ loading, error, distribution, refreshDistribution }) => {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <div className="text-center py-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">
                Loading distribution...
              </span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Error Loading Distribution
            </h2>
            <p className="text-gray-600">{error}</p>
            <Button
              variant="primary"
              onClick={refreshDistribution}
              className="mt-4"
            >
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!distribution) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Distribution Not Found
            </h2>
            <p className="text-gray-500">
              The distribution you're looking for doesn't exist.
            </p>
            <Button
              variant="primary"
              onClick={() => router.push("/distributions")}
              className="mt-4"
            >
              Back to Distributions
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="outline"
              onClick={() => router.push("/distributions")}
              className="mb-4"
            >
              ← Back to Distributions
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {distribution.name}
            </h1>
            <p className="text-gray-600">Distribution ID: {distribution.id}</p>
          </div>
          <div className="text-right">
            <span
              className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                distribution.status
              )}`}
            >
              {distribution.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Distribution Details */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Distribution Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <p className="mt-1 text-sm text-gray-900">{distribution.name}</p>
            </div>
            {distribution.description && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {distribution.description}
                </p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {formatCurrency(distribution.amount, distribution.currency)}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <p className="mt-1 text-sm text-gray-900">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    distribution.status
                  )}`}
                >
                  {distribution.status}
                </span>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Created
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(distribution.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Updated
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(distribution.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        {/* Recipient Details */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recipient Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {distribution.recipient.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {distribution.recipient.email}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recipient ID
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {distribution.recipient.id}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Member Since
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(
                  distribution.recipient.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
            {distribution.recipient.avatar && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Avatar
                </label>
                <div className="mt-1">
                  <img
                    src={distribution.recipient.avatar}
                    alt={distribution.recipient.name}
                    className="h-12 w-12 rounded-full"
                  />
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Actions */}
      <Card className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions</h2>
        <div className="flex space-x-4">
          <Button
            variant="primary"
            onClick={() => {
              // In a real app, this would trigger an action
              alert("Edit functionality would be implemented here");
            }}
          >
            Edit Distribution
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              // In a real app, this would trigger an action
              alert("Duplicate functionality would be implemented here");
            }}
          >
            Duplicate
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              // In a real app, this would trigger an action
              if (
                confirm("Are you sure you want to delete this distribution?")
              ) {
                alert("Delete functionality would be implemented here");
              }
            }}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DistributionDetailPresentation;
