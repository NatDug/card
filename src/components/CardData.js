import React, { useState } from 'react';

const CardData = ({ cardData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(cardData);

  const handleEdit = () => {
    setEditData(cardData);
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(cardData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateRandomCard = () => {
    const cardTypes = ['TRAVEL', 'METRO', 'BUS', 'TRAIN'];
    const randomType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    
    const randomCardNumber = `TRV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`;
    
    const randomBalance = Math.floor(Math.random() * 200) + 10;
    const randomPoints = Math.floor(Math.random() * 5000) + 100;
    const membershipLevels = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM'];
    const randomLevel = membershipLevels[Math.floor(Math.random() * membershipLevels.length)];
    const zones = ['A', 'B', 'C', 'D'];
    const randomZones = zones.slice(0, Math.floor(Math.random() * zones.length) + 1);
    
    const newCardData = {
      cardNumber: randomCardNumber,
      cardHolder: 'JOHN DOE',
      expiryDate: '12/25',
      cardType: randomType,
      balance: randomBalance,
      currency: 'USD',
      travelPoints: randomPoints,
      membershipLevel: randomLevel,
      validZones: randomZones,
      lastUsed: new Date().toISOString().split('T')[0]
    };
    
    onUpdate(newCardData);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Travel Card Data</h2>
        <div className="space-x-2">
          {!isEditing ? (
            <>
              <button
                onClick={handleEdit}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
              >
                Edit
              </button>
              <button
                onClick={generateRandomCard}
                className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors"
              >
                Random
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-sm text-blue-200 mb-1">Card Number</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
              placeholder="1234-5678-9012-3456"
            />
          ) : (
            <div className="px-3 py-2 bg-white/5 rounded-lg text-white font-mono">
              {cardData.cardNumber}
            </div>
          )}
        </div>

        {/* Card Holder */}
        <div>
          <label className="block text-sm text-blue-200 mb-1">Card Holder</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.cardHolder}
              onChange={(e) => handleInputChange('cardHolder', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
              placeholder="JOHN DOE"
            />
          ) : (
            <div className="px-3 py-2 bg-white/5 rounded-lg text-white">
              {cardData.cardHolder}
            </div>
          )}
        </div>

        {/* Expiry Date and Last Used */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-blue-200 mb-1">Expiry Date</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                placeholder="MM/YY"
              />
            ) : (
              <div className="px-3 py-2 bg-white/5 rounded-lg text-white">
                {cardData.expiryDate}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm text-blue-200 mb-1">Last Used</label>
            {isEditing ? (
              <input
                type="date"
                value={editData.lastUsed}
                onChange={(e) => handleInputChange('lastUsed', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
              />
            ) : (
              <div className="px-3 py-2 bg-white/5 rounded-lg text-white">
                {cardData.lastUsed}
              </div>
            )}
          </div>
        </div>

        {/* Card Type */}
        <div>
          <label className="block text-sm text-blue-200 mb-1">Card Type</label>
          {isEditing ? (
            <select
              value={editData.cardType}
              onChange={(e) => handleInputChange('cardType', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="TRAVEL">TRAVEL</option>
              <option value="METRO">METRO</option>
              <option value="BUS">BUS</option>
              <option value="TRAIN">TRAIN</option>
            </select>
          ) : (
            <div className="px-3 py-2 bg-white/5 rounded-lg text-white">
              {cardData.cardType}
            </div>
          )}
        </div>

        {/* Balance and Currency */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-blue-200 mb-1">Balance</label>
            {isEditing ? (
              <input
                type="number"
                step="0.01"
                value={editData.balance}
                onChange={(e) => handleInputChange('balance', parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                placeholder="0.00"
              />
            ) : (
              <div className="px-3 py-2 bg-white/5 rounded-lg text-white">
                {cardData.balance.toFixed(2)}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm text-blue-200 mb-1">Currency</label>
            {isEditing ? (
              <select
                value={editData.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
            ) : (
              <div className="px-3 py-2 bg-white/5 rounded-lg text-white">
                {cardData.currency}
              </div>
            )}
          </div>
        </div>

        {/* Travel Points and Membership Level */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-blue-200 mb-1">Travel Points</label>
            {isEditing ? (
              <input
                type="number"
                value={editData.travelPoints}
                onChange={(e) => handleInputChange('travelPoints', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                placeholder="0"
              />
            ) : (
              <div className="px-3 py-2 bg-white/5 rounded-lg text-white">
                {cardData.travelPoints}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm text-blue-200 mb-1">Membership Level</label>
            {isEditing ? (
              <select
                value={editData.membershipLevel}
                onChange={(e) => handleInputChange('membershipLevel', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
              >
                <option value="BRONZE">BRONZE</option>
                <option value="SILVER">SILVER</option>
                <option value="GOLD">GOLD</option>
                <option value="PLATINUM">PLATINUM</option>
              </select>
            ) : (
              <div className="px-3 py-2 bg-white/5 rounded-lg text-white">
                {cardData.membershipLevel}
              </div>
            )}
          </div>
        </div>

        {/* Valid Zones */}
        <div>
          <label className="block text-sm text-blue-200 mb-1">Valid Zones</label>
          {isEditing ? (
            <div className="space-y-2">
              {['A', 'B', 'C', 'D'].map(zone => (
                <label key={zone} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editData.validZones?.includes(zone) || false}
                    onChange={(e) => {
                      const currentZones = editData.validZones || [];
                      const newZones = e.target.checked
                        ? [...currentZones, zone]
                        : currentZones.filter(z => z !== zone);
                      handleInputChange('validZones', newZones);
                    }}
                    className="rounded border-white/20 bg-white/10 text-blue-400 focus:ring-blue-400"
                  />
                  <span className="text-white">Zone {zone}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="px-3 py-2 bg-white/5 rounded-lg text-white">
              {cardData.validZones?.join(', ') || 'ALL'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardData;
