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
  Radio,
} from "@material-tailwind/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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

    // run upload file function if a file has been selected
    file && uploadFile();
  }, [file]);

  // updates data from changes in input fields
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    console.log(id + ": " + value);

    setData({ ...data, [id]: value });
  };

  const handleRadio = (e) => {
    const name = e.target.name;
    const id = e.target.id;

    console.log(name + ": " + id);

    setData({ ...data, [name]: id });
  };

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
      <form className="mt-8 mb-2 lg:flex lg:flex-row justify-center gap-10 lg:w-full">
        <div>
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Product Name"
              onChange={handleInput}
              id="name"
            />
            <Input size="lg" label="Price" onChange={handleInput} id="price" />
            <Input
              type="number"
              size="lg"
              label="Quantity"
              onChange={handleInput}
              id="quantity"
            />
          </div>
          <div>
            <Typography className="ml-3 font-semibold">Condition</Typography>
            <Radio
              id="new"
              name="condition"
              label="New"
              onChange={handleRadio}
            />
            <Radio
              id="refurbished"
              name="condition"
              label="Refurbished"
              onChange={handleRadio}
            />
            <Radio
              id="used"
              name="condition"
              label="Used"
              onChange={handleRadio}
            />
          </div>
          <div className="mb-4">
            <Typography className="ml-3 font-semibold">Type</Typography>
            <Radio
              id="console"
              name="type"
              label="Console"
              onChange={handleRadio}
            />
            <Radio id="game" name="type" label="Game" onChange={handleRadio} />
          </div>
          <div className="mb-6 flex flex-col gap-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Release Date"
                slotProps={{ textField: { helperText: "MM/DD/YYYY" } }}
                onChange={(newValue) => {
                  const releaseDate = newValue.$d.toLocaleDateString();
                  setData({ ...data, releaseDate: releaseDate });
                }}
              />
            </LocalizationProvider>
            <Select
              label="Select Platform"
              id="platform"
              onChange={(newValue) => {
                setData({ ...data, platform: newValue });
              }}
            >
              <Option value="NES">NES</Option>
              <Option value="SNES">SNES</Option>
              <Option value="N64">N64</Option>
              <Option value="Gamecube">Gamecube</Option>
              <Option value="Wii">Wii</Option>
            </Select>
            <Select
              label="Select Region"
              id="region"
              onChange={(newValue) => {
                setData({ ...data, region: newValue });
              }}
            >
              <Option value="NTSC (US, CANADA)">NTSC (US, CANADA)</Option>
              <Option value="NTSJ (JAPAN)">NTSJ (JAPAN)</Option>
            </Select>
          </div>
          <Textarea label="Description" id="desc" onChange={handleInput} />
        </div>
        <div className="max-w-sm items-center mt-4 lg:mt-0">
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
      </form>
      <Button className="mt-6 w-60" onClick={handleAdd}>
        Add
      </Button>
    </Card>
  );
};

export default New;
