const utils = {};

/**
 * Similaire au _debounce de lodash: Retarde l'execution de la fonction de 'wait'ms à chaque appel afin d'appeler la fonction seulement quand il n'y a plus de changement
 * @param {function} func : fonction dont la fréquence d'exécution est à limiter
 * @param {Int} wait : temps d'attente (ms) sans appel à la fonction avant de l'exécuter
 * @returns {Function} fonction qui exécute la fonction en argument, mais à fréquence limitée
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunc(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Permet de limiter la fréquence d'utilisation d'une fonction en ne l'appelant au maximum 1 fois toutes les 'wait'ms
 * @param {Function} func : fonction dont la fréquence d'exécution est à limiter
 * @param {Number} wait : temps d'attente minimum entre 2 appels
 * @returns {Function} fonction qui exécute la fonction en argument, mais à fréquence limitée
 */
const throttle = (func, wait) => {
  let timeout;
  let storedArgs;
  return function executedFunc(...args) {
    storedArgs = args;
    if (!timeout) {
      func(...storedArgs);
      storedArgs = null;
      timeout = setTimeout(() => {
        if (storedArgs) {
          func(...storedArgs);
        }
        timeout = null;
      }, wait);
    }
  };
};

utils.debounce = debounce;
utils.throttle = throttle;

export default utils;
