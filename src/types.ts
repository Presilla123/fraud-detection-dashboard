
export interface Transaction {
  id: string;
  amount: number;
  timestamp: string;
  status: 'normal' | 'suspicious' | 'fraudulent';
  score: number;
  merchant: string;
  location: string;
  cardType: string;
  cardLastFour: string;
  ipAddress: string;
  deviceId: string;
  userEmail: string;
  transactionType: 'purchase' | 'refund' | 'chargeback';
}

export interface MetricCard {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ComponentType;
  trend?: 'up' | 'down';
  details?: string;
}

export interface AlertMessage {
  id: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  category: 'location' | 'amount' | 'frequency' | 'pattern' | 'device';
  affectedUser: string;
  recommendedAction: string;
  status: 'new' | 'investigating' | 'resolved';
}
