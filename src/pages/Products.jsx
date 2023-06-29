import { collection, getDocs, query, where, or, and } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const Products = ({ platform, type }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, "products");

      console.log(platform);

      let productQuery = query(
        productsRef,
        and(where("platform", "==", platform))
      );

      await getDocs(productQuery).then((response) => {
        console.log(response);
      });
    };

    fetchProducts();
  });
  return <div></div>;
};

export default Products;
