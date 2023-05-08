import React, { useContext, useState } from "react";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import { Button, Typography } from "@material-tailwind/react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const Reviews = ({ reviews, product }) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleOpen = () => {
    if (currentUser) {
      setOpen((cur) => !cur);
      return;
    }

    toast.error("You must be logged in to write a review");
  };

  return (
    <>
      <div
        id="reviews"
        className="flex flex-row justify-between items-center mt-14"
      >
        <Typography variant="h4" fontWeight="10" className="text-blue-900">
          Reviews
        </Typography>
        <Button className="capitalize bg-blue-900" onClick={handleOpen}>
          Write a Review
        </Button>
      </div>
      {reviews.map((review) => {
        return <Review key={review.id} review={review.data()} />;
      })}
      <ReviewForm open={open} handleOpen={handleOpen} product={product} />
    </>
  );
};

export default Reviews;
