
try {
    const fs = require('fs');
    const content = fs.readFileSync('d:/portfolio/translations.js', 'utf8');
    // Mock window
    const window = {};
    eval(content);
    console.log("Translations loaded successfully.");
    console.log("AR Prefix:", window.translations.ar.hero_subtitle_prefix);
} catch (e) {
    console.error("Error parsing translations.js:", e.message);
}
