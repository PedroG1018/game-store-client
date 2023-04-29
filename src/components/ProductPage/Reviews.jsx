import React, { useContext, useState } from "react";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import { Button, Typography } from "@material-tailwind/react";
import { AuthContext } from "../../context/AuthContext";

const Reviews = ({ reviews, product }) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleOpen = () => {
    if (currentUser) {
      setOpen((cur) => !cur);
      return;
    }

    alert("You must be logged in to write a review");
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <Typography variant="h5" fontWeight="10" className="text-blue-700">
          Reviews
        </Typography>
        <Button className="text-right float-right" onClick={handleOpen}>
          Write a Review
        </Button>
      </div>
      {reviews.map((review) => {
        return <Review key={review.data().id} review={review.data()} />;
      })}
      <ReviewForm open={open} handleOpen={handleOpen} product={product} />
    </>
  );
};

export default Reviews;
