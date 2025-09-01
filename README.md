# Smart Card Simulator

A React application that simulates a smart card for NFC readers. This app allows you to create a virtual smart card that can respond to NFC reader interactions, making it useful for testing, development, and educational purposes.

## Features

### 🎯 Core Functionality
- **Smart Card Simulation**: Simulates various smart card types (VISA, MasterCard, AMEX)
- **NFC Integration**: Uses Web NFC API to communicate with NFC readers
- **Real-time Logging**: Tracks all NFC interactions and responses
- **Customizable Card Data**: Edit card details, balance, and other parameters

### 💳 Smart Card Features
- Visual card representation with realistic design
- Configurable card data (number, holder, expiry, CVV, balance)
- Multiple card types support
- Real-time status indicators
- Animation effects during simulation

### 📱 NFC Capabilities
- Web NFC API integration
- Automatic NFC scanning
- Simulated NFC responses
- Support for various NFC commands
- Real-time NFC status monitoring

### 🎨 User Interface
- Modern, responsive design with Tailwind CSS
- Glassmorphism UI elements
- Real-time activity logs with filtering
- Interactive controls and status indicators
- Beautiful gradient backgrounds

## Prerequisites

- **Browser**: Chrome 89+ or Edge 89+ (Web NFC API support required)
- **HTTPS or localhost**: Web NFC API requires secure context
- **NFC Hardware**: Device with NFC capabilities (for real NFC testing)

## Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd smart-card-simulator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - For NFC functionality, use HTTPS or localhost

## Usage

### Basic Operation

1. **Start the Application**
   - The app will automatically detect NFC API support
   - Check the status indicators in the top section

2. **Configure Card Data**
   - Use the "Card Data" panel to customize your virtual card
   - Click "Edit" to modify card details
   - Use "Random" to generate a new card with random data

3. **Enable NFC Simulation**
   - Click "Start Simulation" to begin smart card simulation
   - The card will glow and show "ACTIVE" status

4. **Monitor Activity**
   - Watch the "Activity Log" for real-time NFC interactions
   - Filter logs by type (Info, Success, Error, Warning)

### NFC Testing

#### Real NFC Reader Testing
1. Ensure your device has NFC capabilities
2. Click "Start NFC" in the NFC Handler section
3. Bring an NFC reader close to your device
4. The app will respond with simulated smart card data

#### Simulated NFC Testing
1. Click "Simulate NFC Read" for manual testing
2. Use "Start Auto Simulation" for continuous testing
3. Monitor the logs for interaction details

### Smart Card Responses

The app simulates responses to common smart card commands:

- **SELECT**: Returns card AID and type information
- **GET_CHALLENGE**: Provides authentication challenge
- **VERIFY_PIN**: Simulates PIN verification
- **READ_RECORD**: Returns card holder and balance data
- **GET_BALANCE**: Provides current balance information

## Browser Compatibility

| Browser | NFC Support | Notes |
|---------|-------------|-------|
| Chrome 89+ | ✅ Full | Best support |
| Edge 89+ | ✅ Full | Good support |
| Firefox | ❌ None | No Web NFC API |
| Safari | ❌ None | No Web NFC API |

## Technical Details

### Architecture
- **Frontend**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS with custom animations
- **NFC**: Web NFC API (NDEFReader)
- **State Management**: React useState and useEffect

### Key Components
- `App.js`: Main application logic and state management
- `SmartCard.js`: Visual card representation
- `NFCHandler.js`: NFC API integration and simulation
- `CardData.js`: Card data editing interface
- `LogViewer.js`: Real-time activity logging

### NFC Implementation
```javascript
// Example NFC reading
const reader = new NDEFReader();
reader.addEventListener('reading', (event) => {
  // Handle NFC read event
  const response = generateSmartCardResponse(event);
  // Send response back to reader
});
```

## Development

### Project Structure
```
src/
├── components/
│   ├── SmartCard.js      # Card visualization
│   ├── NFCHandler.js     # NFC functionality
│   ├── CardData.js       # Data editing
│   └── LogViewer.js      # Activity logging
├── App.js                # Main application
├── index.js              # React entry point
└── index.css             # Global styles
```

### Available Scripts
- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm eject`: Eject from Create React App

## Troubleshooting

### NFC Not Working
1. **Check Browser**: Ensure you're using Chrome 89+ or Edge 89+
2. **Check Protocol**: Use HTTPS or localhost (not HTTP)
3. **Check Permissions**: Allow NFC access when prompted
4. **Check Hardware**: Ensure your device has NFC capabilities

### Common Issues
- **"NFC API not supported"**: Update browser or use supported browser
- **"NFC initialization failed"**: Check device NFC settings
- **No NFC responses**: Ensure simulation is active

## Security Considerations

⚠️ **Important**: This is a simulation tool for development and testing purposes only.

- Do not use real card data in production environments
- The app generates simulated responses, not real financial data
- NFC interactions are simulated and do not represent real transactions
- Always test with dummy data in development environments

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and development purposes. Use responsibly and in accordance with applicable laws and regulations.

## Support

For issues, questions, or contributions:
- Check the troubleshooting section
- Review browser compatibility
- Ensure proper setup and permissions
- Test with supported browsers and devices

---

**Note**: This application is designed for testing and development purposes. It does not handle real financial transactions or sensitive data.
