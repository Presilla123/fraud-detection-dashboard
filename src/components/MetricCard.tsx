import React from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  Info
} from 'lucide-react';
import type { MetricCard as MetricCardType } from '../types';

export function MetricCard({ title, value, change, icon: Icon, trend, details }: MetricCardType) {
  const isPositive = trend === 'up';
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-500">{title}</span>
          {details && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="More Info"
            >
              <Info className="w-4 h-4" />
            </button>
          )}
        </div>
        {typeof change === 'number' && (
          <span
            className={`flex items-center text-sm font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {Math.abs(change)}%
          </span>
        )}
      </div>

      <div className="mt-4 text-2xl font-semibold text-gray-900">{value}</div>

      {showDetails && details && (
        <div className="absolute top-full mt-2 p-3 rounded-lg border shadow bg-white w-64 z-10 text-sm text-gray-600">
          {details}
        </div>
      )}
    </div>
  );
}
