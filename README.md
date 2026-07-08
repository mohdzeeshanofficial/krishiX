# KrishiX - Smart Crops Advisory System 

KrishiX is an intelligent agricultural advisory system that provides farmers with personalized crop recommendations, weather insights, soil analysis, and pest detection using AI-powered technologies. This is a **frontend-only** version that works entirely in the browser.

## 🌱 Features

### Core Functionality
- **Smart Crop Recommendations**: AI-powered crop suggestions based on soil type, weather conditions, and farm size
- **Weather Integration**: Real-time weather data and forecasts for informed farming decisions
- **Soil Analysis**: Comprehensive soil testing and improvement recommendations
- **Pest & Disease Detection**: AI-powered image recognition for pest and disease identification
- **Irrigation Scheduling**: Smart irrigation recommendations based on weather and soil conditions
- **Farming Advisory**: Personalized farming advice and recommendations

### Advanced Features
- **Multilingual Support**: Available in English, Hindi, Telugu, and Bengali
- **Single Sign In/Up Button**: Simplified authentication with one button
- **Frontend Only**: No database or backend required
- **Real-time Notifications**: Weather alerts and farming reminders
- **Crop Management**: Track and manage multiple crops
- **Yield Optimization**: Data-driven insights for maximum crop yield
- **Language Detection**: Automatic language detection based on browser settings

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or database setup required!

### Installation

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd krishi-crops
   ```

2. **Install dependencies (optional - for development server)**
   ```bash
   npm install
   ```

3. **Start the application**
   
   **Option 1: Using npm (recommended)**
   ```bash
   npm start
   ```
   
   **Option 2: Using any static file server**
   - Open `public/index.html` directly in your browser
   - Or use any static file server like Live Server, Python's http.server, etc.

4. **Access the application**
   - If using npm: Opens automatically at `http://localhost:3000`
   - If opening directly: File opens in your default browser

## 📁 Project Structure

```
krishi-crops/
├── public/
│   ├── index.html           # Main application interface
│   └── js/
│       ├── app.js           # Main application logic
│       └── i18n.js          # Internationalization
├── locales/                 # Language files
│   ├── en.json             # English translations
│   ├── hi.json             # Hindi translations
│   ├── te.json             # Telugu translations
│   └── bn.json             # Bengali translations
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## 🌐 Multilingual Support

KrishiX supports multiple languages to serve farmers across different regions:

### Supported Languages
- **English** 🇺🇸 - Default language
- **Hindi** 🇮🇳 - हिन्दी
- **Telugu** 🇮🇳 - తెలుగు  
- **Bengali** 🇧🇩 - বাংলা

### Language Features
- **Automatic Detection**: Detects user's preferred language from browser settings
- **Language Switcher**: Easy language switching in the interface
- **Localized Content**: Crop names, descriptions, and recommendations in local languages
- **Cultural Adaptation**: Content adapted for local farming practices and terminology

## 🎯 How to Use

### 1. **Getting Started**
- Open the application in your browser
- Click "Get Started" or "Sign In / Sign Up" button
- Choose between Sign In or Sign Up in the modal

### 2. **Authentication**
- **Sign Up**: Create a new account with your details
- **Sign In**: Use existing credentials (demo mode)
- No real authentication - works entirely offline!

### 3. **Using the Dashboard**
Once signed in, you can access:
- **Crop Recommendations**: Get personalized crop suggestions
- **Weather Forecast**: View weather data and forecasts
- **Soil Analysis**: Analyze soil conditions and get recommendations
- **Pest Detection**: Upload images to detect pests and diseases
- **Farming Advisory**: Get personalized farming advice

### 4. **Language Switching**
- Use the language switcher in the top navigation
- Select from English, Hindi, Telugu, or Bengali
- All content updates automatically

## 🔧 Features in Detail

### Smart Crop Recommendations
- Enter your location, soil type, farm size, and conditions
- Get AI-powered crop suggestions with compatibility scores
- View detailed information about each recommended crop
- Add crops to your virtual farm

### Weather Integration
- View current weather conditions
- See 7-day weather forecast
- Get weather-based farming recommendations
- Monitor temperature, humidity, rainfall, and wind conditions

### Soil Analysis
- Input soil parameters (pH, moisture, nutrients)
- Get comprehensive soil health analysis
- Receive improvement recommendations
- View cost estimates for soil treatments

### Pest & Disease Detection
- Upload crop images for analysis
- Get AI-powered pest and disease identification
- Receive treatment recommendations
- Access prevention tips and best practices

### Farming Advisory
- Get personalized daily farming advice
- View upcoming tasks and schedules
- Receive weather alerts and recommendations
- Access expert farming tips

## 🌾 Sample Data

The application includes comprehensive sample data for:

- **Crops**: Rice, Wheat, Tomato, Maize, Potato, Sugarcane
- **Weather**: Mock weather data and forecasts
- **Soil**: Sample soil analysis results
- **Pests**: Common pest and disease information
- **Advisory**: Farming recommendations and tips

## 🎨 User Interface

The application features a modern, responsive design with:

- **Clean Interface**: Intuitive and easy to navigate
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Language Support**: Full multilingual interface
- **Interactive Elements**: Smooth animations and transitions
- **Accessibility**: Screen reader friendly

## 🚀 Deployment

### Static Hosting
Since this is a frontend-only application, you can deploy it on any static hosting service:

- **GitHub Pages**: Free hosting for public repositories
- **Netlify**: Drag and drop deployment
- **Vercel**: Easy deployment with Git integration
- **AWS S3**: Static website hosting
- **Any web server**: Apache, Nginx, etc.

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or open directly in browser
open public/index.html
```

## 🔮 Future Enhancements

- Mobile application (React Native)
- IoT sensor integration
- Machine learning model improvements
- Additional language support (Tamil, Gujarati, Marathi, etc.)
- Advanced analytics dashboard
- Integration with government agricultural schemes
- Blockchain-based supply chain tracking
- Voice-based interface in local languages
- Offline PWA capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🌟 Key Benefits

- **No Setup Required**: Works immediately in any browser
- **Offline Capable**: No internet required after initial load
- **Multilingual**: Serves farmers in their native language
- **User Friendly**: Simple, intuitive interface
- **Comprehensive**: All farming needs in one place
- **Free**: Completely free to use

---

**KrishiX** - Empowering farmers with smart agricultural technology for sustainable and profitable farming. Now available as a frontend-only application for maximum accessibility! 🌱
