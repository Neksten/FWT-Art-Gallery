export const classParser = (
  classes: string[],
  styles: Record<string, string>
): string => {
  return classes.map((className) => styles[className]).join(" ");
};
