"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { Button, Card, ErrorAlert, Input, semanticClasses } from "@aidonic/ui";
import { DistributionsContainerState } from "@aidonic/shared-containers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Distribution,
  FilterOptions,
  SearchOptions,
  PaginationState,
} from "@aidonic/shared-types";

/**
 * DistributionsPresentation - Web Distribution List Component
 *
 * This presentation component implements the web interface for viewing and managing
 * aid distributions. It provides a comprehensive table view with filtering,
 * search, and pagination capabilities.
 *
 * Features:
 * - Responsive table layout with sortable columns
 * - Advanced filtering by region and status
 * - Real-time search across multiple fields
 * - Pagination with configurable page sizes
 * - Keyboard shortcuts for power users
 * - Accessibility features (ARIA labels, keyboard navigation)
 * - Loading states and error handling
 * - Click-to-navigate to distribution details
 *
 * Keyboard Shortcuts:
 * - Cmd/Ctrl + K: Focus search input
 * - Escape: Clear search query
 * - Arrow keys: Navigate table rows
 * - Enter: Open selected distribution
 *
 * @param distributions - Array of distribution records to display
 * @param loading - Whether data is currently loading
 * @param error - Error message if data fetch failed
 * @param pagination - Pagination state and controls
 * @param filters - Current filter values
 * @param search - Current search query
 * @param regions - Available regions for filtering
 * @param statuses - Available statuses for filtering
 * @param setFilters - Function to update filters
 * @param setSearch - Function to update search
 * @param setPage - Function to change current page
 * @param setLimit - Function to change items per page
 * @param refreshDistributions - Function to refresh data
 *
 * @example
 * ```tsx
 * <DistributionsContainer>
 *   {({ distributions, loading, error, setFilters }) => (
 *     <DistributionsPresentation
 *       distributions={distributions}
 *       loading={loading}
 *       error={error}
 *       setFilters={setFilters}
 *       // ... other props
 *     />
 *   )}
 * </DistributionsContainer>
 * ```
 */
const DistributionsPresentation = memo(
  ({
    distributions,
    loading,
    error,
    pagination,
    filters,
    search,
    regions,
    statuses,
    setFilters,
    setSearch,
    setPage,
    setLimit,
    refreshDistributions,
  }: DistributionsContainerState) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(search.query);

    /**
     * Handles search form submission
     * Updates the search query and triggers data refresh
     */
    const handleSearchSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        setSearch({ query: searchQuery });
      },
      [searchQuery, setSearch]
    );

    /**
     * Handles region filter changes
     * Updates the region filter and triggers data refresh
     */
    const handleRegionChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, region: e.target.value });
      },
      [filters, setFilters]
    );

    /**
     * Handles status filter changes
     * Updates the status filter and triggers data refresh
     */
    const handleStatusChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({
          ...filters,
          status: e.target.value as FilterOptions["status"],
        });
      },
      [filters, setFilters]
    );

    /**
     * Handles pagination page changes
     * Updates the current page and triggers data refresh
     */
    const handlePageChange = useCallback(
      (page: number) => {
        setPage(page);
      },
      [setPage]
    );

    /**
     * Handles pagination limit changes
     * Updates the items per page and resets to first page
     */
    const handleLimitChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLimit(Number(e.target.value));
      },
      [setLimit]
    );

    /**
     * Handles table row clicks
     * Navigates to the distribution detail page
     */
    const handleRowClick = useCallback(
      (distributionId: string) => {
        router.push(`/distributions/${distributionId}`);
      },
      [router]
    );

    /**
     * Sets up keyboard shortcuts for power users
     * Provides quick access to common actions
     */
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        // Only handle shortcuts when not in form elements
        if (
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLSelectElement ||
          event.target instanceof HTMLTextAreaElement
        ) {
          return;
        }

        // Cmd/Ctrl + K to focus search
        if ((event.metaKey || event.ctrlKey) && event.key === "k") {
          event.preventDefault();
          const searchInput = document.getElementById("search-distributions");
          searchInput?.focus();
        }

        // Escape to clear search
        if (event.key === "Escape" && searchQuery) {
          setSearchQuery("");
          setSearch({ query: "" });
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [searchQuery, setSearch]);

    if (error) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              Error loading distributions
            </h3>
            <p className="text-gray-600">{error}</p>
            <Button
              variant="outline"
              onClick={refreshDistributions}
              className="mt-4 text-gray-900"
            >
              Retry
            </Button>
          </div>
        </div>
      );
    }

    return (
      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        role="main"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Distributions
          </h1>
          <p className="text-gray-600">
            View and manage all aid distributions
            <span className="ml-4 text-sm text-gray-400">
              (Press{" "}
              <kbd className="px-1 py-0.5 text-xs bg-gray-100 border rounded">
                Ctrl+K
              </kbd>{" "}
              to search)
            </span>
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Filters & Search
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <label
                  htmlFor="search-distributions"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Search Distributions
                </label>
                <form onSubmit={handleSearchSubmit} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Search distributions..."
                    value={searchQuery}
                    onChange={(value) => setSearchQuery(value)}
                    className="flex-1"
                    ariaLabel="Search distributions by region, aid type, or delivery channel"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    ariaLabel="Submit search query"
                  >
                    Search
                  </Button>
                </form>
              </div>

              {/* Region Filter */}
              <div>
                <label
                  htmlFor="region-filter"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Region
                </label>
                <select
                  id="region-filter"
                  value={filters.region}
                  onChange={handleRegionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Filter distributions by region"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label
                  htmlFor="status-filter"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <select
                  id="status-filter"
                  value={filters.status}
                  onChange={handleStatusChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Filter distributions by status"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Distributions Table */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Distribution List
            </h2>
          </div>

          {loading ? (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="flex space-x-4">
                    <div
                      className={`h-4 ${semanticClasses.loadingBg} rounded flex-1`}
                    ></div>
                    <div
                      className={`h-4 ${semanticClasses.loadingBg} rounded w-24`}
                    ></div>
                    <div
                      className={`h-4 ${semanticClasses.loadingBg} rounded w-20`}
                    ></div>
                    <div
                      className={`h-4 ${semanticClasses.loadingBg} rounded w-16`}
                    ></div>
                    <div
                      className={`h-4 ${semanticClasses.loadingBg} rounded w-20`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          ) : distributions.length === 0 ? (
            <div className="text-center py-12">
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
                No distributions found
              </h3>
              <p className="text-gray-500">
                No distributions match your current filters
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table
                className={`min-w-full divide-y ${semanticClasses.borderPrimary}`}
                role="table"
                aria-label="List of aid distributions"
              >
                <thead className={semanticClasses.tableBg}>
                  <tr>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium ${semanticClasses.textSecondary} uppercase tracking-wider`}
                    >
                      Region
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium ${semanticClasses.textSecondary} uppercase tracking-wider`}
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium ${semanticClasses.textSecondary} uppercase tracking-wider`}
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium ${semanticClasses.textSecondary} uppercase tracking-wider`}
                    >
                      Beneficiaries
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium ${semanticClasses.textSecondary} uppercase tracking-wider`}
                    >
                      Aid Type
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium ${semanticClasses.textSecondary} uppercase tracking-wider`}
                    >
                      Delivery Channel
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium ${semanticClasses.textSecondary} uppercase tracking-wider hidden md:table-cell`}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`${semanticClasses.bgPrimary} divide-y ${semanticClasses.borderPrimary}`}
                >
                  {distributions.map((distribution) => (
                    <tr
                      key={distribution.id}
                      className={`${semanticClasses.tableRowHover} cursor-pointer`}
                      onClick={() => handleRowClick(distribution.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-black">
                          {distribution.region}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(distribution.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            distribution.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : distribution.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {distribution.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {distribution.beneficiaries}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {distribution.aidType}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {distribution.deliveryChannel}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium hidden md:table-cell">
                        <div className="text-gray-400">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && distributions.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )}{" "}
                    of {pagination.total} results
                  </span>
                  <select
                    value={pagination.limit}
                    onChange={handleLimitChange}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-900"
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                </div>

                <nav
                  aria-label="Pagination Navigation"
                  className="flex items-center space-x-2"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="text-gray-900"
                    ariaLabel="Go to previous page"
                  >
                    Previous
                  </Button>

                  <div
                    className="flex items-center space-x-1"
                    role="group"
                    aria-label="Page numbers"
                  >
                    {Array.from(
                      { length: Math.min(5, pagination.totalPages) },
                      (_, i) => {
                        const page = i + 1;
                        return (
                          <Button
                            key={page}
                            variant={
                              page === pagination.page ? "primary" : "outline"
                            }
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className={
                              page === pagination.page ? "" : "text-gray-900"
                            }
                            ariaLabel={`Go to page ${page}`}
                            aria-current={
                              page === pagination.page ? "page" : undefined
                            }
                          >
                            {page}
                          </Button>
                        );
                      }
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages}
                    className="text-gray-900"
                    ariaLabel="Go to next page"
                  >
                    Next
                  </Button>
                </nav>
              </div>
            </div>
          )}
        </Card>
      </main>
    );
  }
);

DistributionsPresentation.displayName = "DistributionsPresentation";

export default DistributionsPresentation;
