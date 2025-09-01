import React from 'react';

const SmartCard = ({ cardData, isSimulating }) => {
  const formatCardNumber = (number) => {
    return number.replace(/(\d{4})/g, '$1 ').trim();
  };

  const getCardTypeColor = (type) => {
    switch (type) {
      case 'TRAVEL':
        return 'from-green-600 to-blue-600';
      case 'METRO':
        return 'from-orange-600 to-red-600';
      case 'BUS':
        return 'from-purple-600 to-indigo-600';
      case 'TRAIN':
        return 'from-yellow-600 to-orange-600';
      default:
        return 'from-gray-600 to-gray-800';
    }
  };

  const getCardTypeIcon = (type) => {
    switch (type) {
      case 'TRAVEL':
        return '🚇';
      case 'METRO':
        return '🚇';
      case 'BUS':
        return '🚌';
      case 'TRAIN':
        return '🚂';
      default:
        return '🎫';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Travel Card</h2>
      
      <div className={`relative w-full max-w-sm mx-auto ${
        isSimulating ? 'animate-glow' : ''
      }`}>
        {/* Card Background */}
        <div className={`relative w-full h-56 rounded-xl bg-gradient-to-br ${getCardTypeColor(cardData.cardType)} p-6 text-white shadow-2xl transform transition-all duration-300 hover:scale-105`}>
          
          {/* Card Type Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-lg">
              {getCardTypeIcon(cardData.cardType)}
            </div>
          </div>

          {/* Chip */}
          <div className="absolute top-16 left-6">
            <div className="w-12 h-10 bg-yellow-400 rounded-md flex items-center justify-center">
              <div className="w-8 h-6 bg-yellow-600 rounded-sm"></div>
            </div>
          </div>

          {/* NFC Indicator */}
          {isSimulating && (
            <div className="absolute top-16 right-6">
              <div className="w-8 h-8 bg-blue-400 rounded-full animate-pulse-slow flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          )}

          {/* Card Number */}
          <div className="absolute bottom-24 left-6 right-6">
            <div className="text-xl font-mono tracking-wider">
              {cardData.cardNumber}
            </div>
          </div>

          {/* Card Holder */}
          <div className="absolute bottom-16 left-6">
            <div className="text-sm text-white/80 uppercase tracking-wide">
              Card Holder
            </div>
            <div className="text-lg font-semibold">
              {cardData.cardHolder}
            </div>
          </div>

          {/* Expiry Date */}
          <div className="absolute bottom-16 right-6">
            <div className="text-sm text-white/80 uppercase tracking-wide">
              Expires
            </div>
            <div className="text-lg font-semibold">
              {cardData.expiryDate}
            </div>
          </div>

          {/* Balance */}
          <div className="absolute bottom-8 left-6">
            <div className="text-sm text-white/80">
              Balance
            </div>
            <div className="text-lg font-bold">
              {cardData.currency} {cardData.balance.toFixed(2)}
            </div>
          </div>

          {/* Travel Points */}
          <div className="absolute bottom-8 right-6">
            <div className="text-sm text-white/80">
              Points
            </div>
            <div className="text-lg font-bold">
              {cardData.travelPoints}
            </div>
          </div>

          {/* Membership Level */}
          <div className="absolute bottom-2 left-6">
            <div className="text-sm font-semibold text-yellow-300">
              {cardData.membershipLevel}
            </div>
          </div>

          {/* Valid Zones */}
          <div className="absolute bottom-2 right-6">
            <div className="text-sm text-white/80">
              Zones: {cardData.validZones?.join(', ') || 'ALL'}
            </div>
          </div>
        </div>

        {/* Simulation Status */}
        {isSimulating && (
          <div className="absolute -top-2 -right-2">
            <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
              ACTIVE
            </div>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="mt-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-blue-200">Card Type:</span>
          <span className="text-white font-semibold">{cardData.cardType}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-blue-200">Status:</span>
          <span className={`font-semibold ${isSimulating ? 'text-green-400' : 'text-yellow-400'}`}>
            {isSimulating ? 'Simulating' : 'Ready'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-blue-200">NFC:</span>
          <span className={`font-semibold ${isSimulating ? 'text-green-400' : 'text-gray-400'}`}>
            {isSimulating ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SmartCard;
