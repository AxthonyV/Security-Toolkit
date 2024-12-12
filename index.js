import chalk from 'chalk';
import prompts from 'prompts';
import { generateSecurePassword } from './utils/passwordGenerator.js';
import { checkForLeaks } from './utils/leakChecker.js';
import { encryptText, decryptText } from './utils/encryption.js';
import { validatePassword } from './utils/passwordValidator.js';
import { MENU_OPTIONS, PASSWORD_REQUIREMENTS } from './utils/constants.js';
import { selectLanguage } from './utils/i18n/index.js';

let i18n;

async function main() {
  // Select language at startup
  i18n = await selectLanguage(prompts);

  console.log(chalk.blue.bold(`\n${i18n.welcome}`));
  console.log(chalk.gray('----------------------------------------'));

  while (true) {
    const { action } = await prompts({
      type: 'select',
      name: 'action',
      message: i18n.menuPrompt,
      choices: [
        { title: i18n.menuChoices.analyzePassword, value: MENU_OPTIONS.ANALYZE },
        { title: i18n.menuChoices.generatePassword, value: MENU_OPTIONS.GENERATE },
        { title: i18n.menuChoices.encryptText, value: MENU_OPTIONS.ENCRYPT },
        { title: i18n.menuChoices.decryptText, value: MENU_OPTIONS.DECRYPT },
        { title: i18n.menuChoices.exit, value: MENU_OPTIONS.EXIT }
      ]
    });

    if (action === MENU_OPTIONS.EXIT) break;

    switch (action) {
      case MENU_OPTIONS.ANALYZE:
        await analyzePassword();
        break;
      case MENU_OPTIONS.GENERATE:
        await generatePassword();
        break;
      case MENU_OPTIONS.ENCRYPT:
        await encryptMessage();
        break;
      case MENU_OPTIONS.DECRYPT:
        await decryptMessage();
        break;
    }
  }
}

async function analyzePassword() {
  const { password } = await prompts({
    type: 'password',
    name: 'password',
    message: i18n.passwordAnalysis.enterPassword
  });

  const analysis = validatePassword(password);
  const leakCheck = await checkForLeaks(password);

  console.log(`\n${i18n.passwordAnalysis.title}`);
  console.log('----------------');
  console.log(`${i18n.passwordAnalysis.strength} ${getColoredStrength(analysis.score, analysis.strengthText)}`);
  console.log(`${i18n.passwordAnalysis.crackTime} ${analysis.crackTime}`);
  
  if (analysis.warning) {
    console.log(chalk.yellow(`${i18n.passwordAnalysis.warning} ${analysis.warning}`));
  }
  
  if (analysis.suggestions.length > 0) {
    console.log(chalk.cyan(`\n${i18n.passwordAnalysis.suggestions}`));
    analysis.suggestions.forEach(suggestion => {
      console.log(`- ${suggestion}`);
    });
  }

  if (leakCheck.found) {
    console.log(chalk.red('\n⚠️ ' + leakCheck.message));
  }
}

async function generatePassword() {
  const { length } = await prompts({
    type: 'number',
    name: 'length',
    message: i18n.passwordGeneration.lengthPrompt,
    initial: PASSWORD_REQUIREMENTS.DEFAULT_LENGTH,
    min: PASSWORD_REQUIREMENTS.MIN_LENGTH,
    max: PASSWORD_REQUIREMENTS.MAX_LENGTH
  });

  const password = generateSecurePassword(length);
  console.log(chalk.green(`\n${i18n.passwordGeneration.result}`), chalk.white(password));
}

async function encryptMessage() {
  const response = await prompts([
    {
      type: 'text',
      name: 'text',
      message: i18n.encryption.enterText
    },
    {
      type: 'password',
      name: 'key',
      message: i18n.encryption.enterKey
    }
  ]);

  const encrypted = encryptText(response.text, response.key);
  console.log(chalk.green(`\n${i18n.encryption.result}`), chalk.white(encrypted));
}

async function decryptMessage() {
  const response = await prompts([
    {
      type: 'text',
      name: 'text',
      message: i18n.decryption.enterText
    },
    {
      type: 'password',
      name: 'key',
      message: i18n.decryption.enterKey
    }
  ]);

  try {
    const decrypted = decryptText(response.text, response.key);
    console.log(chalk.green(`\n${i18n.decryption.result}`), chalk.white(decrypted));
  } catch (error) {
    console.log(chalk.red(`\n${i18n.decryption.error}`));
  }
}

function getColoredStrength(score, text) {
  const colors = {
    0: chalk.red,
    1: chalk.red,
    2: chalk.yellow,
    3: chalk.green,
    4: chalk.green.bold
  };
  return colors[score](text);
}

main().catch(console.error);