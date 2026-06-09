// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const htmlElement = document.documentElement;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            htmlElement.setAttribute('data-theme', 'light');
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
        }
    });
}

// i18n Logic
const langSwitcher = document.getElementById('langSwitcher');

function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    localStorage.setItem('vnot_lang', lang);
    htmlElement.setAttribute('lang', lang);
}

if (langSwitcher) {
    const langs = [
        { code: 'en', name: 'English' },
        { code: 'id', name: 'Bahasa Indonesia' },
        { code: 'th', name: 'ภาษาไทย' }
    ];
    
    langs.forEach(l => {
        const option = document.createElement('option');
        option.value = l.code;
        option.textContent = l.name;
        langSwitcher.appendChild(option);
    });

    const savedLang = localStorage.getItem('vnot_lang') || 'en';
    langSwitcher.value = savedLang;
    updateLanguage(savedLang);

    langSwitcher.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });
} else {
    // If no switcher is present (e.g. on legal pages without header changes), just apply saved lang
    const savedLang = localStorage.getItem('vnot_lang') || 'en';
    updateLanguage(savedLang);
}
