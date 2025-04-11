import React from 'react';
import { AlertCircle, Clock, User, CheckCircle, Search } from 'lucide-react';
import type { AlertMessage } from '../types';

interface Props {
  alerts: AlertMessage[];
}

export function AlertsList({ alerts }: Props) {
  const [filter, setFilter] = React.useState('all');

  const getSeverityStyle = (severity: AlertMessage['severity']) => {
    switch (severity) {
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'high': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: AlertMessage['status']) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'investigating': return <Search className="w-4 h-4 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const filtered = alerts.filter(a => filter === 'all' || a.severity === filter);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
        <select className="text-sm border rounded-md px-2 py-1" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Severities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <ul className="divide-y">
        {filtered.map(alert => (
          <li key={alert.id} className="py-4 flex gap-4">
            <div>{getStatusIcon(alert.status)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{alert.message}</p>
              <div className="mt-2 flex gap-2 flex-wrap text-xs">
                <span className={`px-2 py-1 rounded-full font-semibold ${getSeverityStyle(alert.severity)}`}>{alert.severity.toUpperCase()}</span>
                <span className="flex items-center text-gray-500"><Clock className="w-3 h-3 mr-1" />{new Date(alert.timestamp).toLocaleString()}</span>
                <span className="flex items-center text-gray-500"><User className="w-3 h-3 mr-1" />{alert.affectedUser}</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">Recommended Action: {alert.recommendedAction}</p>
            </div>
            <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full self-start font-medium">{alert.category}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
