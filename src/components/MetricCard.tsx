import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, InfoIcon } from 'lucide-react';
import type { MetricCard as MetricCardType } from '../types';

export function MetricCard({ title, value, change, icon: Icon, trend, details }: MetricCardType) {
  const isPositive = trend === 'up';
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm relative group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {details && (
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="ml-1 text-gray-400 hover:text-gray-600"
            >
              <InfoIcon className="w-4 h-4" />
            </button>
          )}
        </div>
        {change !== undefined && (
          <span className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-semibold text-gray-900">{value}</p>
      {showDetails && details && (
        <div className="absolute z-10 mt-2 w-64 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm text-gray-600">{details}</p>
        </div>
      )}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 rounded-b-xl overflow-hidden">
        <div 
          className={`h-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
          style={{ width: `${Math.min(Math.abs(change || 0), 100)}%` }}
        />
      </div>
    </div>
  );
}
