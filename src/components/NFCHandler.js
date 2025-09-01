import React, { useState, useEffect, useRef, useCallback } from 'react';

const NFCHandler = ({ isSupported, isEnabled, onRead, onStatusChange, addLog }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastRead, setLastRead] = useState(null);
  const scanIntervalRef = useRef(null);
  const nfcReaderRef = useRef(null);

  const initializeNFC = useCallback(async () => {
    try {
      if (typeof window !== 'undefined' && 'NDEFReader' in window) {
        const reader = new window.NDEFReader();
        nfcReaderRef.current = reader;

        reader.addEventListener('reading', (event) => {
          handleNFCReading(event);
        });

        reader.addEventListener('readingerror', (error) => {
          addLog(`NFC Reading Error: ${error.message}`, 'error');
        });

        await reader.scan();
        setIsScanning(true);
        onStatusChange(true);
        addLog('NFC scanning started', 'success');
      }
    } catch (error) {
      addLog(`NFC initialization failed: ${error.message}`, 'error');
      onStatusChange(false);
    }
  }, [onRead, onStatusChange, addLog]);

  const cleanupNFC = useCallback(() => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    if (nfcReaderRef.current) {
      nfcReaderRef.current = null;
    }
    setIsScanning(false);
  }, []);

  useEffect(() => {
    if (isSupported && isEnabled) {
      initializeNFC();
    } else {
      cleanupNFC();
    }

    return () => {
      cleanupNFC();
    };
  }, [isSupported, isEnabled, initializeNFC, cleanupNFC]);

  const handleNFCReading = (event) => {
    const decoder = new TextDecoder();
    const records = [];

    for (const record of event.message.records) {
      if (record.recordType === 'text') {
        const textDecoder = new TextDecoder(record.encoding || 'utf-8');
        const text = textDecoder.decode(record.data);
        records.push({
          type: 'text',
          data: text
        });
      } else if (record.recordType === 'url') {
        const url = decoder.decode(record.data);
        records.push({
          type: 'url',
          data: url
        });
      } else {
        records.push({
          type: record.recordType,
          data: Array.from(record.data).map(b => b.toString(16).padStart(2, '0')).join(' ')
        });
      }
    }

    const readData = {
      timestamp: new Date().toISOString(),
      records,
      serialNumber: event.serialNumber || 'Unknown'
    };

    setLastRead(readData);
    onRead(readData);
  };

  const simulateNFCRead = () => {
    const simulatedCommands = [
      { command: 'SELECT', data: 'A0000002471001' },
      { command: 'GET_CHALLENGE', data: '08000000' },
      { command: 'VERIFY_PIN', data: '1234' },
      { command: 'READ_RECORD', data: '00010000' },
      { command: 'GET_BALANCE', data: '' },
      { command: 'READ_TRANSACTIONS', data: '00010000' }
    ];

    const randomCommand = simulatedCommands[Math.floor(Math.random() * simulatedCommands.length)];
    
    const simulatedRead = {
      timestamp: new Date().toISOString(),
      records: [{
        type: 'command',
        data: JSON.stringify(randomCommand)
      }],
      serialNumber: 'SIMULATED-' + Math.random().toString(36).substr(2, 9)
    };

    setLastRead(simulatedRead);
    onRead(simulatedRead);
  };

  const startSimulation = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    
    scanIntervalRef.current = setInterval(() => {
      simulateNFCRead();
    }, 3000); // Simulate NFC read every 3 seconds
    
    addLog('NFC simulation started (every 3 seconds)', 'info');
  };

  const stopSimulation = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
      addLog('NFC simulation stopped', 'info');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">NFC Handler</h2>
      
      <div className="space-y-4">
        {/* NFC Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-sm text-blue-200 mb-1">NFC Support</div>
            <div className={`text-lg font-semibold ${isSupported ? 'text-green-400' : 'text-red-400'}`}>
              {isSupported ? 'Supported' : 'Not Supported'}
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-sm text-blue-200 mb-1">Scanning Status</div>
            <div className={`text-lg font-semibold ${isScanning ? 'text-green-400' : 'text-yellow-400'}`}>
              {isScanning ? 'Active' : 'Inactive'}
            </div>
          </div>
        </div>

        {/* NFC Controls */}
        <div className="space-y-3">
          {isSupported ? (
            <>
              <button
                onClick={() => isEnabled ? cleanupNFC() : initializeNFC()}
                className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  isEnabled
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isEnabled ? 'Stop NFC' : 'Start NFC'}
              </button>
              
              <button
                onClick={simulateNFCRead}
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200"
              >
                Simulate NFC Read
              </button>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-yellow-400 mb-2">⚠️</div>
              <p className="text-blue-200 text-sm">
                Web NFC API is not supported in this browser.
                <br />
                Use Chrome/Edge with HTTPS or localhost.
              </p>
            </div>
          )}
        </div>

        {/* Simulation Controls */}
        <div className="border-t border-white/20 pt-4">
          <h3 className="text-lg font-semibold text-white mb-3">Simulation Mode</h3>
          <div className="space-y-2">
            <button
              onClick={startSimulation}
              className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all duration-200"
            >
              Start Auto Simulation
            </button>
            
            <button
              onClick={stopSimulation}
              className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-200"
            >
              Stop Auto Simulation
            </button>
          </div>
        </div>

        {/* Last Read Display */}
        {lastRead && (
          <div className="border-t border-white/20 pt-4">
            <h3 className="text-lg font-semibold text-white mb-3">Last NFC Read</h3>
            <div className="bg-black/20 rounded-lg p-3">
              <div className="text-xs text-blue-200 mb-1">
                {new Date(lastRead.timestamp).toLocaleTimeString()}
              </div>
              <div className="text-sm text-white font-mono">
                {JSON.stringify(lastRead, null, 2)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFCHandler;
