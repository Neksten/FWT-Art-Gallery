import { IPaintingDrag } from "@/models/IPainting";

export const rangePaintings = (
  data: IPaintingDrag[],
  activePage: number
): IPaintingDrag[] => data.slice(6 * (activePage - 1), 6 * activePage);
