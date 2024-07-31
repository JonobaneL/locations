import { addPoint, deletePoint, updatePoint } from "../firebase/locations";
import { PointParams } from "../models/paramTypes";

export const deleteEvent = async (
  id: string,
  points: PointParams[],
  onChange: React.Dispatch<React.SetStateAction<PointParams[]>>
) => {
  const parent = points.find((item) => item.next == id);
  const current = points.find((item) => item.id === id);
  const child = points.find((item) => item.id == current?.next);
  const result = points.map((item) => {
    if (item.id == parent?.id) return { ...item, next: child?.id || null };
    return item;
  });
  onChange(result.filter((item) => item.id !== current?.id));
  try {
    await deletePoint(id);
    if (parent) await updatePoint({ ...parent, next: child?.id || null });
  } catch (err) {
    console.log(err);
  }
};
export const addEvent = async (
  newPoint: PointParams,
  points: PointParams[],
  onChange: React.Dispatch<React.SetStateAction<PointParams[]>>
) => {
  const parent = points.find((item) => !item?.next || item.next == null);
  const result = points.map((item) => {
    if (item.id == parent?.id) return { ...item, next: newPoint.id };
    return item;
  });
  onChange([...result, newPoint]);
  try {
    await addPoint(newPoint);
    if (parent) await updatePoint({ ...parent, next: newPoint.id });
  } catch (err) {
    console.log(err);
  }
};
