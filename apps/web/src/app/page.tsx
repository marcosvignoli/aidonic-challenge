"use client";

import { Button, Card, Input } from "@aidonic/ui";
import { useLocalStorage, useDebounce } from "@aidonic/shared-hooks";
import { formatCurrency } from "@aidonic/shared-utils";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useLocalStorage("user-name", "");
  const [amount, setAmount] = useState("100");
  const debouncedAmount = useDebounce(amount, 500);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Aidonic Challenge
          </h1>
          <p className="text-xl text-gray-600">
            Monorepo with Next.js, React Native, and shared packages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* UI Components Demo */}
          <Card className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              UI Components
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <Input
                  value={name}
                  onChange={setName}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <Input
                  type="number"
                  value={amount}
                  onChange={setAmount}
                  placeholder="Enter amount"
                />
                {debouncedAmount && (
                  <p className="text-sm text-gray-600 mt-1">
                    Formatted: {formatCurrency(Number(debouncedAmount))}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  onClick={() => alert("Primary clicked!")}
                >
                  Primary
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => alert("Secondary clicked!")}
                >
                  Secondary
                </Button>
                <Button
                  variant="outline"
                  onClick={() => alert("Outline clicked!")}
                >
                  Outline
                </Button>
              </div>
            </div>
          </Card>

          {/* Project Structure */}
          <Card className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Project Structure
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>apps/web - Next.js Web App</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>apps/mobile - React Native App</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>apps/docs - Documentation Site</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>packages/ui - Shared UI Components</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>packages/shared-hooks - React Hooks</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                <span>packages/shared-types - TypeScript Types</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                <span>packages/shared-utils - Utility Functions</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Features Demo */}
        <Card className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Features Demo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900">Local Storage</h3>
              <p className="text-sm text-blue-700 mt-1">
                Your name is saved locally: <strong>{name || "Not set"}</strong>
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900">Debounced Input</h3>
              <p className="text-sm text-green-700 mt-1">
                Amount updates after 500ms delay
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900">
                Currency Formatting
              </h3>
              <p className="text-sm text-purple-700 mt-1">
                {formatCurrency(1234.56)}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
