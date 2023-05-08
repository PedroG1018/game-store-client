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
import { Backdrop, CircularProgress } from "@mui/material";
import Spinner from "../components/Spinner";

const Product = () => {
  const [item, setItem] = useState({});
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
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
        setItem(docSnap.data());
        setProduct(docSnap);
      } else {
        console.log("No such document");
      }

      setReviews(querySnap.docs);
      setOpen(false);
    };

    setOpen(true);
    fetchData();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto">
      <Spinner open={open} />
      <Item item={item} productId={product.id} reviews={reviews} />
      <Details details={item} />
      <Reviews id="reviews" reviews={reviews} product={product} />
    </div>
  );
};

export default Product;
