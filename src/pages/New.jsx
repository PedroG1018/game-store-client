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
  Textarea,
  Radio,
} from "@material-tailwind/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Label } from "@mui/icons-material";

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
    <Card
      color="transparent"
      shadow={false}
      className="mx-auto my-10 items-center"
    >
      <Typography variant="h3" className="text-blue-700">
        NEW PRODUCT
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleAdd}
      >
        <div className="mb-4 flex flex-col gap-6 mx-auto justify-center">
          <Input size="lg" label="Product Name" />
          <Input size="lg" label="Price ($X.XX)" />
          <Input type="number" size="lg" label="Quantity" />
        </div>
        <div className="flex gap-10 justify-center">
          <Radio id="new" name="condition" label="New" />
          <Radio id="refurbished" name="condition" label="Refurbished" />
          <Radio id="used" name="condition" label="Used" />
        </div>
        <div className="flex gap-10 justify-center mb-4">
          <Radio id="console" name="type" label="Console" />
          <Radio id="game" name="type" label="Game" />
        </div>
        <div className="mb-6 flex flex-col gap-6">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Release Date"
              slotProps={{ textField: { helperText: "MM/DD/YYYY" } }}
            />
          </LocalizationProvider>
          <Select label="Select Platform">
            <Option>N64</Option>
            <Option>N64</Option>
            <Option>N64</Option>
            <Option>N64</Option>
            <Option>N64</Option>
          </Select>
        </div>
        <div className="">
          <Textarea label="Description" />
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
        <Button className="mt-6" fullWidth>
          Add
        </Button>
      </form>
    </Card>
  );
};

export default New;
