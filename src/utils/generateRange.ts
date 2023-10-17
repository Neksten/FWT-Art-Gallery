export const generateRange = (number: number): number[] =>
  Array.from(Array(Math.ceil(number)), (_, index) => index + 1);
