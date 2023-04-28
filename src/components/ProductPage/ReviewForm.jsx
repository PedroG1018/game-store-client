import { StarIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Checkbox,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const ReviewForm = ({ open, handleOpen, product }) => {
  const [value, setValue] = useState(1);
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);

    // try {
    //   const res = await addDoc(collection(db, "products"), {
    //     date: new Date().toLocaleDateString(),
    //     productId: 2,
    //   });
    //   alert(res.id);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <form>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-20 place-items-center"
          >
            <Typography variant="h3" color="white">
              Write a Review
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div className="justify-center flex">
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  console.log(newValue);
                }}
              />
            </div>
            <Input
              size="lg"
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              label="Review"
              size="lg"
              onChange={(e) => setReview(e.target.value)}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              type="submit"
              onClick={handleSubmit}
              fullWidth
            >
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </form>
  );
};

export default ReviewForm;
