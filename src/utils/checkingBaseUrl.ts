export const checkingBaseUrl = (value: any) =>
  value.toString().includes(process.env.REACT_APP_BASE_URL);
