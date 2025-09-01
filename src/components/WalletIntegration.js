import React, { useState, useEffect } from 'react';
import {
  generateAppleWalletPassData,
  generateGoogleWalletPassData,
  generateSamsungPayPassData,
  createQRCodeData,
  generateQRCodeSVG,
  downloadFile,
  copyToClipboard,
  getWalletDisplayName,
  validateCardData
} from '../utils/walletUtils';

const WalletIntegration = ({ cardData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPass, setGeneratedPass] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null);

  // Generate QR code data for the card
  useEffect(() => {
    setQrCodeData(createQRCodeData(cardData));
  }, [cardData]);

  // Generate Apple Wallet pass with proper structure
  const generateAppleWalletPass = async () => {
    setIsGenerating(true);
    try {
      // Validate card data first
      const validation = validateCardData(cardData);
      if (!validation.isValid) {
        console.error('Card data validation failed:', validation.errors);
        return;
      }

      const passData = generateAppleWalletPassData(cardData, qrCodeData);

      // Create a downloadable .pkpass file
      const passBlob = new Blob([JSON.stringify(passData)], { 
        type: 'application/vnd.apple.pkpass' 
      });
      const passUrl = URL.createObjectURL(passBlob);
      
      setGeneratedPass({
        type: 'apple',
        url: passUrl,
        filename: `smartcard-${Date.now()}.pkpass`,
        data: passData
      });
    } catch (error) {
      console.error('Error generating Apple Wallet pass:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate Google Wallet pass with proper structure
  const generateGoogleWalletPass = async () => {
    setIsGenerating(true);
    try {
      // Validate card data first
      const validation = validateCardData(cardData);
      if (!validation.isValid) {
        console.error('Card data validation failed:', validation.errors);
        return;
      }

      const passData = generateGoogleWalletPassData(cardData, qrCodeData);

      // Create a downloadable .json file for Google Wallet
      const passBlob = new Blob([JSON.stringify(passData)], { 
        type: 'application/json' 
      });
      const passUrl = URL.createObjectURL(passBlob);
      
      setGeneratedPass({
        type: 'google',
        url: passUrl,
        filename: `smartcard-${Date.now()}.json`,
        data: passData
      });
    } catch (error) {
      console.error('Error generating Google Wallet pass:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate Samsung Pay pass
  const generateSamsungPayPass = async () => {
    setIsGenerating(true);
    try {
      // Validate card data first
      const validation = validateCardData(cardData);
      if (!validation.isValid) {
        console.error('Card data validation failed:', validation.errors);
        return;
      }

      const passData = generateSamsungPayPassData(cardData, qrCodeData);

      const passBlob = new Blob([JSON.stringify(passData)], { 
        type: 'application/json' 
      });
      const passUrl = URL.createObjectURL(passBlob);
      
      setGeneratedPass({
        type: 'samsung',
        url: passUrl,
        filename: `smartcard-${Date.now()}.json`,
        data: passData
      });
    } catch (error) {
      console.error('Error generating Samsung Pay pass:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Download the generated pass
  const downloadPass = () => {
    if (generatedPass) {
      const blob = new Blob([JSON.stringify(generatedPass.data)], { 
        type: generatedPass.type === 'apple' ? 'application/vnd.apple.pkpass' : 'application/json' 
      });
      downloadFile(blob, generatedPass.filename);
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
      <h2 className="text-xl font-semibold text-white mb-4">Digital Wallet Integration</h2>
      
      <div className="space-y-6">
        <p className="text-blue-200 text-sm">
          Add your smart card to popular digital wallets for convenient access and payments.
        </p>

                 {/* Wallet Options */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {/* Apple Wallet */}
           <div className="wallet-card bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center mr-3">
                <span className="text-white text-lg">🍎</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Apple Wallet</h3>
                <p className="text-blue-200 text-xs">iPhone & Apple Watch</p>
              </div>
            </div>
            <button
              onClick={generateAppleWalletPass}
              disabled={isGenerating}
              className="w-full bg-black text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? 'Generating...' : 'Add to Apple Wallet'}
            </button>
          </div>

                     {/* Google Wallet */}
           <div className="wallet-card bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white text-lg font-bold">G</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Google Wallet</h3>
                <p className="text-blue-200 text-xs">Android devices</p>
              </div>
            </div>
            <button
              onClick={generateGoogleWalletPass}
              disabled={isGenerating}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? 'Generating...' : 'Add to Google Wallet'}
            </button>
          </div>

                     {/* Samsung Pay */}
           <div className="wallet-card bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-800 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white text-lg font-bold">S</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Samsung Pay</h3>
                <p className="text-blue-200 text-xs">Samsung devices</p>
              </div>
            </div>
            <button
              onClick={generateSamsungPayPass}
              disabled={isGenerating}
              className="w-full bg-blue-800 text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? 'Generating...' : 'Add to Samsung Pay'}
            </button>
          </div>
        </div>

                 {/* Generated Pass Display */}
         {generatedPass && (
           <div className="animate-bounce-in bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-green-400 font-semibold mb-1">
                  Pass Generated Successfully!
                </h4>
                                 <p className="text-green-200 text-sm">
                   {getWalletDisplayName(generatedPass.type)} pass ready for download
                 </p>
                <p className="text-green-200 text-xs mt-1">
                  Filename: {generatedPass.filename}
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

                 {/* QR Code Display */}
         {qrCodeData && (
           <div className="qr-code-container bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-white font-semibold mb-3">Quick Access QR Code</h4>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white rounded-lg p-4">
                <img 
                  src={generateQRCodeSVG(qrCodeData)} 
                  alt="QR Code" 
                  className="w-32 h-32"
                />
              </div>
              <div className="text-center">
                <p className="text-blue-200 text-sm mb-2">
                  Scan this QR code with your wallet app
                </p>
                                 <button
                   onClick={async () => {
                     const success = await copyToClipboard(qrCodeData);
                     if (success) {
                       // You could add a toast notification here
                       console.log('Card data copied to clipboard');
                     }
                   }}
                   className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                 >
                   Copy Card Data
                 </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-blue-300 font-semibold mb-2">How to Use:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-blue-200 font-medium mb-1">Apple Wallet:</h5>
              <ul className="text-blue-200 text-xs space-y-1">
                <li>• Download the .pkpass file</li>
                <li>• Open it on your iPhone</li>
                <li>• Tap "Add to Wallet"</li>
                <li>• Your card will appear in Apple Wallet</li>
              </ul>
            </div>
            <div>
              <h5 className="text-blue-200 font-medium mb-1">Google Wallet:</h5>
              <ul className="text-blue-200 text-xs space-y-1">
                <li>• Download the .json file</li>
                <li>• Open Google Wallet app</li>
                <li>• Import the file</li>
                <li>• Your card will be added</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-yellow-300 font-semibold mb-2">Security Notice:</h4>
          <ul className="text-yellow-200 text-xs space-y-1">
            <li>• This is a demonstration app - do not use with real payment cards</li>
            <li>• Generated passes contain simulated data only</li>
            <li>• Real wallet integration requires proper certification and security measures</li>
            <li>• Always verify the source before adding cards to your wallet</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WalletIntegration;
