function CurrentLanguage() {
    let lang;

    if(localStorage.getItem('pp_lang') != null) {
        switch(localStorage.getItem('pp_lang')) {
            case "de":
                lang = "de";
                break;
            default:
                lang = "en";
        }
    } else {
        lang = "en";
    }

    if( lang === 'en') {
        return require("../static/language_en.json");
    } else if (lang === 'de') {
        return {};
    } else {
        throw new Error("Unknown language: " + lang);
    }
};

export default CurrentLanguage;