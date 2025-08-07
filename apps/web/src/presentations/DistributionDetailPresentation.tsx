"use client";

import { Button, Card, ErrorAlert } from "@aidonic/ui";
import { DistributionDetailContainerState } from "@aidonic/shared-containers";
import Link from "next/link";

const DistributionDetailPresentation: React.FC<
  DistributionDetailContainerState
> = ({ distribution, loading, error, refreshDistribution }) => {
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error loading distribution
          </h3>
          <p className="text-gray-600">{error}</p>
          <Button
            variant="outline"
            onClick={refreshDistribution}
            className="mt-4 text-gray-900"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!distribution) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Distribution not found
          </h3>
          <p className="text-gray-500">
            The distribution you're looking for doesn't exist
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {distribution.region} Distribution
            </h1>
            <p className="text-gray-600">Distribution ID: {distribution.id}</p>
          </div>
          <Link
            href="/distributions"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back
          </Link>
        </div>
      </div>

      {/* Distribution Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Distribution Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Region
              </label>
              <p className="mt-1 text-lg text-gray-900">
                {distribution.region}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                Date
              </label>
              <p className="mt-1 text-lg text-gray-900">
                {new Date(distribution.date).toLocaleDateString()}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                Status
              </label>
              <span
                className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mt-1 ${
                  distribution.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : distribution.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                }`}
              >
                {distribution.status}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                Total Beneficiaries
              </label>
              <p className="mt-1 text-lg text-gray-900">
                {distribution.beneficiaries}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                Aid Type
              </label>
              <p className="mt-1 text-lg text-gray-900">
                {distribution.aidType}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                Delivery Channel
              </label>
              <p className="mt-1 text-lg text-gray-900">
                {distribution.deliveryChannel}
              </p>
            </div>
          </div>
        </Card>

        {/* Beneficiary List */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Beneficiary List
          </h2>

          {distribution.beneficiaryList &&
          distribution.beneficiaryList.length > 0 ? (
            <div className="space-y-3">
              {distribution.beneficiaryList.map((beneficiary) => (
                <div
                  key={beneficiary.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {beneficiary.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {beneficiary.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {beneficiary.id}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No beneficiaries listed
              </h3>
              <p className="text-gray-500">
                No beneficiary information is available for this distribution
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DistributionDetailPresentation;
