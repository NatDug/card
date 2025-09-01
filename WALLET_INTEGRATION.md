# Digital Wallet Integration

This Smart Card Simulator now includes digital wallet integration capabilities, allowing users to add their simulated cards to popular digital wallets like Apple Wallet, Google Wallet, and Samsung Pay.

## Features

### Supported Digital Wallets

1. **Apple Wallet** - For iPhone and Apple Watch users
2. **Google Wallet** - For Android device users  
3. **Samsung Pay** - For Samsung device users

### Key Functionality

- **Pass Generation**: Create wallet passes with card information
- **QR Code Generation**: Generate QR codes for quick access
- **File Download**: Download wallet pass files (.pkpass for Apple, .json for others)
- **Data Validation**: Validate card data before generating passes
- **Clipboard Integration**: Copy card data to clipboard

## How to Use

### Adding Cards to Digital Wallets

1. **Configure Your Card**: Use the Card Data section to set up your card information
2. **Choose Your Wallet**: Select from Apple Wallet, Google Wallet, or Samsung Pay
3. **Generate Pass**: Click the "Add to [Wallet]" button
4. **Download File**: Download the generated pass file
5. **Import to Wallet**: Follow the platform-specific instructions below

### Platform-Specific Instructions

#### Apple Wallet
1. Download the `.pkpass` file
2. Open the file on your iPhone
3. Tap "Add to Wallet"
4. Your card will appear in Apple Wallet

#### Google Wallet
1. Download the `.json` file
2. Open Google Wallet app
3. Import the file
4. Your card will be added to Google Wallet

#### Samsung Pay
1. Download the `.json` file
2. Open Samsung Pay app
3. Import the file
4. Your card will be added to Samsung Pay

### QR Code Access

- A QR code is automatically generated containing your card data
- Scan the QR code with your wallet app for quick access
- Use the "Copy Card Data" button to copy the card information to clipboard

## Technical Details

### File Structure

```
src/
├── components/
│   ├── WalletIntegration.js    # Main wallet integration component
│   └── DigitalWallet.js        # Alternative wallet component
├── utils/
│   └── walletUtils.js          # Utility functions for wallet operations
└── App.js                      # Updated main app with wallet integration
```

### Pass Data Structure

#### Apple Wallet (.pkpass)
```json
{
  "formatVersion": 1,
  "passTypeIdentifier": "pass.com.smartcard.simulator",
  "serialNumber": "card-[timestamp]",
  "teamIdentifier": "TEAM123456",
  "organizationName": "Smart Card Simulator",
  "description": "Digital Payment Card",
  "generic": {
    "primaryFields": [...],
    "secondaryFields": [...],
    "auxiliaryFields": [...]
  },
  "barcodes": [...],
  "locations": [...]
}
```

#### Google Wallet (.json)
```json
{
  "genericObjects": [
    {
      "id": "card-[timestamp]",
      "cardTitle": {...},
      "subheader": {...},
      "header": {...},
      "textModulesData": [...]
    }
  ],
  "barcode": {...}
}
```

#### Samsung Pay (.json)
```json
{
  "cardType": "PAYMENT_CARD",
  "cardNumber": "...",
  "cardHolderName": "...",
  "expiryDate": "...",
  "cardBrand": "...",
  "balance": 0,
  "currency": "...",
  "qrCode": "..."
}
```

### Validation

The system validates card data before generating passes:

- Card number must be at least 10 characters
- Card holder name is required
- Expiry date must be in MM/YY format
- Card type is required

### Security Notice

⚠️ **Important**: This is a demonstration application. 

- Do not use with real payment cards
- Generated passes contain simulated data only
- Real wallet integration requires proper certification and security measures
- Always verify the source before adding cards to your wallet

## Development

### Adding New Wallet Support

1. Create a new pass generation function in `walletUtils.js`
2. Add the wallet type to the `getWalletDisplayName` function
3. Update the `WalletIntegration` component to include the new wallet option
4. Add appropriate styling and icons

### Customizing Pass Data

Modify the pass generation functions in `walletUtils.js` to customize:
- Pass appearance and layout
- Included card information
- Barcode format and content
- Location data

### Styling

The wallet integration uses Tailwind CSS classes and custom animations:
- Hover effects on wallet cards
- Smooth transitions and animations
- Responsive design for different screen sizes

## Browser Compatibility

- Modern browsers with ES6+ support
- Clipboard API support for copy functionality
- File download support for pass files

## Future Enhancements

- Real QR code generation library integration
- Additional wallet platforms (PayPal, Venmo, etc.)
- Pass customization options
- Real-time pass updates
- NFC-based wallet integration
- Biometric authentication support
