import React, { useEffect, useState } from "react";
import Item from "../components/ProductPage/Item";
import Details from "../components/ProductPage/Details";
import Reviews from "../components/ProductPage/Reviews";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const Product = () => {
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const docId = useParams();

  const docRef = doc(db, "products", docId.productId);
  const q = query(
    collection(db, "reviews"),
    where("productId", "==", docId.productId)
  );

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDoc(docRef);
      const querySnap = await getDocs(q);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("No such document");
      }

      setReviews(querySnap.docs);
      setIsLoading(false);
    };

    setIsLoading(true);
    fetchData();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Item item={product} />
      <Details details={product} />
      <Reviews reviews={reviews} />
    </>
  );
};

export default Product;
