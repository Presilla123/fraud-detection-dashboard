import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, CreditCard, MapPin, Globe, Smartphone } from 'lucide-react';
import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'suspicious':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'fraudulent':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 0.3) return 'bg-green-100 text-green-800';
    if (score < 0.7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
          <div className="flex space-x-2">
            <select className="text-sm border rounded-md px-2 py-1">
              <option>All Types</option>
              <option>Purchase</option>
              <option>Refund</option>
              <option>Chargeback</option>
            </select>
            <select className="text-sm border rounded-md px-2 py-1">
              <option>All Status</option>
              <option>Normal</option>
              <option>Suspicious</option>
              <option>Fraudulent</option>
            </select>
          </div>
        </div>
        <div className="flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="py-5">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(transaction.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {transaction.merchant}
                      </p>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getScoreColor(transaction.score)}`}>
                        Score: {transaction.score.toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {transaction.location}
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-1" />
                        {transaction.cardType} ****{transaction.cardLastFour}
                      </div>
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-1" />
                        {transaction.ipAddress}
                      </div>
                      <div className="flex items-center">
                        <Smartphone className="w-4 h-4 mr-1" />
                        {transaction.deviceId}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className={`text-sm font-semibold ${
                      transaction.transactionType === 'refund' ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {transaction.transactionType === 'refund' ? '-' : ''}${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">{transaction.userEmail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
