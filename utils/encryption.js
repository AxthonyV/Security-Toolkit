import CryptoJS from 'crypto-js';

export function encryptText(text, key) {
  return CryptoJS.AES.encrypt(text, key).toString();
}

export function decryptText(encryptedText, key) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}