import { IMainPainting } from "@/models/IImage";

export const rangePaintings = (
  data: IMainPainting[],
  activePage: number
): IMainPainting[] => data.slice(6 * (activePage - 1), 6 * activePage);
