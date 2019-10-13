function CurrentLanguage( lang = 'en' ) {
    if( lang === 'en') {
        return require("../static/language_en.json");
    } else if (lang === 'de') {
        return {};
    } else {
        throw new Error("Unknown language: " + lang);
    }
};

export default CurrentLanguage;