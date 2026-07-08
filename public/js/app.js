// KrishiX Application JavaScript - Frontend Only
class KrishiXApp {
    constructor() {
        this.currentUser = null;
        this.isSigninMode = true;
        this.init();
    }

    async init() {
        // Initialize internationalization
        await this.initializeI18n();
        this.setupEventListeners();
        this.checkAuthStatus();
    }

    async initializeI18n() {
        // Wait for i18n to be ready
        if (window.i18n) {
            await window.i18n.init();
            this.setupLanguageSwitcher();
        }
    }

    setupLanguageSwitcher() {
        const switcherContainer = document.getElementById('languageSwitcher');
        if (switcherContainer && window.i18n) {
            const switcher = window.i18n.createLanguageSwitcher();
            switcherContainer.appendChild(switcher);
        }
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('authBtn').addEventListener('click', () => this.showAuthModal());
        document.getElementById('getStartedBtn').addEventListener('click', () => this.showAuthModal());
        document.getElementById('learnMoreBtn').addEventListener('click', () => this.scrollToFeatures());

        // Modal controls
        document.getElementById('closeAuthModal').addEventListener('click', () => this.hideAuthModal());
        document.getElementById('signinTab').addEventListener('click', () => this.switchToSignin());
        document.getElementById('signupTab').addEventListener('click', () => this.switchToSignup());

        // Forms
        document.getElementById('signinForm').addEventListener('submit', (e) => this.handleSignin(e));
        document.getElementById('signupForm').addEventListener('submit', (e) => this.handleSignup(e));

        // Dashboard buttons
        document.getElementById('cropRecommendBtn').addEventListener('click', () => this.showCropRecommendations());
        document.getElementById('weatherBtn').addEventListener('click', () => this.showWeatherForecast());
        document.getElementById('soilBtn').addEventListener('click', () => this.showSoilAnalysis());
        document.getElementById('pestBtn').addEventListener('click', () => this.showPestDetection());
        document.getElementById('advisoryBtn').addEventListener('click', () => this.showAdvisory());
    }

    checkAuthStatus() {
        const user = localStorage.getItem('krishix_user');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.showDashboard();
        }
    }

    showAuthModal() {
        document.getElementById('authModal').classList.remove('hidden');
    }

    hideAuthModal() {
        document.getElementById('authModal').classList.add('hidden');
    }

    switchToSignin() {
        this.isSigninMode = true;
        document.getElementById('signinTab').className = 'flex-1 py-2 px-4 bg-green-600 text-white rounded-lg font-medium';
        document.getElementById('signupTab').className = 'flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-medium';
        document.getElementById('signinForm').classList.remove('hidden');
        document.getElementById('signupForm').classList.add('hidden');
    }

    switchToSignup() {
        this.isSigninMode = false;
        document.getElementById('signupTab').className = 'flex-1 py-2 px-4 bg-green-600 text-white rounded-lg font-medium';
        document.getElementById('signinTab').className = 'flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-medium';
        document.getElementById('signupForm').classList.remove('hidden');
        document.getElementById('signinForm').classList.add('hidden');
    }

    scrollToFeatures() {
        document.querySelector('.py-20.bg-white').scrollIntoView({ behavior: 'smooth' });
    }

    async handleSignin(e) {
        e.preventDefault();
        const email = document.getElementById('signinEmail').value;
        const password = document.getElementById('signinPassword').value;

        // Simulate authentication (frontend only)
        if (email && password) {
            this.currentUser = {
                id: 'demo_user_' + Date.now(),
                name: 'Demo User',
                email: email,
                farmSize: 5,
                soilType: 'loamy'
            };

            localStorage.setItem('krishix_user', JSON.stringify(this.currentUser));
            this.hideAuthModal();
            this.showDashboard();
            this.showNotification('Sign in successful!', 'success');
        } else {
            this.showNotification('Please fill in all fields', 'error');
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const phone = document.getElementById('signupPhone').value;
        const farmSize = document.getElementById('signupFarmSize').value;
        const soilType = document.getElementById('signupSoilType').value;

        // Simulate registration (frontend only)
        if (name && email && password && phone && farmSize && soilType) {
            this.currentUser = {
                id: 'demo_user_' + Date.now(),
                name: name,
                email: email,
                phone: phone,
                farmSize: parseFloat(farmSize),
                soilType: soilType
            };

            localStorage.setItem('krishix_user', JSON.stringify(this.currentUser));
            this.hideAuthModal();
            this.showDashboard();
            this.showNotification('Registration successful!', 'success');
        } else {
            this.showNotification('Please fill in all fields', 'error');
        }
    }

    showDashboard() {
        const logoutText = window.i18n ? window.i18n.t('navigation.logout') : 'Logout';
        
        document.querySelector('nav .flex.items-center.space-x-4').innerHTML = `
            <div id="languageSwitcher"></div>
            <button id="logoutBtn" class="bg-red-600/90 backdrop-blur-sm text- px-4 py-2 rounded-lg hover:bg-green-700/90 transition-all duration-300 shadow-lg">
                <i class="fas fa-sign-out-alt mr-2"></i>
                ${logoutText}
            </button>
        `;
        
        // Re-setup language switcher in dashboard
        this.setupLanguageSwitcher();
        
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
        
        document.getElementById('dashboard').classList.remove('hidden');
        document.querySelector('section.gradient-bg').style.display = 'none';
        document.querySelector('section.py-20.bg-white').style.display = 'none';
    }

    logout() {
        localStorage.removeItem('krishix_user');
        this.currentUser = null;
        location.reload();
    }

    async showCropRecommendations() {
        const content = document.getElementById('mainContent');
        const title = window.i18n ? window.i18n.t('crops.title') : 'Crop Recommendations';
        const description = window.i18n ? window.i18n.t('crops.description') : 'Get personalized crop recommendations based on your location, soil type, and farming conditions.';
        
        content.innerHTML = `
            <div class="mb-6">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">${title}</h2>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p class="text-blue-800">${description}</p>
                </div>
            </div>
            <form id="cropRecommendForm" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${window.i18n ? window.i18n.t('crops.location') : 'Location'}</label>
                        <input type="text" id="location" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your location" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${window.i18n ? window.i18n.t('crops.soilType') : 'Soil Type'}</label>
                        <select id="soilType" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">${window.i18n ? window.i18n.t('common.select') : 'Select Soil Type'}</option>
                            <option value="clay">${window.i18n ? window.i18n.t('crops.clay') : 'Clay'}</option>
                            <option value="sandy">${window.i18n ? window.i18n.t('crops.sandy') : 'Sandy'}</option>
                            <option value="loamy">${window.i18n ? window.i18n.t('crops.loamy') : 'Loamy'}</option>
                            <option value="silty">${window.i18n ? window.i18n.t('crops.silty') : 'Silty'}</option>
                            <option value="peaty">${window.i18n ? window.i18n.t('crops.peaty') : 'Peaty'}</option>
                            <option value="chalky">${window.i18n ? window.i18n.t('crops.chalky') : 'Chalky'}</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${window.i18n ? window.i18n.t('crops.farmSize') : 'Farm Size (acres)'}</label>
                        <input type="number" id="farmSize" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter farm size" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${window.i18n ? window.i18n.t('crops.season') : 'Season'}</label>
                        <select id="season" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">${window.i18n ? window.i18n.t('common.select') : 'Select Season'}</option>
                            <option value="kharif">${window.i18n ? window.i18n.t('crops.kharif') : 'Kharif'}</option>
                            <option value="rabi">${window.i18n ? window.i18n.t('crops.rabi') : 'Rabi'}</option>
                            <option value="zaid">${window.i18n ? window.i18n.t('crops.zaid') : 'Zaid'}</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${window.i18n ? window.i18n.t('crops.temperature') : 'Temperature (°C)'}</label>
                        <input type="number" id="temperature" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter temperature" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${window.i18n ? window.i18n.t('crops.rainfall') : 'Rainfall (mm)'}</label>
                        <input type="number" id="rainfall" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter rainfall" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${window.i18n ? window.i18n.t('crops.ph') : 'Soil pH'}</label>
                        <input type="number" id="ph" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter soil pH" required>
                    </div>
                </div>
                <button type="submit" class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
                    <i class="fas fa-seedling mr-2"></i>
                    ${window.i18n ? window.i18n.t('crops.getRecommendations') : 'Get Recommendations'}
                </button>
            </form>
            <div id="cropResults" class="mt-6"></div>
        `;

        document.getElementById('cropRecommendForm').addEventListener('submit', (e) => this.handleCropRecommendations(e));
    }

    async handleCropRecommendations(e) {
        e.preventDefault();
        
        // Mock crop recommendations
        const mockCrops = [
            {
                name: 'Rice',
                scientificName: 'Oryza sativa',
                category: 'Cereal',
                season: 'Kharif',
                duration: 120,
                waterRequirement: 'High',
                score: 95,
                reasons: [
                    'Compatible with your soil type',
                    'Suitable for current season',
                    'Optimal temperature range',
                    'Adequate rainfall conditions'
                ]
            },
            {
                name: 'Wheat',
                scientificName: 'Triticum aestivum',
                category: 'Cereal',
                season: 'Rabi',
                duration: 150,
                waterRequirement: 'Medium',
                score: 88,
                reasons: [
                    'Good for your soil type',
                    'Suitable for winter season',
                    'Moderate water requirement',
                    'High market demand'
                ]
            },
            {
                name: 'Tomato',
                scientificName: 'Solanum lycopersicum',
                category: 'Vegetable',
                season: 'All',
                duration: 90,
                waterRequirement: 'Medium',
                score: 82,
                reasons: [
                    'High-value crop',
                    'Good for small farms',
                    'Year-round cultivation',
                    'High market price'
                ]
            }
        ];

        this.displayCropRecommendations({ recommendations: mockCrops });
    }

    displayCropRecommendations(data) {
        const resultsDiv = document.getElementById('cropResults');
        const topRecommendations = window.i18n ? window.i18n.t('crops.topRecommendations') : 'Top Recommendations';
        const foundCrops = window.i18n ? window.i18n.t('crops.foundCrops', { count: data.recommendations.length }) : `Found ${data.recommendations.length} suitable crops for your conditions.`;
        
        resultsDiv.innerHTML = `
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <h3 class="text-lg font-semibold text-green-800 mb-2">${topRecommendations}</h3>
                <p class="text-green-700">${foundCrops}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${data.recommendations.map((rec, index) => `
                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="text-lg font-semibold text-gray-900">${rec.name}</h4>
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Score: ${rec.score}</span>
                        </div>
                        <p class="text-sm text-gray-600 mb-3">${rec.scientificName}</p>
                        <div class="space-y-2">
                            <div class="text-sm">
                                <span class="font-medium">Category:</span> ${rec.category}
                            </div>
                            <div class="text-sm">
                                <span class="font-medium">Season:</span> ${rec.season}
                            </div>
                            <div class="text-sm">
                                <span class="font-medium">Duration:</span> ${rec.duration} days
                            </div>
                            <div class="text-sm">
                                <span class="font-medium">Water Requirement:</span> ${rec.waterRequirement}
                            </div>
                        </div>
                        <div class="mt-3">
                            <h5 class="font-medium text-gray-900 mb-1">${window.i18n ? window.i18n.t('crops.whyThisCrop') : 'Why this crop?'}</h5>
                            <ul class="text-sm text-gray-600 space-y-1">
                                ${rec.reasons.map(reason => `<li>• ${reason}</li>`).join('')}
                            </ul>
                        </div>
                        <button onclick="app.addCropToFarm('${rec.name}')" class="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                            <i class="fas fa-plus mr-2"></i>
                            ${window.i18n ? window.i18n.t('crops.addToFarm') : 'Add to My Farm'}
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    async addCropToFarm(cropName) {
        this.showNotification(`${cropName} added to your farm successfully!`, 'success');
    }

    async showWeatherForecast() {
        const content = document.getElementById('mainContent');
        const title = window.i18n ? window.i18n.t('weather.title') : 'Weather Forecast';
        const description = window.i18n ? window.i18n.t('weather.description') : 'Get current weather conditions and 7-day forecast for your location.';
        
        content.innerHTML = `
            <div class="mb-6">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">${title}</h2>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p class="text-blue-800">${description}</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">${window.i18n ? window.i18n.t('weather.currentWeather') : 'Current Weather'}</h3>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-gray-600">${window.i18n ? window.i18n.t('weather.temperature') : 'Temperature'}:</span>
                            <span class="font-medium">28°C</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">${window.i18n ? window.i18n.t('weather.humidity') : 'Humidity'}:</span>
                            <span class="font-medium">65%</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">${window.i18n ? window.i18n.t('weather.rainfall') : 'Rainfall'}:</span>
                            <span class="font-medium">0 mm</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">${window.i18n ? window.i18n.t('weather.windSpeed') : 'Wind Speed'}:</span>
                            <span class="font-medium">12 km/h</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">${window.i18n ? window.i18n.t('weather.condition') : 'Condition'}:</span>
                            <span class="font-medium">Sunny</span>
                        </div>
                    </div>
                </div>
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">${window.i18n ? window.i18n.t('weather.recommendations') : 'Weather Recommendations'}</h3>
                    <div class="space-y-2">
                        <div class="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p class="text-green-800 text-sm">${window.i18n ? window.i18n.t('weather.optimalConditions') : 'Optimal weather conditions for most crops.'}</p>
                        </div>
                        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p class="text-yellow-800 text-sm">${window.i18n ? window.i18n.t('weather.monitorMoisture') : 'Monitor soil moisture levels.'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">${window.i18n ? window.i18n.t('weather.forecast') : '7-Day Forecast'}</h3>
                <div class="grid grid-cols-1 md:grid-cols-7 gap-4">
                    ${Array.from({length: 7}, (_, i) => `
                        <div class="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <div class="text-sm text-gray-600 mb-2">${window.i18n ? window.i18n.t('weather.day') : 'Day'} ${i + 1}</div>
                            <div class="text-2xl mb-2">☀️</div>
                            <div class="text-sm font-medium">30°C</div>
                            <div class="text-xs text-gray-500">Sunny</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    async showSoilAnalysis() {
        const content = document.getElementById('mainContent');
        const title = window.i18n ? window.i18n.t('soil.title') : 'Soil Analysis';
        const description = window.i18n ? window.i18n.t('soil.description') : 'Analyze your soil conditions and get recommendations for improvement.';
        
        content.innerHTML = `
            <div class="mb-6">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">${title}</h2>
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p class="text-yellow-800">${description}</p>
                </div>
            </div>
            <form id="soilAnalysisForm" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${window.i18n ? window.i18n.t('soil.ph') : 'Soil pH'}</label>
                        <input type="number" id="soilPh" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter soil pH" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${window.i18n ? window.i18n.t('soil.moisture') : 'Moisture (%)'}</label>
                        <input type="number" id="soilMoisture" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter moisture level" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${window.i18n ? window.i18n.t('soil.nitrogen') : 'Nitrogen (ppm)'}</label>
                        <input type="number" id="soilNitrogen" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter nitrogen level" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${window.i18n ? window.i18n.t('soil.phosphorus') : 'Phosphorus (ppm)'}</label>
                        <input type="number" id="soilPhosphorus" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter phosphorus level" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${window.i18n ? window.i18n.t('soil.potassium') : 'Potassium (ppm)'}</label>
                        <input type="number" id="soilPotassium" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter potassium level" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${window.i18n ? window.i18n.t('soil.organicMatter') : 'Organic Matter (%)'}</label>
                        <input type="number" id="soilOrganicMatter" step="0.1" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter organic matter" required>
                    </div>
                </div>
                <button type="submit" class="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition">
                    <i class="fas fa-flask mr-2"></i>
                    ${window.i18n ? window.i18n.t('soil.analyzeSoil') : 'Analyze Soil'}
                </button>
            </form>
            <div id="soilResults" class="mt-6"></div>
        `;

        document.getElementById('soilAnalysisForm').addEventListener('submit', (e) => this.handleSoilAnalysis(e));
    }

    async handleSoilAnalysis(e) {
        e.preventDefault();
        
        // Mock soil analysis results
        const mockResults = {
            ph: { value: 6.5, status: 'neutral', recommendation: 'pH is optimal for most crops' },
            moisture: { value: 45, status: 'optimal', recommendation: 'Moisture level is optimal' },
            nutrients: {
                nitrogen: { value: 25, status: 'adequate', recommendation: 'Nitrogen level is adequate' },
                phosphorus: { value: 15, status: 'adequate', recommendation: 'Phosphorus level is adequate' },
                potassium: { value: 80, status: 'adequate', recommendation: 'Potassium level is adequate' }
            },
            overallHealth: 'good',
            recommendations: [
                { action: 'Add organic compost', timing: 'Before planting', cost: 500 },
                { action: 'Apply balanced fertilizer', timing: 'During growth', cost: 300 }
            ]
        };

        this.displaySoilAnalysis(mockResults);
    }

    displaySoilAnalysis(data) {
        const resultsDiv = document.getElementById('soilResults');
        const results = window.i18n ? window.i18n.t('soil.results') : 'Soil Analysis Results';
        const phLevel = window.i18n ? window.i18n.t('soil.phLevel') : 'pH Level';
        const moistureLevel = window.i18n ? window.i18n.t('soil.moistureLevel') : 'Moisture Level';
        const nutrients = window.i18n ? window.i18n.t('soil.nutrients') : 'Nutrients';
        const overallHealth = window.i18n ? window.i18n.t('soil.overallHealth') : 'Overall Health';
        const recommendations = window.i18n ? window.i18n.t('soil.recommendations') : 'Recommendations';
        
        resultsDiv.innerHTML = `
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">${results}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-medium text-gray-900 mb-2">${phLevel}</h4>
                        <div class="flex items-center space-x-2">
                            <span class="text-2xl font-bold text-green-600">${data.ph.value}</span>
                            <span class="text-sm text-gray-600">(${data.ph.status})</span>
                        </div>
                        <p class="text-sm text-gray-600 mt-1">${data.ph.recommendation}</p>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-900 mb-2">${moistureLevel}</h4>
                        <div class="flex items-center space-x-2">
                            <span class="text-2xl font-bold text-green-600">${data.moisture.value}%</span>
                            <span class="text-sm text-gray-600">(${data.moisture.status})</span>
                        </div>
                        <p class="text-sm text-gray-600 mt-1">${data.moisture.recommendation}</p>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-900 mb-2">${nutrients}</h4>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-sm">Nitrogen:</span>
                                <span class="text-sm font-medium text-green-600">${data.nutrients.nitrogen.value} ppm</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm">Phosphorus:</span>
                                <span class="text-sm font-medium text-green-600">${data.nutrients.phosphorus.value} ppm</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm">Potassium:</span>
                                <span class="text-sm font-medium text-green-600">${data.nutrients.potassium.value} ppm</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-900 mb-2">${overallHealth}</h4>
                        <div class="flex items-center space-x-2">
                            <span class="text-2xl font-bold text-blue-600">${data.overallHealth.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
                <div class="mt-6">
                    <h4 class="font-medium text-gray-900 mb-2">${recommendations}</h4>
                    <div class="space-y-2">
                        ${data.recommendations.map(rec => `
                            <div class="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <p class="font-medium text-gray-900">${rec.action}</p>
                                        <p class="text-sm text-gray-600">${rec.timing}</p>
                                    </div>
                                    <span class="text-sm font-medium text-green-600">₹${rec.cost}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    async showPestDetection() {
        const content = document.getElementById('mainContent');
        const title = window.i18n ? window.i18n.t('pest.title') : 'Pest & Disease Detection';
        const description = window.i18n ? window.i18n.t('pest.description') : 'Upload an image of your crop to detect pests and diseases using AI.';
        
        content.innerHTML = `
            <div class="mb-6">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">${title}</h2>
                <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p class="text-red-800">${description}</p>
                </div>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <form id="pestDetectionForm" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${window.i18n ? window.i18n.t('pest.uploadImage') : 'Upload Image'}</label>
                        <input type="file" id="pestImage" accept="image/*" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">${window.i18n ? window.i18n.t('pest.cropType') : 'Crop Type'}</label>
                        <select id="cropType" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">${window.i18n ? window.i18n.t('common.select') : 'Select Crop Type'}</option>
                            <option value="tomato">${window.i18n ? window.i18n.t('pest.tomato') : 'Tomato'}</option>
                            <option value="wheat">${window.i18n ? window.i18n.t('pest.wheat') : 'Wheat'}</option>
                            <option value="rice">${window.i18n ? window.i18n.t('pest.rice') : 'Rice'}</option>
                            <option value="corn">${window.i18n ? window.i18n.t('pest.corn') : 'Corn'}</option>
                            <option value="potato">${window.i18n ? window.i18n.t('pest.potato') : 'Potato'}</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition">
                        <i class="fas fa-bug mr-2"></i>
                        ${window.i18n ? window.i18n.t('pest.detectPests') : 'Detect Pests & Diseases'}
                    </button>
                </form>
                <div id="pestResults" class="mt-6"></div>
            </div>
        `;

        document.getElementById('pestDetectionForm').addEventListener('submit', (e) => this.handlePestDetection(e));
    }

    async handlePestDetection(e) {
        e.preventDefault();
        
        // Mock pest detection results
        const mockResults = {
            detectedPests: [
                {
                    name: 'Aphids',
                    confidence: 0.85,
                    severity: 'medium',
                    description: 'Small, soft-bodied insects detected on leaves'
                }
            ],
            recommendations: [
                {
                    action: 'Apply neem oil spray',
                    description: 'Spray neem oil solution on affected plants',
                    timing: 'Early morning or evening',
                    cost: 150
                },
                {
                    action: 'Introduce beneficial insects',
                    description: 'Release ladybugs to control aphid population',
                    timing: 'Immediate',
                    cost: 300
                }
            ],
            prevention: [
                'Regular monitoring of plants',
                'Maintain proper plant spacing',
                'Avoid over-fertilization',
                'Use resistant varieties'
            ]
        };

        this.displayPestDetectionResults(mockResults);
    }

    displayPestDetectionResults(data) {
        const resultsDiv = document.getElementById('pestResults');
        const results = window.i18n ? window.i18n.t('pest.results') : 'Detection Results';
        const confidence = window.i18n ? window.i18n.t('pest.confidence') : 'Confidence';
        const severity = window.i18n ? window.i18n.t('pest.severity') : 'Severity';
        const recommendations = window.i18n ? window.i18n.t('pest.recommendations') : 'Recommendations';
        const prevention = window.i18n ? window.i18n.t('pest.prevention') : 'Prevention Tips';
        
        resultsDiv.innerHTML = `
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">${results}</h3>
                <div class="space-y-4">
                    ${data.detectedPests.map(pest => `
                        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div class="flex justify-between items-start mb-2">
                                <h4 class="font-medium text-red-900">${pest.name}</h4>
                                <span class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">${Math.round(pest.confidence * 100)}% ${confidence}</span>
                            </div>
                            <p class="text-sm text-red-700">${pest.description}</p>
                            <div class="mt-2">
                                <span class="text-sm font-medium text-red-900">${severity}: </span>
                                <span class="text-sm text-red-700">${pest.severity}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="mt-6">
                    <h4 class="font-medium text-gray-900 mb-2">${recommendations}</h4>
                    <div class="space-y-2">
                        ${data.recommendations.map(rec => `
                            <div class="bg-green-50 border border-green-200 rounded-lg p-3">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <p class="font-medium text-green-900">${rec.action}</p>
                                        <p class="text-sm text-green-700">${rec.description}</p>
                                        <p class="text-sm text-green-600">Timing: ${rec.timing}</p>
                                    </div>
                                    <span class="text-sm font-medium text-green-600">₹${rec.cost}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="mt-6">
                    <h4 class="font-medium text-gray-900 mb-2">${prevention}</h4>
                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
                        ${data.prevention.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    async showAdvisory() {
        const content = document.getElementById('mainContent');
        const title = window.i18n ? window.i18n.t('advisory.title') : 'Farming Advisory';
        const description = window.i18n ? window.i18n.t('advisory.description') : 'Get personalized farming advice and recommendations based on your crops and conditions.';
        const todaysAdvisory = window.i18n ? window.i18n.t('advisory.todaysAdvisory') : 'Today\'s Advisory';
        const upcomingTasks = window.i18n ? window.i18n.t('advisory.upcomingTasks') : 'Upcoming Tasks';
        
        content.innerHTML = `
            <div class="mb-6">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">${title}</h2>
                <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                    <p class="text-purple-800">${description}</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">${todaysAdvisory}</h3>
                    <div class="space-y-3">
                        <div class="bg-green-50 border border-green-200 rounded-lg p-3">
                            <div class="flex items-start space-x-2">
                                <i class="fas fa-check-circle text-green-600 mt-1"></i>
                                <div>
                                    <p class="font-medium text-green-900">${window.i18n ? window.i18n.t('advisory.soilPreparation') : 'Soil Preparation'}</p>
                                    <p class="text-sm text-green-700">${window.i18n ? window.i18n.t('advisory.prepareSoil') : 'Prepare your soil for the upcoming planting season.'}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <div class="flex items-start space-x-2">
                                <i class="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
                                <div>
                                    <p class="font-medium text-yellow-900">${window.i18n ? window.i18n.t('advisory.weatherAlert') : 'Weather Alert'}</p>
                                    <p class="text-sm text-yellow-700">${window.i18n ? window.i18n.t('advisory.highHumidity') : 'High humidity expected. Monitor for fungal diseases.'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">${upcomingTasks}</h3>
                    <div class="space-y-3">
                        <div class="flex items-center space-x-3">
                            <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <div>
                                <p class="font-medium text-gray-900">${window.i18n ? window.i18n.t('advisory.plantingSeason') : 'Planting Season'}</p>
                                <p class="text-sm text-gray-600">${window.i18n ? window.i18n.t('advisory.startIn', { days: 3 }) : 'Start in 3 days'}</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-3">
                            <div class="w-2 h-2 bg-green-600 rounded-full"></div>
                            <div>
                                <p class="font-medium text-gray-900">${window.i18n ? window.i18n.t('advisory.fertilization') : 'Fertilization'}</p>
                                <p class="text-sm text-gray-600">${window.i18n ? window.i18n.t('advisory.dueIn', { weeks: 1 }) : 'Due in 1 week'}</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-3">
                            <div class="w-2 h-2 bg-yellow-600 rounded-full"></div>
                            <div>
                                <p class="font-medium text-gray-900">${window.i18n ? window.i18n.t('advisory.pestMonitoring') : 'Pest Monitoring'}</p>
                                <p class="text-sm text-gray-600">${window.i18n ? window.i18n.t('advisory.ongoing') : 'Ongoing'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize the application
const app = new KrishiXApp();