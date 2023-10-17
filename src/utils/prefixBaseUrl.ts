export const prefixBaseUrl = (value: string | undefined) =>
  value ? `${process.env.REACT_APP_BASE_URL}${value}` : "";
