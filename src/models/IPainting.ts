import { IImage } from "@/models/IImage";

export interface IPainting {
  name: string;
  yearOfCreation: string;
  image: string;
}

export interface IMainPainting {
  _id: string;
  name: string;
  yearOfCreation: string;
  image: IImage;
  artist: string;
}

export interface IPaintingDrag extends IMainPainting {
  order: number;
}
