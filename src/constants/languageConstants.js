// Language
var languageTexts = {}
languageTexts["tr"] = require('locales/tr/locale.json');


class Language {
  constructor(code) {
    this.languages = ["en", "tr"];
    this.defaultLanguageCode = "en";

    this.setLanguage(code);
  }

  setLanguage(code) {
    if (this.languages.includes(code)) {
      this.code = code;
    } else {
      this.code = this.defaultLanguageCode
    }
  }

  getLanguage() {
    return this.code;
  }

  trans(text) {
    text = text.trim().replace(/\s\s+/g, ' ');

    if (this.code === this.defaultLanguageCode) {
      return text;
    } else {
      return languageTexts[this.code][text] || text;
    }

  }
}

export const language = new Language("tr");
