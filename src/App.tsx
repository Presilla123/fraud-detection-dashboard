import React from 'react';
import {
  Activity, AlertTriangle, DollarSign, Percent,
  Users, Shield, Clock, Ban
} from 'lucide-react';

import { MetricCard } from './components/MetricCard';
import { TransactionList } from './components/TransactionList';
import { AlertsList } from './components/AlertsList';

import type {
  Transaction,
  MetricCard as MetricCardType,
  AlertMessage
} from './types';

const mockMetrics: MetricCardType[] = [
  { title: 'Total Transactions', value: '2,543', change: 12, icon: Activity, trend: 'up', details: 'Processed in the last 24 hours' },
  { title: 'Fraud Rate', value: '0.8%', change: -2.3, icon: Percent, trend: 'down', details: 'Flagged as fraudulent' },
  { title: 'Amount Saved', value: '$12,234', change: 8.1, icon: DollarSign, trend: 'up', details: 'Fraud losses prevented' },
  { title: 'High Risk Alerts', value: '5', change: -15, icon: AlertTriangle, trend: 'down', details: 'Need review' },
  { title: 'Active Users', value: '1,234', change: 5.2, icon: Users, trend: 'up', details: 'Users today' },
  { title: 'Security Score', value: '94', change: 2.1, icon: Shield, trend: 'up', details: 'Security rating' },
  { title: 'Avg Response Time', value: '142ms', change: -8.3, icon: Clock, trend: 'down', details: 'Processing speed' },
  { title: 'Blocked Accounts', value: '23', change: 15.4, icon: Ban, trend: 'up', details: 'Blocked for suspicious activity' }
];

const mockTransactions: Transaction[] = [
  {
    id: '1', amount: 299.99, timestamp: new Date().toISOString(), status: 'normal',
    score: 0.2, merchant: 'Electronics Store', location: 'New York, USA',
    cardType: 'Visa', cardLastFour: '4242', ipAddress: '192.168.1.1', deviceId: 'iPhone12',
    userEmail: 'Thummapresilla@outlook.com', transactionType: 'purchase'
  },
  {
    id: '2', amount: 1299.99, timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'suspicious',
    score: 0.7, merchant: 'Online Marketplace', location: 'London, UK',
    cardType: 'Mastercard', cardLastFour: '5555', ipAddress: '10.0.0.1', deviceId: 'Chrome-Windows',
    userEmail: 'Thummapresilla@outlook.com', transactionType: 'purchase'
  },
  {
    id: '3', amount: 499.99, timestamp: new Date(Date.now() - 7200000).toISOString(), status: 'fraudulent',
    score: 0.9, merchant: 'Digital Services', location: 'Remote',
    cardType: 'Amex', cardLastFour: '0001', ipAddress: '172.16.0.1', deviceId: 'Unknown',
    userEmail: 'Thummapresilla@outlook.com', transactionType: 'purchase'
  }
];

const mockAlerts: AlertMessage[] = [
  {
    id: '1', message: 'Multiple high-value transactions detected from same IP', severity: 'high',
    timestamp: new Date().toISOString(), category: 'pattern', affectedUser: 'Thummapresilla@outlook.com',
    recommendedAction: 'Review transactions and contact user', status: 'new'
  },
  {
    id: '2', message: 'Unusual location detected for user account', severity: 'medium',
    timestamp: new Date(Date.now() - 1800000).toISOString(), category: 'location', affectedUser: 'Thummapresilla@outlook.com',
    recommendedAction: 'Verify user identity', status: 'investigating'
  },
  {
    id: '3', message: 'Transaction pattern differs from user history', severity: 'low',
    timestamp: new Date(Date.now() - 3600000).toISOString(), category: 'pattern', affectedUser: 'Thummapresilla@outlook.com',
    recommendedAction: 'Monitor for additional suspicious activity', status: 'resolved'
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Fraud Detection Dashboard</h1>
          <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockMetrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionList transactions={mockTransactions} />
          <AlertsList alerts={mockAlerts} />
        </div>

      </div>
    </div>
  );
}

export default App;
