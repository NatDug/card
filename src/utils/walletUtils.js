// Utility functions for digital wallet integration

/**
 * Generate Apple Wallet pass data structure
 * @param {Object} cardData - Card information
 * @param {string} qrCodeData - QR code data string
 * @returns {Object} Apple Wallet pass data
 */
export const generateAppleWalletPassData = (cardData, qrCodeData) => {
  return {
    formatVersion: 1,
    passTypeIdentifier: 'pass.com.smartcard.simulator',
    serialNumber: `card-${Date.now()}`,
    teamIdentifier: 'TEAM123456',
    organizationName: 'Smart Card Simulator',
    description: 'Digital Payment Card',
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
        message: qrCodeData,
        messageEncoding: 'utf-8'
      }
    ],
    locations: [
      {
        longitude: -122.374,
        latitude: 37.618,
        relevantText: 'Use this card for payments'
      }
    ]
  };
};

/**
 * Generate Google Wallet pass data structure
 * @param {Object} cardData - Card information
 * @param {string} qrCodeData - QR code data string
 * @returns {Object} Google Wallet pass data
 */
export const generateGoogleWalletPassData = (cardData, qrCodeData) => {
  return {
    genericObjects: [
      {
        id: `card-${Date.now()}`,
        cardTitle: {
          defaultValue: {
            language: 'en-US',
            value: `${cardData.cardType} Payment Card`
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
            uri: 'https://smartcard-simulator.com/logo.png'
          }
        },
        textModulesData: [
          {
            header: 'Balance',
            body: `${cardData.currency} ${cardData.balance.toFixed(2)}`
          },
          {
            header: 'Expires',
            body: cardData.expiryDate
          }
        ]
      }
    ],
    barcode: {
      type: 'QR_CODE',
      value: qrCodeData
    }
  };
};

/**
 * Generate Samsung Pay pass data structure
 * @param {Object} cardData - Card information
 * @param {string} qrCodeData - QR code data string
 * @returns {Object} Samsung Pay pass data
 */
export const generateSamsungPayPassData = (cardData, qrCodeData) => {
  return {
    cardType: 'PAYMENT_CARD',
    cardNumber: cardData.cardNumber,
    cardHolderName: cardData.cardHolder,
    expiryDate: cardData.expiryDate,
    cardBrand: cardData.cardType,
    balance: cardData.balance,
    currency: cardData.currency,
    qrCode: qrCodeData
  };
};

/**
 * Create QR code data for the card
 * @param {Object} cardData - Card information
 * @returns {string} JSON string of card data
 */
export const createQRCodeData = (cardData) => {
  const cardInfo = {
    type: 'payment_card',
    cardNumber: cardData.cardNumber,
    cardHolder: cardData.cardHolder,
    expiryDate: cardData.expiryDate,
    cardType: cardData.cardType,
    balance: cardData.balance,
    currency: cardData.currency,
    timestamp: Date.now()
  };
  return JSON.stringify(cardInfo);
};

/**
 * Generate a simple QR code SVG
 * @param {string} data - Data to encode in QR code
 * @returns {string} Data URL of the SVG QR code
 */
export const generateQRCodeSVG = (data) => {
  const size = 128;
  const cellSize = 4;
  const cells = Math.floor(size / cellSize);
  
  let svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<rect width="${size}" height="${size}" fill="white"/>`;
  
  // Generate a simple pattern based on the data
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      const hash = data.charCodeAt((i * cells + j) % data.length);
      if (hash % 2 === 0) {
        svg += `<rect x="${i * cellSize}" y="${j * cellSize}" width="${cellSize}" height="${cellSize}" fill="black"/>`;
      }
    }
  }
  
  svg += '</svg>';
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Download a file with the given data
 * @param {Blob} blob - File blob
 * @param {string} filename - Name of the file to download
 */
export const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Get wallet display name
 * @param {string} walletType - Type of wallet
 * @returns {string} Display name
 */
export const getWalletDisplayName = (walletType) => {
  const walletNames = {
    apple: 'Apple Wallet',
    google: 'Google Wallet',
    samsung: 'Samsung Pay'
  };
  return walletNames[walletType] || walletType;
};

/**
 * Validate card data for wallet integration
 * @param {Object} cardData - Card information
 * @returns {Object} Validation result
 */
export const validateCardData = (cardData) => {
  const errors = [];
  
  if (!cardData.cardNumber || cardData.cardNumber.length < 10) {
    errors.push('Invalid card number');
  }
  
  if (!cardData.cardHolder || cardData.cardHolder.trim().length === 0) {
    errors.push('Card holder name is required');
  }
  
  if (!cardData.expiryDate || !/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
    errors.push('Invalid expiry date format (MM/YY)');
  }
  
  if (!cardData.cardType) {
    errors.push('Card type is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
