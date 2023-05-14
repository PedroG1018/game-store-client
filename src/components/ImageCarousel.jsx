import { Carousel } from "@material-tailwind/react";
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
import { useNavigate } from "react-router-dom";

const ImageCarousel = ({ type }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const navigate = useNavigate();

  const featuredProductsQuery = query(
    collection(db, "featuredProducts"),
    where("type", "==", type)
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
    };

    fetchFeaturedProducts();
  }, [type]);

  return (
    <div className="justify-center flex">
      <Carousel className="rounded-xl">
        {featuredProducts.map((featuredProduct) => (
          <div
            key={featuredProduct.id}
            className="justify-center items-center flex pt-10 pb-14 bg-gradient-to-r from-indigo-400 to-blue-900"
          >
            <img
              src={featuredProduct.data().image}
              alt={featuredProduct.data().name}
              className="h-[30em] object-cover drop-shadow-xl hover:opacity-90 cursor-pointer"
              onClick={() => navigate(`/products/${featuredProduct.id}`)}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
