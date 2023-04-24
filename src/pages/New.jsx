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
import {
  Select,
  Option,
  Card,
  Input,
  Typography,
  Button,
  Checkbox,
} from "@material-tailwind/react";

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

  const handleRadio = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    console.log(value);

    setData({ ...data, [name]: value });
  };

  // changes
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const res = await addDoc(collection(db, "products"), data);
      alert(res.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" placeholder="Name" />
            <Input size="lg" label="Email" />
            <Input type="password" size="lg" label="Password" />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-blue-500"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
      <div className="my-10 mx-20">
        <h1 className="text-blue-700 font-semibold text-3xl pb-4">
          NEW PRODUCT
        </h1>
        <Card color="transparent">
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Name" />
              <Input size="lg" label="Email" />
            </div>
          </form>
        </Card>
        <form onSubmit={handleAdd} className=" block m-0 max-w-screen-md">
          <div className="w-[20em] mb-10 mx-auto">
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
              <label htmlFor="file" className="font-semibold">
                Upload Image <DriveFolderUploadOutlinedIcon />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className="justify-left">
            <div className="space-x-10 flex">
              <div>
                <label className="block font-semibold">Product Name</label>
                <input
                  type="text"
                  className="border py-1 px-2"
                  id="name"
                  onChange={handleInput}
                  placeholder="name"
                />
              </div>
              <div>
                <label className="block font-semibold">Price</label>
                <input
                  type="decimal"
                  className="border py-1 px-2 w-[6em]"
                  id="price"
                  onChange={handleInput}
                  placeholder="$"
                />
              </div>
              <div>
                <label className="block font-semibold">Quantity</label>
                <input
                  type="number"
                  className="border py-1 px-2 w-[6em]"
                  id="quantity"
                  onChange={handleInput}
                  placeholder="#"
                />
              </div>
            </div>

            <div className="mt-4 items-center justify-center flex">
              <ul className=" w-[40em] text-sm font-medium border border-gray-200 rounded-lg md:flex">
                <li className="w-full border-b border-gray-200 md:border-r-0">
                  <div className="flex items-center pl-3">
                    <input
                      type="radio"
                      value="New"
                      name="condition"
                      id="list-radio-new"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      onChange={handleRadio}
                    />
                    <label
                      htmlFor="list-radio-new"
                      className="w-full py-3 ml-2 text-sm font-medium "
                    >
                      New
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 md:border-b-0">
                  <div className="flex items-center pl-3">
                    <input
                      type="radio"
                      value="Refurbished"
                      name="condition"
                      id="list-radio-refurbished"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      onChange={handleRadio}
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
                      value="Used"
                      name="condition"
                      id="list-radio-used"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      onChange={handleRadio}
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

            <div className="mt-4 flex justify-center">
              <ul className=" w-[40em] text-sm font-medium border border-gray-200 rounded-lg sm:flex">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:borer-r-0">
                  <div className="flex items-center pl-3">
                    <input
                      type="radio"
                      value="Console"
                      name="type"
                      id="list-radio-console"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      onChange={handleRadio}
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
                      value="Game"
                      name="type"
                      id="list-radio-game"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      onChange={handleRadio}
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

            <div className="mt-4 flex">
              <div>
                <label htmlFor="date" className="block font-semibold">
                  Release Date
                </label>
                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-5 p-2.5"
                />
              </div>
              <div>
                <label htmlFor="platform" className="block font-semibold">
                  Platform
                </label>
                <div className="w-72">
                  <Select label="Select Platform" className=" h-full">
                    <Option>N64</Option>
                    <Option>N64</Option>
                    <Option>N64</Option>
                    <Option>N64</Option>
                    <Option>N64</Option>
                  </Select>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <div className="w-[30em]">
                <label className="font-semibold block">Description</label>
                <textarea
                  className="border border-gray-300 focus:ring-blue-500 focus:ring-2 rounded h-20 py-1 px-2 w-[30em] bg-gray-50"
                  id="desc"
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="mt-4 bg-blue-700 rounded-lg text-white py-3 px-8 focus:ring-blue-500 focus:border-blue-500 hover:bg-red-600 font-bold"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default New;
