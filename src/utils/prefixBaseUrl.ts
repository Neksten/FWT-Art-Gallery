export const prefixBaseUrl = (value: string | undefined) => {
  return value ? `${process.env.REACT_APP_BASE_URL}${value}` : "";
};
