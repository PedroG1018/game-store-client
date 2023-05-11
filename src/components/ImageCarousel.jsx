import { Carousel, IconButton } from "@material-tailwind/react";
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
import { ArrowRight } from "@mui/icons-material";

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
          console.log(response.docs);
          let products = [];

          for (const product of response.docs) {
            console.log(product.data().productId);
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

  console.log("featuredProducts:", featuredProducts);

  return (
    <Carousel
      className="rounded-xl"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="black"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 -translate-y-2/4 left-4"
        >
          <ArrowLeftIcon strokeWidth={2} className="w-6 h-6" />
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="black"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 -translate-y-2/4 !right-4"
        >
          <ArrowRightIcon strokeWidth={2} className="w-6 h-6" />
        </IconButton>
      )}
    >
      <img
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
        alt="image 3"
        className="h-full w-full object-cover"
      />
      {featuredProducts.map((featuredProduct) => (
        <img
          key={featuredProduct.id}
          src={featuredProduct.data().image}
          alt={featuredProduct.data().name}
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
