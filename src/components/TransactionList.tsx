import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, CreditCard, MapPin, Globe, Smartphone } from 'lucide-react';
import type { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: Props) {
  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'suspicious': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'fraudulent': return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getScoreBadge = (score: number) => {
    if (score < 0.3) return 'bg-green-100 text-green-800';
    if (score < 0.7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        <div className="space-x-2 text-sm">
          <select className="border rounded px-2 py-1"><option>All Types</option></select>
          <select className="border rounded px-2 py-1"><option>All Status</option></select>
        </div>
      </div>
      <ul className="divide-y">
        {transactions.map(tx => (
          <li key={tx.id} className="py-4 flex gap-4">
            <div>{getStatusIcon(tx.status)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{tx.merchant}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getScoreBadge(tx.score)}`}>
                  Score: {tx.score.toFixed(2)}
                </span>
              </div>
              <div className="mt-1 flex gap-4 text-sm text-gray-500 flex-wrap">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{tx.location}</span>
                <span className="flex items-center"><CreditCard className="w-4 h-4 mr-1" />{tx.cardType} ****{tx.cardLastFour}</span>
                <span className="flex items-center"><Globe className="w-4 h-4 mr-1" />{tx.ipAddress}</span>
                <span className="flex items-center"><Smartphone className="w-4 h-4 mr-1" />{tx.deviceId}</span>
              </div>
            </div>
            <div className="text-right text-sm">
              <p className={`${tx.transactionType === 'refund' ? 'text-red-600' : 'text-gray-900'} font-medium`}>
                {tx.transactionType === 'refund' ? '-' : ''}${tx.amount.toFixed(2)}
              </p>
              <p className="text-gray-500">{new Date(tx.timestamp).toLocaleString()}</p>
              <p className="text-xs text-gray-400">{tx.userEmail}</
