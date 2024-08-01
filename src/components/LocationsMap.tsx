import { Map, MapMouseEvent, MapRef, NavigationControl } from "react-map-gl";
import MapCluster from "./MapCluster";
import MapPoint from "./MapPoint";
import MapNav from "./MapNav";
import { useRef, useState } from "react";
import { PointParams } from "../models/paramTypes";
import { addEvent } from "../utils/pointEvents";

type MapProps = {
  points: PointParams[];
  setPoints: React.Dispatch<React.SetStateAction<PointParams[]>>;
};
const LocationsMap = ({ points, setPoints }: MapProps) => {
  const initialPosition = { lat: 50.390438, lng: 30.451204 };
  const mapRef = useRef<MapRef>(null);
  const [visibleMarks, setVisible] = useState(true);
  const [styleLoaded, setStyleLoaded] = useState(false);
  const clickHandler = (e: MapMouseEvent) => {
    const map = mapRef?.current?.getMap();
    const zoom = map?.getZoom() || 0;
    const features =
      map?.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      }) || [];

    if (features?.length > 0) {
      map?.jumpTo({
        center: [e.lngLat.lng, e.lngLat.lat],
      });
      map?.zoomTo(zoom + 2, { duration: 1000 });
    } else {
      const time = new Date(Date.now());
      addEvent(
        {
          id: `point${Date.now()}`,
          location: {
            lng: e.lngLat.lng,
            lat: e.lngLat.lat,
          },
          timestamp: time.toString(),
          next: null,
        },
        points,
        setPoints
      );
    }
  };

  const onMoveHandler = () => {
    const map = mapRef?.current?.getMap();
    const features = map?.queryRenderedFeatures() || [];
    if (features.length > 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  return (
    <div className="w-full h-fit p-10 relative">
      {true && (
        <Map
          ref={mapRef}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
          initialViewState={{
            longitude: initialPosition.lng,
            latitude: initialPosition.lat,
            zoom: 10,
          }}
          styleDiffing={true}
          onLoad={() => setStyleLoaded(true)}
          onClick={clickHandler}
          style={{ width: "100%", height: "40rem" }}
          onMove={() => onMoveHandler()}
          mapStyle="mapbox://styles/jonobane/clz9qbwvp004201qw3pdr2q9n"
        >
          {styleLoaded ? (
            <>
              {visibleMarks &&
                points.map((item, index) => (
                  <MapPoint
                    key={index}
                    index={index + 1}
                    point={item}
                    points={points}
                    onChange={setPoints}
                  />
                ))}
              <MapCluster marks={points} />
              <NavigationControl position="top-right" />
            </>
          ) : (
            <>
              <h1 className="text-center font-bold text-2xl"> Loading...</h1>
            </>
          )}
        </Map>
      )}

      {points.length > 0 && (
        <MapNav data={points} callback={() => setPoints([])} />
      )}
    </div>
  );
};

export default LocationsMap;
