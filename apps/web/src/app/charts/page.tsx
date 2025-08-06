"use client";

import { useState, useEffect } from "react";
import { Card } from "@aidonic/ui";
import { useDistributions } from "@aidonic/shared-hooks";
import { formatCurrency } from "@aidonic/shared-utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

export default function ChartsPage() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);

  const { distributions, loading, error } = useDistributions({
    autoFetch: true,
    page: 1,
    limit: 100, // Get more data for charts
  });

  useEffect(() => {
    if (distributions.length > 0) {
      // Prepare data for bar chart (amounts by status)
      const statusData = distributions.reduce((acc: any, dist) => {
        const status = dist.status;
        if (!acc[status]) {
          acc[status] = { status, total: 0, count: 0 };
        }
        acc[status].total += dist.amount;
        acc[status].count += 1;
        return acc;
      }, {});

      const barChartData = Object.values(statusData).map((item: any) => ({
        status: item.status,
        total: item.total,
        count: item.count,
        average: item.total / item.count,
      }));

      // Prepare data for pie chart (distribution by status)
      const pieChartData = Object.values(statusData).map((item: any) => ({
        name: item.status,
        value: item.count,
      }));

      // Prepare time series data (amounts over time)
      const timeData = distributions
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        .map((dist, index) => ({
          date: new Date(dist.createdAt).toLocaleDateString(),
          amount: dist.amount,
          status: dist.status,
          index,
        }));

      setChartData(barChartData);
      setPieData(pieChartData);
      setTimeSeriesData(timeData);
    }
  }, [distributions]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}:{" "}
              {entry.name === "total"
                ? formatCurrency(entry.value)
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Error Loading Charts
            </h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Visualize distribution data with interactive charts
        </p>
      </div>

      {loading ? (
        <Card>
          <div className="text-center py-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading charts...</span>
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Total Distributions
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  {distributions.length}
                </p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Total Amount
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(
                    distributions.reduce((sum, dist) => sum + dist.amount, 0)
                  )}
                </p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Completed
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {distributions.filter((d) => d.status === "completed").length}
                </p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {distributions.filter((d) => d.status === "pending").length}
                </p>
              </div>
            </Card>
          </div>

          {/* Bar Chart - Amounts by Status */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Distribution Amounts by Status
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="total" fill="#8884d8" name="Total Amount" />
                  <Bar dataKey="average" fill="#82ca9d" name="Average Amount" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Pie Chart - Distribution by Status */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Distribution Count by Status
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${((percent || 0) * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Line Chart - Time Series */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Distribution Amounts Over Time
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#8884d8"
                    name="Amount"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Area Chart - Cumulative Amounts */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Cumulative Distribution Amounts
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="Amount"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
