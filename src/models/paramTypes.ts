export type PointParams = {
  id: string;
  location: {
    lng: number;
    lat: number;
  };
  timestamp: string;
  next: string | null;
};
