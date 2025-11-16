// javascript
import en from './en';
import fr from './fr';
import es from './es';

const messages = { en, fr, es };

// Default language
let currentLanguage = 'en';

// Set the current language
export function setLanguage(lang) {
    if (messages[lang]) {
        currentLanguage = lang;
    } else {
        console.warn(`Language '${lang}' not supported. Defaulting to 'en'.`);
        currentLanguage = 'en';
    }
}

// Get the current language
export function getLanguage() {
    return currentLanguage;
}

// Get a message by key path (e.g., 'breed.errorNoType')
export function getMessage(keyPath) {
    const keys = keyPath.split('.');
    let message = messages[currentLanguage];

    for (const key of keys) {
        if (message && Object.prototype.hasOwnProperty.call(message, key)) {
            message = message[key];
        } else {
            console.warn(`Message key '${keyPath}' not found for language '${currentLanguage}'.`);
            return keyPath;
        }
    }

    return message;
}

// Export all messages for direct access if needed
export default messages;
