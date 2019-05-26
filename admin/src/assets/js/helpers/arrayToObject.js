/* eslint-disable */
export const arrayToObject = key => (array) => {
  const object = {};
  for (const item of array) {
    object[item[key]] = item;
  }
  return object;
};
