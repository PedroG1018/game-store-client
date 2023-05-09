import React, { useContext, useEffect, useState } from "react";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Pagination } from "@mui/material";
import {
  collection,
  endBefore,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import Spinner from "../Spinner";

const Reviews = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [active, setActive] = useState(1);
  const [numReviews, setNumReviews] = useState(1);

  const { currentUser } = useContext(AuthContext);

  const next = async (e) => {
    e.preventDefault();

    if (active === numReviews) return;

    const reviewsQuery = query(
      collection(db, "reviews"),
      where("productId", "==", product.id || ""),
      limit(5),
      orderBy("timeStamp"),
      startAfter(reviews[reviews.length - 1].data().timeStamp)
    );

    fetchReviews(reviewsQuery);

    setActive(active + 1);
  };

  const prev = async (e) => {
    e.preventDefault();

    if (active === 1) return;

    const reviewsQuery = query(
      collection(db, "reviews"),
      where("productId", "==", product.id || ""),
      limit(5),
      orderBy("timeStamp"),
      endBefore(reviews[0].data().timeStamp)
    );

    fetchReviews(reviewsQuery);

    setActive(active - 1);
  };

  const fetchReviews = async (reviewsQuery) => {
    await getDocs(reviewsQuery)
      .then((response) => {
        setReviews(response.docs);
      })
      .catch((error) => {
        console.log("Unable to fetch reviews:", error);
      });
  };

  useEffect(() => {
    const reviewsQuery = query(
      collection(db, "reviews"),
      where("productId", "==", product.id || ""),
      orderBy("timeStamp"),
      limit(5)
    );

    const coll = query(
      collection(db, "reviews"),
      where("productId", "==", product.id || "")
    );

    const fetchReviewCount = async (coll) => {
      await getDocs(coll)
        .then((response) => {
          console.log("total reviews:", response.docs.length);
          setNumReviews(Math.ceil(response.docs.length / 5));
          console.log("numReviews:", numReviews);
        })
        .catch((error) => {
          console.log("Unable to fetch review count:", error);
        });
    };

    fetchReviews(reviewsQuery);
    fetchReviewCount(coll);
  }, [product, numReviews]);

  const handleOpen = () => {
    if (currentUser) {
      setOpen((cur) => !cur);
      return;
    }

    toast.error("You must be logged in to write a review");
  };

  console.log(reviews);

  return (
    <div id="reviews">
      <div className="flex flex-row justify-between items-center mt-6">
        <Typography variant="h4" fontWeight="10" className="text-blue-900">
          Reviews
        </Typography>
        <Button className="capitalize bg-blue-900" onClick={handleOpen}>
          Write a Review
        </Button>
      </div>
      {reviews.map((review) => {
        console.log("review:");
        return <Review key={review.id} review={review.data()} />;
      })}

      <div className="flex items-center justify-center gap-8 mt-6">
        <IconButton
          size="sm"
          variant="outlined"
          color="blue-gray"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeft strokeWidth={2} className="h-4 w-4" />
        </IconButton>
        <Typography color="gray" className="font-normal">
          Page <strong className="text-blue-gray-900">{active}</strong> of{" "}
          <strong className="text-blue-gray-900">{numReviews}</strong>
        </Typography>
        <IconButton
          size="sm"
          variant="outlined"
          color="blue-gray"
          onClick={next}
          disabled={active === numReviews}
        >
          <ArrowRight strokeWidth={2} className="h-4 w-4" />
        </IconButton>
      </div>
      <ReviewForm open={open} handleOpen={handleOpen} product={product} />
    </div>
  );
};

export default Reviews;
