import { Button, Typography } from "@material-tailwind/react/";
import { Rating } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import Spinner from "../Spinner";

const Item = ({ item, productId }) => {
  const [cartId, setCartId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  // fetches the user's cart id
  useEffect(() => {
    const fetchCart = async () => {
      const cartQuery = query(
        collection(db, "cart"),
        where("userId", "==", currentUser.uid)
      );

      await getDocs(cartQuery)
        .then(async (response) => {
          setCartId(response.docs[0].id);
        })
        .catch((error) => {
          console.log("Unable to fetch cart:", error);
        });
    };

    fetchCart();
  }, [cartId]);

  // handles
  const handleQuantity = (type) => {
    if (type === "+") {
      if (quantity === 9) {
        toast.error(`Limit ${quantity} per customer`);
        return;
      }
      setQuantity(quantity + 1);
    } else if (type === "-") {
      if (quantity === 1) {
        return;
      }
      setQuantity(quantity - 1);
    }
  };

  // attempts to add item to user's cart
  const addToCart = async () => {
    setOpen(true);

    const cartItemsQuery = query(
      collection(db, "cartItems"),
      where("productId", "==", productId)
    );

    await getDocs(cartItemsQuery)
      .then(async (response) => {
        if (response.docs.length > 0) {
          toast.error("Item already in your cart");
          setOpen(false);
          return;
        }

        await addDoc(collection(db, "cartItems"), {
          cartId,
          productId,
          quantity,
        })
          .then((response) => {
            console.log("Item added to cart!", response);
            toast.success("Item added to your cart");
          })
          .catch((error) => {
            console.log("Unable to add item to cart:", error);
          });
      })
      .catch((error) => {
        console.log("Unable to fetch cart items:", error);
      });

    setOpen(false);
  };

  if (!item.price) {
    return;
  }

  return (
    <div className="flex my-10 justify-center mx-auto space-x-8">
      <div className="p-2">
        <img src={item.image} alt="product" className="" />
      </div>
      <div className="flex flex-col max-w-[30em]">
        <Typography variant="h3" className="font-semibold capitalize">
          {item.name}
        </Typography>
        <Typography variant="h5" className="font-medium">
          ${item.price.toFixed(2)}
        </Typography>
        <div className="flex space-x-2 mt-1">
          <Rating value={Math.floor(item.rating)} readonly />
          <Typography
            as="a"
            href="#reviews"
            variant="h6"
            className="text-gray-800 hover:text-black font-medium"
          >
            {item.rating}
          </Typography>
        </div>

        <div className="mt-2">
          <Typography variant="h6" className="font-medium text-gray-600">
            <strong>Description: </strong>
            {item.desc}
          </Typography>
        </div>

        <div className="mt-2">
          <Typography variant="h6" className="font-medium text-gray-600">
            <strong>Platform: </strong>
            {item.platform}
          </Typography>
          <Typography variant="h6" className="font-medium text-gray-600">
            <strong>Region: </strong>
            {item.region}
          </Typography>
          <Typography variant="h6" className="font-medium text-gray-600">
            <strong>Release Date: </strong>
            {item.releaseDate}
          </Typography>
        </div>

        <Button
          fullWidth
          className="bg-yellow-400 hover:bg-yellow-600 rounded-lg shadow-none border font-semibold text-black mt-4 capitalize text-sm"
          onClick={addToCart}
        >
          Add to Cart
        </Button>
        <Spinner open={open} />
      </div>
    </div>
  );
};

export default Item;
