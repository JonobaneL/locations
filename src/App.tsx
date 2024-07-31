import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationsMap from "./components/LocationsMap";
import { useEffect, useState } from "react";
import { getAllLocations } from "./firebase/locations";
import { PointParams } from "./models/paramTypes";
import { sortPointsByNext } from "./utils/sortPoints";

function App() {
  const [data, setData] = useState<PointParams[]>([]);
  useEffect(() => {
    getAllLocations()
      .then((data) => {
        const res: PointParams[] = [];
        data.forEach((item) =>
          res.push({ id: item.id, ...item.data() } as PointParams)
        );
        return res;
      })
      .then((res) => setData(res));
  }, []);

  const sorted = sortPointsByNext(data);
  return (
    <main className="pt-12">
      <h1 className=" text-center font-semibold text-2xl">Locations</h1>
      <LocationsMap points={sorted} setPoints={setData} />
    </main>
  );
}

export default App;
