import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ChevronRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock data for payment providers
const MOCK_PROVIDER_DATA = {
  'bKash': {
    icon: '💰',
    accounts: ['01712345678', '01787654321']
  },
  'Nagad': {
    icon: '💳',
    accounts: ['01712345678']
  },
  'Rocket': {
    icon: '🚀',
    accounts: ['01787654321']
  },
  'Bank': {
    icon: '🏦',
    accounts: ['1234567890']
  }
};

const OnboardingFlow = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [qrCode, setQrCode] = useState(null);

  // Validate Bangladesh phone number
  const validatePhoneNumber = (number) => {
    const bdPhoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;
    return bdPhoneRegex.test(number);
  };

  // Handle phone number input
  const handlePhoneChange = (e) => {
    const number = e.target.value;
    setPhoneNumber(number);
    
    if (number.length >= 11) {
      const isValid = validatePhoneNumber(number);
      setIsValidPhone(isValid);
      setValidationError(isValid ? '' : 'Please enter a valid Bangladesh phone number');
    } else {
      setIsValidPhone(false);
      setValidationError('');
    }
  };

  // Fetch linked accounts (mock implementation)
  const fetchLinkedAccounts = () => {
    // Simulate API call
    setTimeout(() => {
      const accounts = Object.entries(MOCK_PROVIDER_DATA).map(([provider, data]) => ({
        provider,
        icon: data.icon,
        accounts: data.accounts
      }));
      setLinkedAccounts(accounts);
      setStep(2);
    }, 1000);
  };

  // Handle account selection
  const handleAccountSelection = (provider, account) => {
    const selection = { provider, account };
    const isSelected = selectedAccounts.some(
      item => item.provider === provider && item.account === account
    );

    if (isSelected) {
      setSelectedAccounts(selectedAccounts.filter(
        item => !(item.provider === provider && item.account === account)
      ));
    } else {
      setSelectedAccounts([...selectedAccounts, selection]);
    }
  };

  // Generate QR code (mock implementation)
  const generateQR = () => {
    // Simulate API call
    setTimeout(() => {
      setQrCode('Generated QR Code');
      setStep(3);
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= num ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="text-center mb-4">
          {step === 1 && 'Enter Phone Number'}
          {step === 2 && 'Select Payment Methods'}
          {step === 3 && 'Generated QR Code'}
        </div>
      </div>

      {/* Step 1: Phone Number Input */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Enter your phone number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="+8801XXXXXXXXX"
              className="w-full p-2 border rounded-md"
            />
            {validationError && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {validationError}
                </AlertDescription>
              </Alert>
            )}
          </div>
          <button
            onClick={fetchLinkedAccounts}
            disabled={!isValidPhone}
            className={`w-full p-2 rounded-md ${
              isValidPhone 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Account Selection */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-4">Select Payment Methods</h3>
          {linkedAccounts.map(({ provider, icon, accounts }) => (
            <div key={provider} className="border rounded-md p-4">
              <div className="flex items-center mb-2">
                <span className="mr-2">{icon}</span>
                <span className="font-medium">{provider}</span>
              </div>
              <div className="space-y-2">
                {accounts.map((account) => (
                  <div
                    key={account}
                    onClick={() => handleAccountSelection(provider, account)}
                    className={`p-2 rounded-md cursor-pointer flex items-center justify-between ${
                      selectedAccounts.some(
                        item => item.provider === provider && item.account === account
                      )
                        ? 'bg-blue-100 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <span>{account}</span>
                    {selectedAccounts.some(
                      item => item.provider === provider && item.account === account
                    ) && (
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={generateQR}
            disabled={selectedAccounts.length === 0}
            className={`w-full p-2 rounded-md ${
              selectedAccounts.length > 0
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            Generate QR Code
          </button>
        </div>
      )}

      {/* Step 3: QR Code Display */}
      {step === 3 && (
        <div className="text-center space-y-4">
          <h3 className="text-lg font-medium">Your QR Code is Ready!</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mx-auto max-w-xs">
            <img
              src="/api/placeholder/200/200"
              alt="QR Code"
              className="mx-auto"
            />
          </div>
          <div className="text-sm text-gray-600">
            Scan this QR code to accept payments from your customers
          </div>
          <button
            onClick={() => window.print()}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default OnboardingFlow;
