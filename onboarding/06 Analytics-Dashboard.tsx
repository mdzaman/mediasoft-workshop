import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from 'recharts';
import { Calendar, Filter, Download, RefreshCw } from 'lucide-react';

// Mock data for analytics
const DAILY_TRANSACTIONS = [
  { date: '12/23', bKash: 4500, Nagad: 3800, Rocket: 2200, Bank: 5600 },
  { date: '12/24', bKash: 5200, Nagad: 4100, Rocket: 2400, Bank: 6100 },
  { date: '12/25', bKash: 3800, Nagad: 3600, Rocket: 2000, Bank: 4800 },
  { date: '12/26', bKash: 5600, Nagad: 4800, Rocket: 2600, Bank: 6800 },
  { date: '12/27', bKash: 6200, Nagad: 5200, Rocket: 2800, Bank: 7200 },
  { date: '12/28', bKash: 5800, Nagad: 4900, Rocket: 2500, Bank: 6900 },
  { date: '12/29', bKash: 6500, Nagad: 5500, Rocket: 3000, Bank: 7500 }
];

const PAYMENT_DISTRIBUTION = [
  { name: 'bKash', value: 37800, color: '#E01E5A' },
  { name: 'Nagad', value: 31900, color: '#ECB22E' },
  { name: 'Rocket', value: 17500, color: '#2EB67D' },
  { name: 'Bank', value: 44900, color: '#36C5F0' }
];

const HOURLY_ACTIVITY = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  transactions: Math.floor(Math.random() * 500) + 100
}));

const MERCHANT_CATEGORIES = [
  { category: 'Retail', merchants: 450, growth: 15 },
  { category: 'Restaurant', merchants: 320, growth: 12 },
  { category: 'Electronics', merchants: 180, growth: 8 },
  { category: 'Grocery', merchants: 280, growth: 10 },
  { category: 'Fashion', merchants: 220, growth: 18 }
];

const AnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState('7d');
  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
        <div className="flex items-center gap-4">
          {/* Time frame selector */}
          <div className="flex items-center gap-2 bg-white rounded-lg shadow px-3 py-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="border-none bg-transparent"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          
          {/* Refresh button */}
          <button
            onClick={refreshData}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-md"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          {/* Export button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Transactions', value: '132,789', change: '+12.3%' },
          { label: 'Active Merchants', value: '1,450', change: '+8.7%' },
          { label: 'Total Revenue', value: '৳8.45M', change: '+15.2%' },
          { label: 'Avg. Transaction', value: '৳635', change: '+3.1%' }
        ].map((metric) => (
          <div key={metric.label} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm text-gray-500">{metric.label}</h3>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-semibold">{metric.value}</span>
              <span className={`text-sm ${
                metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transaction Volume Trend */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-4">Transaction Volume by Provider</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DAILY_TRANSACTIONS}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bKash" stroke="#E01E5A" />
                <Line type="monotone" dataKey="Nagad" stroke="#ECB22E" />
                <Line type="monotone" dataKey="Rocket" stroke="#2EB67D" />
                <Line type="monotone" dataKey="Bank" stroke="#36C5F0" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Method Distribution */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-4">Payment Method Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PAYMENT_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    value,
                    index
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = 25 + innerRadius + (outerRadius - innerRadius);
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return (
                      <text
                        x={x}
                        y={y}
                        fill={PAYMENT_DISTRIBUTION[index].color}
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                      >
                        {PAYMENT_DISTRIBUTION[index].name} ({value.toLocaleString()})
                      </text>
                    );
                  }}
                >
                  {PAYMENT_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly Activity */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-4">Hourly Transaction Activity</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HOURLY_ACTIVITY}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="transactions" fill="#4F46E5">
                  {HOURLY_ACTIVITY.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={entry.transactions > 400 ? '#4F46E5' : '#818CF8'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Merchant Categories */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-4">Merchant Categories</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={MERCHANT_CATEGORIES}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" />
                <Tooltip />
                <Bar dataKey="merchants" fill="#8884d8">
                  {MERCHANT_CATEGORIES.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={entry.growth > 12 ? '#4F46E5' : '#818CF8'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
