import { Carousel, IconButton, Typography } from "@material-tailwind/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

const ImageCarousel = ({ type }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const featuredProductsQuery = query(
    collection(db, "featuredProducts"),
    where("type", "==", type)
  );
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

          setFeaturedProducts(products);
        })
        .catch((error) => {
          console.log("Unable to fetch featured products:", error);
        });
    };

    fetchFeaturedProducts();
  }, [type]);

  return (
    <div className="justify-center flex">
      <Carousel className="rounded-xl">
        {featuredProducts.map((featuredProduct) => (
          <div
            key={featuredProduct.id}
            className="justify-center items-center flex bg-blue-900 p-10"
          >
            <img
              src={featuredProduct.data().image}
              alt={featuredProduct.data().name}
              className="h-[30em] object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
