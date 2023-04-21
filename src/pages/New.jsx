import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import React, { useState } from "react";

const New = () => {
  const [file, setFile] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const res = await addDoc(collection(db, "products"), {
        condition: "New",
        desc: "test product",
        details: {
          platform: "test",
          region: "test",
          releaseDate: serverTimestamp(),
          type: "test",
        },
        image: "test",
        name: "test",
        price: 100.99,
        quantity: 4,
      });
      console.log(res.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:flex">
      <form onSubmit={handleAdd}>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default New;
