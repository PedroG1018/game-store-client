import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const New = () => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [percent, setPercent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log("Upload is " + progress + " % done");
          setPercent(progress);

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const res = await addDoc(collection(db, "products"), data);
      console.log(res.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:flex">
      <img
        src={
          file
            ? URL.createObjectURL(file)
            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
        }
        alt="product"
      />

      <form onSubmit={handleAdd}>
        <label htmlFor="file">
          Image: <DriveFolderUploadOutlinedIcon className="icon" />
        </label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "none" }}
        />
        <label></label>
        <input type=""></input>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default New;
