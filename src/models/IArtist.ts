export interface IArtistProfile extends Omit<IArtist, "genres"> {
  paintings: IMainPainting[];
  genres: IGenre[];
  avatar: IImage;
}

export interface IArtist {
  genres: string[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  __v: number;
  mainPainting: IMainPainting;
}

export interface IGenre {
  _id: string;
  name: string;
}

export interface IMainPainting {
  _id: string;
  name: string;
  yearOfCreation: string;
  image: IImage;
  artist: string;
}

export interface IImage {
  _id: string;
  src: string;
  webp: string;
  src2x: string;
  webp2x: string;
  original: string;
}
