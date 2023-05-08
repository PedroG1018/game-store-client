import {
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

const ReviewForm = ({ open, handleOpen, product }) => {
  const [value, setValue] = useState(1);
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "reviews"), {
        date: new Date().toLocaleDateString(),
        productId: product.id,
        userId: currentUser.uid,
        title,
        review,
        value,
        timeStamp: new Date().getTime(),
      });

      navigate(0);
    } catch (error) {
      console.log(error);
    }
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
          <CardHeader className="mb-4 grid h-20 place-items-center bg-blue-900">
            <Typography variant="h3" color="white">
              Write a Review
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div className="justify-center flex">
              <Rating
                name="rating"
                value={value}
                onChange={(e, newValue) => {
                  setValue(newValue);
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
              type="submit"
              onClick={handleSubmit}
              fullWidth
              className="capitalize bg-blue-900"
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </form>
  );
};

export default ReviewForm;
