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
import { useNavigate } from "react-router-dom";

const ReviewForm = ({ open, handleOpen, product }) => {
  const [value, setValue] = useState(1);
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      await addDoc(collection(db, "reviews"), {
        date: new Date().toLocaleDateString(),
        productId: product.id,
        userId: currentUser.uid,
        title,
        review,
        value,
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
              variant="gradient"
              type="submit"
              onClick={handleSubmit}
              fullWidth
            >
              Post
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </form>
  );
};

export default ReviewForm;
