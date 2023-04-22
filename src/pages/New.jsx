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

  // updates data from changes in input fields
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  // changes
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
    <div className="my-10 mx-10 justify-center">
      <form onSubmit={handleAdd}>
        <div className="w-[20em] mb-10">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt="product"
            className="object-center mb-2"
          />
          <div className="text-center">
            <label htmlFor="file">
              Image: <DriveFolderUploadOutlinedIcon className="icon" />
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className="space-x-10 flex justify-center">
          <div>
            <label className="font-semibold">Product Name:</label>
            <input type="text" className="border ml-2 pl-2" id="name" />
          </div>
          <div>
            <label className="font-semibold">Price:</label>
            <input
              type="number"
              className="border ml-2 pl-2 w-[6em]"
              id="price"
            />
          </div>
          <div>
            <label className="font-semibold">Quantity:</label>
            <input
              type="number"
              className="border ml-2 pl-2 w-[6em] mr-2"
              id="quantity"
            />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-left">Condition:</h3>
          <ul className=" w-[40em] text-sm font-medium border border-gray-200 rounded-lg sm:flex">
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:borer-r-0">
              <div className="flex items-center pl-3">
                <input
                  type="radio"
                  value=""
                  name="list-radio-condition"
                  id="list-radio-new"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="list-radio-new"
                  className="w-full py-3 ml-2 text-sm font-medium "
                >
                  New
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:borer-r-0">
              <div className="flex items-center pl-3">
                <input
                  type="radio"
                  value=""
                  name="list-radio-condition"
                  id="list-radio-refurbished"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="list-radio-refurbished"
                  className="w-full py-3 ml-2 text-sm font-medium"
                >
                  Refurbished
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:borer-r-0">
              <div className="flex items-center pl-3">
                <input
                  type="radio"
                  value=""
                  name="list-radio-condition"
                  id="list-radio-used"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="list-radio-used"
                  className="w-full py-3 ml-2 text-sm font-medium "
                >
                  Used
                </label>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-left">Condition:</h3>
          <ul className=" w-[40em] text-sm font-medium border border-gray-200 rounded-lg sm:flex">
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:borer-r-0">
              <div className="flex items-center pl-3">
                <input
                  type="radio"
                  value=""
                  name="list-radio-type"
                  id="list-radio-console"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="list-radio-console"
                  className="w-full py-3 ml-2 text-sm font-medium "
                >
                  Console
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:borer-r-0">
              <div className="flex items-center pl-3">
                <input
                  type="radio"
                  value=""
                  name="list-radio-type"
                  id="list-radio-game"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="list-radio-game"
                  className="w-full py-3 ml-2 text-sm font-medium"
                >
                  Game
                </label>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-4">
          <label className="font-semibold block">Description:</label>
          <input
            type="text"
            className="border border-gray-300 focus:ring-blue-500 focus:ring-2 rounded w-full h-[6em]"
          />
        </div>

        <button type="submit" className="mt-4 bg-blue-700 rounded text-white">
          add
        </button>
      </form>
    </div>
  );
};

export default New;
