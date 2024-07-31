import { deletePoint } from "../firebase/locations";
import { MarkParam, PointParams } from "../models/paramTypes";

type NavProps = {
  data: PointParams[];
  callback: () => void;
};
const MapNav = ({ callback, data }: NavProps) => {
  const clearHandler = async () => {
    try {
      callback();
      data.forEach(async (item) => {
        await deletePoint(item.id);
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className="absolute bottom-16 left-1/2">
      <button
        className="w-fit px-4 py-2 rounded-2xl text-sm font-semibold shadow-md bg-white"
        onClick={clearHandler}
      >
        Clear All
      </button>
    </nav>
  );
};

export default MapNav;
