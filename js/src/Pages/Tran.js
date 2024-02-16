const {Translate} = require('@google-cloud/translate').v2;

const translate = new Translate({
  keyFilename: 'path/to/your/service-account-key.json',
});

async function detectLanguage(text) {
  const [language] = await translate.detect(text);
  return language;
}

async function translateText(text, targetLanguage) {
  const translation = await translate.translate(text, targetLanguage);
  return translation[0];
}

async function getSupportedLanguages() {
  const languages = await translate.getLanguages();
  return languages;
}

module.exports = {
  detectLanguage,
  translateText,
  getSupportedLanguages,
};

export default translate ;