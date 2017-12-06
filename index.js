'use strict';

const sanitizer = require('sanitizer');

/**
 * Replaces the $ with the html code
 * @param {String} string - Input string
 * @returns {String} - Sanitized string
 */
const mongoSanitize = (string) => {
  string.replace('.', '&#46;');

  if (string.substring(0, 1) === '$') {
    return `&#36;${string.substring(1)}`;
  }
  return string;
};

/**
 * Sanitizes a variable recursive for xss injection
 * @param {*} variable - The object or string to sanitize
 * @returns {Object} - The sanitized object
 */
const sanitizeRecursive = (variable) => {
  if (typeof variable === 'object' && variable !== null) {
    for (let key in variable) {
      let cleanKey = sanitizer.sanitize(key);
      cleanKey = mongoSanitize(cleanKey);
      if (cleanKey !== key) {
        variable[cleanKey] = variable[key];
        delete variable[key];
        key = cleanKey;
      }

      variable[key] = sanitizeRecursive(variable[key]);
    }
  } else if (typeof variable === 'string') {
    return sanitizer.sanitize(variable);
  }
  return variable;
};

/**
 * Sanitizes query, post or raw body params recursively
 *
 * @param {Object} request
 * @returns {*}
 */
const sanitize = (request) => {
  request.query = sanitizeRecursive(request.query);
  request.params = sanitizeRecursive(request.params);
  request.body = sanitizeRecursive(request.body);
  return request;
};

module.exports = {sanitize};