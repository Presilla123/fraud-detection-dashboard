import React from 'react';
import { AlertCircle, Clock, User, CheckCircle, Search } from 'lucide-react';
import type { AlertMessage } from '../types';

interface AlertsListProps {
  alerts: AlertMessage[];
}

export function AlertsList({ alerts }: AlertsListProps) {
  const [filter, setFilter] = React.useState('all');

  const getSeverityColor = (severity: AlertMessage['severity']) => {
    switch (severity) {
      case 'low':
        return 'bg-yellow-50 text-yellow-800';
      case 'medium':
        return 'bg-orange-50 text-orange-800';
      case 'high':
        return 'bg-red-50 text-red-800';
    }
  };

  const getStatusIcon = (status: AlertMessage['status']) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'investigating':
        return <Search className="w-4 h-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => 
    filter === 'all' || alert.severity === filter
  );

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
          <div className="flex space-x-2">
            <select 
              className="text-sm border rounded-md px-2 py-1"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {filteredAlerts.map((alert) => (
              <li key={alert.id} className="py-5">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(alert.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="inline-flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                      <span className="inline-flex items-center text-xs text-gray-500">
                        <User className="w-3 h-3 mr-1" />
                        {alert.affectedUser}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Recommended Action: {alert.recommendedAction}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {alert.category}
                    </span>
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
