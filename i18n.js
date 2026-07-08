// Internationalization utility for KrishiX
class I18n {
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

    // Method to get all translations for a specific key across all languages
    getAllTranslations(key) {
        const result = {};
        for (const lang of this.supportedLanguages) {
            if (this.translations[lang]) {
                result[lang] = this.getNestedTranslation(this.translations[lang], key);
            }
        }
        return result;
    }

    // Method to check if a translation exists
    hasTranslation(key) {
        return this.getNestedTranslation(this.translations[this.currentLanguage], key) !== null;
    }

    // Method to get translation with fallback
    tWithFallback(key, fallback = null) {
        const translation = this.t(key);
        if (translation === key) {
            return fallback || key;
        }
        return translation;
    }
}

// Create global instance
window.i18n = new I18n();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18n;
}








