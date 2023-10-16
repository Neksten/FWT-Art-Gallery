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
