import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestoreDB } from ".";
import { PointParams } from "../models/paramTypes";

export const getAllLocations = () => {
  const collectionRef = collection(firestoreDB, "points");
  return getDocs(collectionRef);
};
export const addPoint = (point: PointParams) => {
  const { id, ...addData } = point;
  const docRef = doc(collection(firestoreDB, "points"), id);
  return setDoc(docRef, addData);
};
export const deletePoint = (id: string) => {
  const docRef = doc(collection(firestoreDB, "points"), id);
  return deleteDoc(docRef);
};
export const updatePoint = (point: PointParams) => {
  const { id, ...updateData } = point;
  const docRef = doc(collection(firestoreDB, "points"), id);
  return updateDoc(docRef, {
    ...updateData,
  });
};
