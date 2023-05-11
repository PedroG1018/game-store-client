import { addDoc, collection } from "firebase/firestore";
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
  Textarea,
} from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import Spinner from "../components/Spinner";

const New = () => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [percent, setPercent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const addProduct = async () => {
      await addDoc(collection(db, "products"), data)
        .then((response) => {
          console.log("Product successfully added:", response.id);
          toast.success("Product added to inventory.");
          navigate(0);
        })
        .catch((error) => {
          console.log("Unable to add product:", error);
        });
    };

    data.image && addProduct();
  }, [data.image]);

  const handleAdd = (e) => {
    e.preventDefault();

    setOpen(true);

    if (!file) {
      console.log("empty file");
      return;
    }

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
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setData((prev) => ({ ...prev, image: downloadURL }));
        });
      }
    );

    setOpen(false);
  };

  // updates data from changes in input fields
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    console.log(id + ": " + value);

    setData({ ...data, [id]: value });
  };

  return (
    <Card color="transparent" shadow={false} className="mx-auto items-center">
      <Typography variant="h3" className="text-black">
        New Product
      </Typography>
      <form className="mt-4 mb-2 lg:flex lg:flex-row justify-center gap-10 lg:w-full">
        <div className="max-w-sm lg:mt-0 mx-auto lg:mx-0 mb-4">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt="product"
            className="mb-2"
          />
          <div className="text-center block">
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
        <div className="flex flex-col space-y-4">
          <Input
            size="lg"
            label="Product Name"
            onChange={handleInput}
            id="name"
            required
            autoFocus
          />
          <div className="flex space-x-4">
            <Input size="lg" label="Price" onChange={handleInput} id="price" />
            <Input
              type="number"
              size="lg"
              label="Quantity"
              onChange={handleInput}
              required
              id="quantity"
            />
          </div>
          <div className="flex space-x-4">
            <Select
              size="lg"
              label="Condition"
              required
              onChange={(newValue) => {
                setData({ ...data, condition: newValue });
              }}
            >
              <Option value="new">New</Option>
              <Option value="refurbished">Refurbished</Option>
              <Option value="used">Used</Option>
            </Select>
            <Select
              size="lg"
              label="Type"
              required
              onChange={(newValue) => {
                setData({ ...data, type: newValue });
              }}
            >
              <Option value="game">Game</Option>
              <Option value="console">Console</Option>
            </Select>
          </div>
          <Input
            size="lg"
            label="Release Date"
            type="date"
            id="releaseDate"
            required
            onChange={handleInput}
          />
          <div className="flex space-x-4">
            <Select
              size="lg"
              label="Select Platform"
              id="platform"
              required
              onChange={(newValue) => {
                setData({ ...data, platform: newValue });
              }}
            >
              <Option value="NES">NES</Option>
              <Option value="SNES">SNES</Option>
              <Option value="N64">N64</Option>
              <Option value="Gamecube">Gamecube</Option>
              <Option value="Wii">Wii</Option>
              <Option value="Switch">Switch</Option>
            </Select>
            <Select
              size="lg"
              label="Select Region"
              id="region"
              required
              onChange={(newValue) => {
                setData({ ...data, region: newValue });
              }}
            >
              <Option value="NTSC (US, CANADA)">NTSC (US, CANADA)</Option>
              <Option value="NTSJ (JAPAN)">NTSJ (JAPAN)</Option>
            </Select>
          </div>
          <Textarea
            label="Description"
            id="desc"
            required
            onChange={handleInput}
          />
        </div>
      </form>
      <Button className="mt-6 w-40 capitalize bg-blue-900" onClick={handleAdd}>
        Add
      </Button>
      <Spinner open={open} />
    </Card>
  );
};

export default New;
