// utils.js
//
// This module exports several utility functions used throughout the application.
// Functions include date formatting, random string generation, and simple text capitalization.

/**
 * Formats a given Date object into a readable string.
 * @param {Date} date - The date to format.
 * @returns {string} Formatted date string (YYYY-MM-DD HH:mm:ss).
 */
function formatDate(date) {
  const yyyy = date.getFullYear();
  // Months are zero-indexed so we add 1 and pad with zeros if needed.
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

/**
 * Generates a random alphanumeric string.
 * @param {number} length - Desired length of the random string.
 * @returns {string} Random string.
 */
function generateRandomString(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Capitalizes the first letter of the provided string.
 * @param {string} str - The string to capitalize.
 * @returns {string} Capitalized string.
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Export the utility functions
module.exports = {
  formatDate,
  generateRandomString,
  capitalize,
};