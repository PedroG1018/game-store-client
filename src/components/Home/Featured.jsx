import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import ProductCard from "../ProductCard";
import { Spinner } from "@material-tailwind/react";

const Featured = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [open, setOpen] = useState(false);

  const featuredProductsQuery = query(
    collection(db, "featuredProducts"),
    limit(4)
  );

  // fetches the featured products to be displayed
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      await getDocs(featuredProductsQuery)
        .then(async (response) => {
          let products = [];

          for (const product of response.docs) {
            const docRef = doc(db, "products", product.data().productId);
            await getDoc(docRef)
              .then((response) => {
                products.push(response);
              })
              .catch((error) => {
                console.log("Unable to fetch product:", error);
              });
          }

          // save featured prouducts to state
          setFeaturedProducts(products);
        })
        .catch((error) => {
          console.log("Unable to fetch featured products:", error);
        });

      setOpen(false);
    };

    setOpen(true);
    fetchFeaturedProducts();
  }, []);

  if (open) {
    return <Spinner className="flex mx-auto h-12 w-12" />;
  }

  return (
    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-3">
      {featuredProducts.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default Featured;
