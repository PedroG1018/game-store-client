import React, { useEffect, useState } from "react";
import Review from "./Review";
import { collection, getDoc, query } from "firebase/firestore";
import { db } from "../../firebase";
import { Typography } from "@mui/material";

const Reviews = ({ reviews }) => {
  return (
    <div>
      <h1 className="text-blue-700 font-bold text-3xl">Reviews</h1>
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
