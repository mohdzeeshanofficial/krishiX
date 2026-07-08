// Frontend internationalization for KrishiX
class FrontendI18n {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.supportedLanguages = ['en', 'hi', 'te', 'bn'];
        this.defaultLanguage = 'en';
        this.init();
    }

    async init() {
        // Load default language first
        await this.loadLanguage(this.defaultLanguage);
        
        // Try to detect user's preferred language
        const userLanguage = this.detectLanguage();
        if (userLanguage && this.supportedLanguages.includes(userLanguage)) {
            await this.setLanguage(userLanguage);
        }
    }

    async loadLanguage(languageCode) {
        try {
            const response = await fetch(`/locales/${languageCode}.json`);
            if (response.ok) {
                this.translations[languageCode] = await response.json();
                return true;
            }
        } catch (error) {
            console.warn(`Failed to load language ${languageCode}:`, error);
        }
        return false;
    }

    async setLanguage(languageCode) {
        if (!this.supportedLanguages.includes(languageCode)) {
            console.warn(`Language ${languageCode} is not supported`);
            return false;
        }

        // Load language if not already loaded
        if (!this.translations[languageCode]) {
            const loaded = await this.loadLanguage(languageCode);
            if (!loaded) {
                console.warn(`Failed to load language ${languageCode}`);
                return false;
            }
        }

        this.currentLanguage = languageCode;
        
        // Save to localStorage
        localStorage.setItem('krishix_language', languageCode);
        
        // Update HTML lang attribute
        document.documentElement.lang = languageCode;
        
        // Update all text content
        this.updateAllText();
        
        // Trigger language change event
        this.triggerLanguageChange();
        
        return true;
    }

    detectLanguage() {
        // Check localStorage first
        const savedLanguage = localStorage.getItem('krishix_language');
        if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
            return savedLanguage;
        }

        // Check browser language
        const browserLanguage = navigator.language.split('-')[0];
        if (this.supportedLanguages.includes(browserLanguage)) {
            return browserLanguage;
        }

        // Check browser languages array
        for (const lang of navigator.languages) {
            const code = lang.split('-')[0];
            if (this.supportedLanguages.includes(code)) {
                return code;
            }
        }

        return this.defaultLanguage;
    }

    t(key, params = {}) {
        const translation = this.getNestedTranslation(this.translations[this.currentLanguage], key);
        
        if (!translation) {
            console.warn(`Translation missing for key: ${key} in language: ${this.currentLanguage}`);
            return key;
        }

        // Replace parameters in translation
        return this.replaceParams(translation, params);
    }

    getNestedTranslation(obj, key) {
        const keys = key.split('.');
        let result = obj;
        
        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k];
            } else {
                return null;
            }
        }
        
        return result;
    }

    replaceParams(text, params) {
        return text.replace(/\{(\w+)\}/g, (match, key) => {
            return params[key] !== undefined ? params[key] : match;
        });
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getSupportedLanguages() {
        return this.supportedLanguages;
    }

    getLanguageName(code) {
        const names = {
            'en': 'English',
            'hi': 'हिन्दी',
            'te': 'తెలుగు',
            'bn': 'বাংলা'
        };
        return names[code] || code;
    }

    getLanguageFlag(code) {
        const flags = {
            'en': '🇺🇸',
            'hi': '🇮🇳',
            'te': '🇮🇳',
            'bn': '🇧🇩'
        };
        return flags[code] || '🌐';
    }

    updateAllText() {
        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation && translation !== key) {
                element.textContent = translation;
            }
        });

        // Update all elements with data-i18n-html attribute
        const htmlElements = document.querySelectorAll('[data-i18n-html]');
        htmlElements.forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translation = this.t(key);
            if (translation && translation !== key) {
                element.innerHTML = translation;
            }
        });

        // Update placeholder attributes
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);
            if (translation && translation !== key) {
                element.placeholder = translation;
            }
        });

        // Update title attributes
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.t(key);
            if (translation && translation !== key) {
                element.title = translation;
            }
        });
    }

    triggerLanguageChange() {
        // Dispatch custom event for language change
        const event = new CustomEvent('languageChanged', {
            detail: {
                language: this.currentLanguage,
                translations: this.translations[this.currentLanguage]
            }
        });
        document.dispatchEvent(event);
    }

    // Method to create language switcher
    createLanguageSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <div class="relative">
                <button id="languageToggle" class="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    <span id="currentLanguageFlag">${this.getLanguageFlag(this.currentLanguage)}</span>
                    <span id="currentLanguageName">${this.getLanguageName(this.currentLanguage)}</span>
                    <i class="fas fa-chevron-down text-xs"></i>
                </button>
                <div id="languageDropdown" class="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg hidden z-50">
                    ${this.supportedLanguages.map(lang => `
                        <button class="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 language-option" data-lang="${lang}">
                            <span>${this.getLanguageFlag(lang)}</span>
                            <span>${this.getLanguageName(lang)}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Add event listeners
        const toggle = switcher.querySelector('#languageToggle');
        const dropdown = switcher.querySelector('#languageDropdown');
        const options = switcher.querySelectorAll('.language-option');

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
        });

        options.forEach(option => {
            option.addEventListener('click', async (e) => {
                e.stopPropagation();
                const lang = option.getAttribute('data-lang');
                await this.setLanguage(lang);
                dropdown.classList.add('hidden');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdown.classList.add('hidden');
        });

        return switcher;
    }
}

// Create global instance
window.i18n = new FrontendI18n();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FrontendI18n;
}








