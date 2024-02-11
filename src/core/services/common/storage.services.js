const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key) => {
  const value = JSON.parse(localStorage.getItem(key));
  return value && value;
};

const removeItem = (key) => {
  if (getItem(key)) localStorage.removeItem(key);
};

const clearStorage = () => {
  localStorage.clear();
};

export { setItem, getItem, removeItem, clearStorage };
