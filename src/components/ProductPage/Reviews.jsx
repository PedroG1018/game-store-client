import React from "react";
import Review from "./Review";

const Reviews = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review) => {
        return (
          <div key={review.id}>
            <Review review={review.data()} />
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
