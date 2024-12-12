export const MENU_OPTIONS = {
  ANALYZE: 'analyze',
  GENERATE: 'generate',
  ENCRYPT: 'encrypt',
  DECRYPT: 'decrypt',
  EXIT: 'exit'
};

export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 128,
  DEFAULT_LENGTH: 16
};

export const MENU_CHOICES = [
  { title: 'Analyze Password Strength', value: MENU_OPTIONS.ANALYZE },
  { title: 'Generate Secure Password', value: MENU_OPTIONS.GENERATE },
  { title: 'Encrypt Text', value: MENU_OPTIONS.ENCRYPT },
  { title: 'Decrypt Text', value: MENU_OPTIONS.DECRYPT },
  { title: 'Exit', value: MENU_OPTIONS.EXIT }
];