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
    const cardTypes = ['VISA', 'MASTERCARD', 'AMEX'];
    const randomType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    
    const randomCardNumber = Array.from({length: 16}, () => 
      Math.floor(Math.random() * 10)
    ).join('');
    
    const formattedCardNumber = randomCardNumber.replace(/(\d{4})/g, '$1-').slice(0, -1);
    
    const randomBalance = Math.floor(Math.random() * 10000) + 100;
    
    const newCardData = {
      cardNumber: formattedCardNumber,
      cardHolder: 'JOHN DOE',
      expiryDate: '12/25',
      cvv: '123',
      cardType: randomType,
      balance: randomBalance,
      currency: 'USD'
    };
    
    onUpdate(newCardData);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Card Data</h2>
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

        {/* Expiry Date and CVV */}
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
            <label className="block text-sm text-blue-200 mb-1">CVV</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                placeholder="123"
              />
            ) : (
              <div className="px-3 py-2 bg-white/5 rounded-lg text-white">
                {cardData.cvv}
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
              <option value="VISA">VISA</option>
              <option value="MASTERCARD">MASTERCARD</option>
              <option value="AMEX">AMEX</option>
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
      </div>
    </div>
  );
};

export default CardData;
