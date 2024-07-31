export type MarkParam = {
  index: number;
  lng: number;
  lat: number;
};
export type PointParams = {
  id: string;
  location: {
    lng: number;
    lat: number;
  };
  timestamp: string;
  next: string | null;
};
