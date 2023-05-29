export interface Photo {
  id: string;
  src: string;
  width: number;
  height: number;
}
export interface Images {
  onPhoto: (photos: FileList | null) => void;
}
