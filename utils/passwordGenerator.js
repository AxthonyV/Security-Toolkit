const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export function generateSecurePassword(length = 16) {
  const allChars = lowercase + uppercase + numbers + symbols;
  let password = '';
  
  // Ensure at least one character from each category
  password += getRandomChar(lowercase);
  password += getRandomChar(uppercase);
  password += getRandomChar(numbers);
  password += getRandomChar(symbols);
  
  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += getRandomChar(allChars);
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

function getRandomChar(charset) {
  return charset[Math.floor(Math.random() * charset.length)];
}