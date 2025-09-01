import React, { useState, useEffect } from 'react';
import SmartCard from './components/SmartCard';
import NFCHandler from './components/NFCHandler';
import CardData from './components/CardData';
import LogViewer from './components/LogViewer';
import WalletIntegration from './components/WalletIntegration';

function App() {
  const [isNFCSupported, setIsNFCSupported] = useState(false);
  const [isNFCEnabled, setIsNFCEnabled] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: 'TRV-2024-001-234',
    cardHolder: 'JOHN DOE',
    expiryDate: '12/25',
    cardType: 'TRAVEL',
    balance: 150.00,
    currency: 'USD',
    travelPoints: 2500,
    membershipLevel: 'GOLD',
    validZones: ['A', 'B', 'C'],
    lastUsed: '2024-01-15'
  });
  const [logs, setLogs] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    // Check if Web NFC API is supported
    if ('NDEFReader' in window) {
      setIsNFCSupported(true);
      addLog('NFC API detected', 'info');
    } else {
      addLog('NFC API not supported in this browser', 'error');
    }
  }, []);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = {
      id: Date.now(),
      timestamp,
      message,
      type
    };
    setLogs(prev => [newLog, ...prev.slice(0, 49)]); // Keep last 50 logs
  };

  const handleNFCRead = (data) => {
    addLog(`NFC Read: ${JSON.stringify(data)}`, 'success');
    // Simulate smart card response
    const response = generateSmartCardResponse(data);
    addLog(`Smart Card Response: ${JSON.stringify(response)}`, 'info');
  };

  const generateSmartCardResponse = (request) => {
    // Simulate different smart card responses based on the request
    const responses = {
      'SELECT': {
        status: '9000',
        data: {
          aid: 'A0000002471001',
          cardType: cardData.cardType,
          cardNumber: cardData.cardNumber
        }
      },
      'GET_CHALLENGE': {
        status: '9000',
        data: {
          challenge: Array.from({length: 8}, () => Math.floor(Math.random() * 256))
        }
      },
      'VERIFY_PIN': {
        status: '9000',
        data: {
          verified: true,
          attemptsLeft: 3
        }
      },
      'READ_RECORD': {
        status: '9000',
        data: {
          record: {
            cardHolder: cardData.cardHolder,
            expiryDate: cardData.expiryDate,
            balance: cardData.balance,
            currency: cardData.currency,
            travelPoints: cardData.travelPoints,
            membershipLevel: cardData.membershipLevel,
            validZones: cardData.validZones,
            lastUsed: cardData.lastUsed
          }
        }
      },
      'CHECK_ZONE': {
        status: '9000',
        data: {
          zoneValid: cardData.validZones?.includes(request.zone) || false,
          membershipLevel: cardData.membershipLevel,
          travelPoints: cardData.travelPoints
        }
      },
      'DEDUCT_FARE': {
        status: '9000',
        data: {
          previousBalance: cardData.balance,
          fareAmount: request.amount || 2.50,
          newBalance: Math.max(0, cardData.balance - (request.amount || 2.50)),
          pointsEarned: Math.floor((request.amount || 2.50) * 10),
          transactionId: `TXN-${Date.now()}`
        }
      }
    };

    return responses[request.command] || {
      status: '6F00',
      data: { error: 'Command not supported' }
    };
  };

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
    addLog(`Smart card simulation ${!isSimulating ? 'started' : 'stopped'}`, 'info');
  };

  const updateCardData = (newData) => {
    setCardData(prev => ({ ...prev, ...newData }));
    addLog('Card data updated', 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Travel Card Simulator
          </h1>
          <p className="text-blue-200 text-lg">
            Simulate a travel card for NFC readers
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Smart Card and Controls */}
          <div className="space-y-6">
            <SmartCard 
              cardData={cardData}
              isSimulating={isSimulating}
            />
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Controls</h2>
              
              <div className="space-y-4">
                <button
                  onClick={toggleSimulation}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    isSimulating
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                      isNFCSupported ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    <span className="text-sm text-blue-200">
                      NFC Support: {isNFCSupported ? 'Yes' : 'No'}
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                      isNFCEnabled ? 'bg-green-400' : 'bg-yellow-400'
                    }`}></div>
                    <span className="text-sm text-blue-200">
                      NFC Status: {isNFCEnabled ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <CardData 
              cardData={cardData}
              onUpdate={updateCardData}
            />
          </div>

          {/* Middle Column - Digital Wallet Integration */}
          <div className="space-y-6">
            <WalletIntegration cardData={cardData} />
          </div>

          {/* Right Column - NFC Handler and Logs */}
          <div className="space-y-6">
            <NFCHandler
              isSupported={isNFCSupported}
              isEnabled={isNFCEnabled}
              onRead={handleNFCRead}
              onStatusChange={setIsNFCEnabled}
              addLog={addLog}
            />
            
            <LogViewer logs={logs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
