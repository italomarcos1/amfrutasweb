export function onlyValues(value, setValue) {
  // const arr = [...value];
  // if (arr[arr.length - 1] === ' ') {
  //   return false;
  // }
  if (value.slice(value.length - 1) === ' ') {
    return false;
  }
  setValue(value.toLowerCase());
}
