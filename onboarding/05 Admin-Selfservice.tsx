import React, { useState } from 'react';
import {
  Users,
  FileText,
  Settings,
  CreditCard,
  PieChart,
  Search,
  Download,
  RefreshCw,
  Edit,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock data for reports
const MOCK_REPORTS = [
  { id: 1, name: 'Daily Transactions', type: 'transaction', lastGenerated: '2024-12-28' },
  { id: 2, name: 'Monthly Revenue', type: 'revenue', lastGenerated: '2024-12-01' },
  { id: 3, name: 'Customer Analytics', type: 'analytics', lastGenerated: '2024-12-29' }
];

// Mock data for customers
const MOCK_CUSTOMERS = [
  {
    id: 1,
    name: 'Dhaka Grocery Store',
    phone: '+8801712345678',
    paymentMethods: ['bKash', 'Nagad', 'Bank'],
    status: 'active'
  },
  {
    id: 2,
    name: 'Chittagong Electronics',
    phone: '+8801811234567',
    paymentMethods: ['bKash', 'Bank'],
    status: 'active'
  }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('reports');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [notification, setNotification] = useState(null);

  // Navigation items
  const navItems = [
    { id: 'reports', icon: FileText, label: 'Reports' },
    { id: 'customers', icon: Users, label: 'Customers' },
    { id: 'payments', icon: CreditCard, label: 'Payment Methods' },
    { id: 'analytics', icon: PieChart, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Report regeneration handler
  const handleRegenerateReport = (reportId) => {
    showNotification(`Report ${reportId} regeneration started`);
  };

  // Customer update handler
  const handleUpdateCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  // Render reports section
  const renderReports = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Reports</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          <Download className="w-4 h-4" />
          Download All
        </button>
      </div>

      <div className="grid gap-4">
        {MOCK_REPORTS.map((report) => (
          <div key={report.id} className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="font-medium">{report.name}</h3>
              <p className="text-sm text-gray-500">Last generated: {report.lastGenerated}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleRegenerateReport(report.id)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-md"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-md">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render customers section
  const renderCustomers = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Customer Management</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {MOCK_CUSTOMERS.map((customer) => (
          <div key={customer.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{customer.name}</h3>
                <p className="text-sm text-gray-500">{customer.phone}</p>
                <div className="flex gap-2 mt-2">
                  {customer.paymentMethods.map((method) => (
                    <span key={method} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleUpdateCustomer(customer)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-md"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render payment methods section
  const renderPayments = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Payment Methods</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['bKash', 'Nagad', 'Rocket', 'Bank Transfer'].map((method) => (
          <div key={method} className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{method}</h3>
                <p className="text-sm text-gray-500">Status: Active</p>
              </div>
              <button className="px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-md">
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Customer edit modal
  const renderCustomerEditModal = () => {
    if (!selectedCustomer) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 className="text-lg font-medium mb-4">Edit Customer</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Business Name</label>
              <input
                type="text"
                defaultValue={selectedCustomer.name}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="text"
                defaultValue={selectedCustomer.phone}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment Methods</label>
              <div className="space-y-2">
                {['bKash', 'Nagad', 'Rocket', 'Bank'].map((method) => (
                  <label key={method} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked={selectedCustomer.paymentMethods.includes(method)}
                    />
                    {method}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showNotification('Customer updated successfully');
                  setSelectedCustomer(null);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Notification component
  const renderNotification = () => {
    if (!notification) return null;

    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Alert variant={notification.type === 'success' ? 'default' : 'destructive'}>
          {notification.type === 'success' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>{notification.message}</AlertDescription>
        </Alert>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center px-4 gap-2 border-b-2 ${
                    activeTab === item.id
                      ? 'border-blue-500 text-blue-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'reports' && renderReports()}
        {activeTab === 'customers' && renderCustomers()}
        {activeTab === 'payments' && renderPayments()}
        {activeTab === 'analytics' && (
          <div className="text-center py-12 text-gray-500">
            Analytics dashboard coming soon
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="text-center py-12 text-gray-500">
            Settings panel coming soon
          </div>
        )}
      </main>

      {/* Modals */}
      {renderCustomerEditModal()}

      {/* Notifications */}
      {renderNotification()}
    </div>
  );
};

export default AdminDashboard;
