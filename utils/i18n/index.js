import en from './en.js';
import es from './es.js';

export const languages = {
  en,
  es
};

export async function selectLanguage(prompts) {
  const { language } = await prompts({
    type: 'select',
    name: 'language',
    message: 'Select your language / Seleccione su idioma:',
    choices: [
      { title: 'English', value: 'en' },
      { title: 'Español', value: 'es' }
    ]
  });
  
  return languages[language];
}