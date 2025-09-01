import React, { useState } from 'react';

const DigitalWallet = ({ cardData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPass, setGeneratedPass] = useState(null);

  // Generate Apple Wallet pass
  const generateAppleWalletPass = async () => {
    setIsGenerating(true);
    try {
      // Create a simple pass structure for Apple Wallet
      const passData = {
        formatVersion: 1,
        passTypeIdentifier: 'pass.com.example.card',
        serialNumber: `card-${Date.now()}`,
        teamIdentifier: 'TEAM123456',
        organizationName: 'Smart Card Simulator',
        description: 'Digital Card for Apple Wallet',
        generic: {
          primaryFields: [
            {
              key: 'cardNumber',
              label: 'CARD NUMBER',
              value: cardData.cardNumber
            }
          ],
          secondaryFields: [
            {
              key: 'cardHolder',
              label: 'CARD HOLDER',
              value: cardData.cardHolder
            },
            {
              key: 'expiryDate',
              label: 'EXPIRES',
              value: cardData.expiryDate
            }
          ],
          auxiliaryFields: [
            {
              key: 'balance',
              label: 'BALANCE',
              value: `${cardData.currency} ${cardData.balance.toFixed(2)}`
            },
            {
              key: 'cardType',
              label: 'CARD TYPE',
              value: cardData.cardType
            }
          ]
        },
        barcodes: [
          {
            format: 'PKBarcodeFormatQR',
            message: JSON.stringify(cardData),
            messageEncoding: 'iso-8859-1'
          }
        ]
      };

      // Create a downloadable .pkpass file
      const passBlob = new Blob([JSON.stringify(passData)], { type: 'application/vnd.apple.pkpass' });
      const passUrl = URL.createObjectURL(passBlob);
      
      setGeneratedPass({
        type: 'apple',
        url: passUrl,
        filename: `card-${Date.now()}.pkpass`
      });
    } catch (error) {
      console.error('Error generating Apple Wallet pass:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate Google Wallet pass
  const generateGoogleWalletPass = async () => {
    setIsGenerating(true);
    try {
      // Create a simple pass structure for Google Wallet
      const passData = {
        genericObjects: [
          {
            id: `card-${Date.now()}`,
            cardTitle: {
              defaultValue: {
                language: 'en-US',
                value: `${cardData.cardType} Card`
              }
            },
            subheader: {
              defaultValue: {
                language: 'en-US',
                value: cardData.cardNumber
              }
            },
            header: {
              defaultValue: {
                language: 'en-US',
                value: cardData.cardHolder
              }
            },
            hexBackgroundColor: '#4285f4',
            logo: {
              sourceUri: {
                uri: 'https://example.com/card-logo.png'
              }
            }
          }
        ]
      };

      // Create a downloadable .json file for Google Wallet
      const passBlob = new Blob([JSON.stringify(passData)], { type: 'application/json' });
      const passUrl = URL.createObjectURL(passBlob);
      
      setGeneratedPass({
        type: 'google',
        url: passUrl,
        filename: `card-${Date.now()}.json`
      });
    } catch (error) {
      console.error('Error generating Google Wallet pass:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Download the generated pass
  const downloadPass = () => {
    if (generatedPass) {
      const link = document.createElement('a');
      link.href = generatedPass.url;
      link.download = generatedPass.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Clear generated pass
  const clearPass = () => {
    if (generatedPass) {
      URL.revokeObjectURL(generatedPass.url);
      setGeneratedPass(null);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Digital Wallet</h2>
      
      <div className="space-y-4">
        <p className="text-blue-200 text-sm">
          Add your card to your digital wallet for easy access and payments.
        </p>

        {/* Wallet Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Apple Wallet */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">🍎</span>
              </div>
              <h3 className="text-white font-semibold">Apple Wallet</h3>
            </div>
            <p className="text-blue-200 text-xs mb-3">
              Add to Apple Wallet for iPhone and Apple Watch
            </p>
            <button
              onClick={generateAppleWalletPass}
              disabled={isGenerating}
              className="w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? 'Generating...' : 'Add to Apple Wallet'}
            </button>
          </div>

          {/* Google Wallet */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">G</span>
              </div>
              <h3 className="text-white font-semibold">Google Wallet</h3>
            </div>
            <p className="text-blue-200 text-xs mb-3">
              Add to Google Wallet for Android devices
            </p>
            <button
              onClick={generateGoogleWalletPass}
              disabled={isGenerating}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? 'Generating...' : 'Add to Google Wallet'}
            </button>
          </div>
        </div>

        {/* Generated Pass Display */}
        {generatedPass && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-green-400 font-semibold mb-1">
                  Pass Generated Successfully!
                </h4>
                <p className="text-green-200 text-sm">
                  {generatedPass.type === 'apple' ? 'Apple Wallet' : 'Google Wallet'} pass ready for download
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={downloadPass}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Download
                </button>
                <button
                  onClick={clearPass}
                  className="bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-blue-300 font-semibold mb-2">Instructions:</h4>
          <ul className="text-blue-200 text-sm space-y-1">
            <li>• <strong>Apple Wallet:</strong> Download the .pkpass file and open it on your iPhone</li>
            <li>• <strong>Google Wallet:</strong> Download the .json file and import it into Google Wallet app</li>
            <li>• Make sure your device supports the respective wallet app</li>
            <li>• The pass will contain your card information for easy access</li>
          </ul>
        </div>

        {/* QR Code for Easy Access */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h4 className="text-white font-semibold mb-3">Quick Access QR Code</h4>
          <div className="bg-white rounded-lg p-4 flex justify-center">
            <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-xs text-center">
                QR Code<br/>Placeholder
              </span>
            </div>
          </div>
          <p className="text-blue-200 text-xs mt-2 text-center">
            Scan this QR code with your wallet app for quick access
          </p>
        </div>
      </div>
    </div>
  );
};

export default DigitalWallet;
