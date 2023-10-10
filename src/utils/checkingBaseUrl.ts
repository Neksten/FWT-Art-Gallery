export const checkingBaseUrl = (value: any) => {
  return value.toString().includes(process.env.REACT_APP_BASE_URL);
};
