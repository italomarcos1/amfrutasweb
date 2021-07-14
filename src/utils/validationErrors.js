export default function getValidationErrors(data, err) {
  const validationErrors = {};

  const dataArray = Object.entries(data);
  const errorsArray = err.inner.map(e => e.path);

  dataArray.forEach(item => {
    validationErrors[item[0]] = errorsArray.includes(item[0]);
  });

  return validationErrors;
}
