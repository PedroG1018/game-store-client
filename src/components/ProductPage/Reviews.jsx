import React, { useEffect, useState } from "react";
import Review from "./Review";
import { collection, getDoc, query } from "firebase/firestore";
import { db } from "../../firebase";

const Reviews = ({ reviews }) => {
  const [users, setUsers] = useState([]);

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
