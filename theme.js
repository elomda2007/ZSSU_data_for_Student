(function () {
    const root = document.documentElement;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    function getTheme() {
        return localStorage.getItem('theme') || (systemPrefersDark ? 'dark' : 'light');
    }

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        root.classList.toggle('dark-mode', isDark);

        const toggle = document.getElementById('checkbox');
        if (toggle) toggle.checked = !isDark; // checked = light mode
    }

    // Runs immediately (in <head>), so the theme is set before the page paints
    applyTheme(getTheme());

    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.getElementById('checkbox');
        if (!toggle) return;

        toggle.checked = !root.classList.contains('dark-mode');

        toggle.addEventListener('change', () => {
            const theme = toggle.checked ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            applyTheme(theme);
        });
    });

    // Fixes the back-button case: re-read the saved theme when a page is restored from cache
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) applyTheme(getTheme());
    });
})();