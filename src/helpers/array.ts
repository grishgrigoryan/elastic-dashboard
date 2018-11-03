export const union = (array: Array<any>) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    let value = array[i];
    result.indexOf(value) == -1 && result.push(value)
  }
  return result;
};