export const getPageRange = (initialPages: number[], activePage: number) => {
  const lastEl = initialPages[initialPages.length - 1];

  if (initialPages.length <= 5) {
    return initialPages;
  }
  if (activePage === 1) {
    return [...initialPages.slice(0, 3), 0, lastEl];
  }
  if (activePage === lastEl) {
    return [initialPages[0], 0, ...initialPages.slice(lastEl - 3, lastEl)];
  }
  if (activePage !== 1 && activePage <= 3) {
    return [...initialPages.slice(0, 4), 0, lastEl];
  }
  if (activePage !== lastEl && activePage >= lastEl - 2) {
    return [initialPages[0], 0, ...initialPages.slice(lastEl - 4, lastEl)];
  }

  return [
    initialPages[0],
    0,
    ...initialPages.slice(activePage - 2, activePage + 1),
    0,
    initialPages[initialPages.length - 1],
  ];
};
