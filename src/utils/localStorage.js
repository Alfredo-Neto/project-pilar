const { stringify, parse } = JSON;

export const setStorage = (key, value, options = {}) => {
  if (!window) return;

  const { format } = options;
  window.localStorage.setItem(key, format ? stringify(value) : value);
};

export const getStorage = (key, options = {}) => {
  if (!window) return;

  const { format } = options;
  if (window.localStorage.getItem(key)) {
    try {
      const value = window.localStorage.getItem(key);
      return format ? parse(value) : value;
    } catch (error) {
      console.error(`Error parsing stored value for key ${key}: `, error);
      removeStorage(key);
    }
  }
};

export const removeStorage = (key) => {
  if (!window) return;
  window.localStorage.removeItem(key);
};
