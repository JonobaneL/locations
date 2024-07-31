import { Marker } from "react-map-gl";
import { PointParams } from "../models/paramTypes";
import { useState } from "react";
import { deleteEvent } from "../utils/pointEvents";

type PointProps = {
  index: number;
  point: PointParams;
  points: PointParams[];
  onChange: React.Dispatch<React.SetStateAction<PointParams[]>>;
};

const MapPoint = ({ index, point, points, onChange }: PointProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const removeHandler = (id: string) => {
    deleteEvent(id, points, onChange);
  };
  const updateMark = (id: string, newLng: number, newLat: number) => {
    onChange((p) => {
      return p.map((item) => {
        if (item.id == id)
          return { ...item, location: { lat: newLat, lng: newLng } };
        return item;
      });
    });
  };
  return (
    <Marker
      latitude={point.location.lat}
      longitude={point.location.lng}
      draggable={true}
      scale={10}
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        if (isDragging == false) {
          removeHandler(point.id);
        }
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(e) => {
        setTimeout(() => {
          setIsDragging(false);
        }, 100);
        updateMark(point.id, e.lngLat.lng, e.lngLat.lat);
      }}
    >
      <div className="w-fit h-fit relative flex  justify-center rounded-full cursor-default">
        <p className="absolute top-1 text-white text-sm font-bold">{index}</p>
        <img className="w-9" src="/mark.svg" alt="mark" />
      </div>
    </Marker>
  );
};

export default MapPoint;
