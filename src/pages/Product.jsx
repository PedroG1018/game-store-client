import React, { useEffect, useState } from "react";
import Item from "../components/ProductPage/Item";
import Reviews from "../components/ProductPage/Reviews";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const Product = () => {
  const [item, setItem] = useState({});
  const [product, setProduct] = useState({});
  const [open, setOpen] = useState(false);
  const docId = useParams();

  const docRef = doc(db, "products", docId.productId);

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setItem(docSnap.data());
        setProduct(docSnap);
      } else {
        console.log("No such document");
      }

      setOpen(false);
    };

    setOpen(true);
    fetchData();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto px-10">
      <Spinner open={open} />
      <Item item={item} productId={product.id} />
      {product && <Reviews id="reviews" product={product} />}
    </div>
  );
};

export default Product;
