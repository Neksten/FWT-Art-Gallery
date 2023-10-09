import { IGenre } from "@/models/IGenre";
import { IImage, IMainPainting } from "@/models/IImage";

export interface IArtistRoot {
  name: string;
  description: string;
  yearsOfLife: string;
}

export interface IArtist extends IArtistRoot {
  genres: string[];
  _id: string;
  mainPainting: IMainPainting;
}

export interface IArtistModal extends IArtistRoot {
  genres: IGenre[];
  avatar: string;
}

export interface IArtistProfile extends Omit<IArtist, "genres"> {
  paintings: IMainPainting[];
  genres: IGenre[];
  avatar: IImage;
}

export interface IArtistResponse {
  data: IArtist[];
  meta: IArtistMetaResponse;
}

export interface IArtistMetaResponse {
  count: number;
  pageNumber: number;
  perPage: number;
}
