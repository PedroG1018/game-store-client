import { Button, Typography } from "@material-tailwind/react/";
import { Rating } from "@mui/material";
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

  return (
    <div className="flex my-10 justify-center mx-auto space-x-8">
      <div className="p-2">
        <img src={item.image} alt="product" className="h-[30em]" />
      </div>
      <div className="flex flex-col min-w-[30em]">
        <Typography
          variant="h5"
          className="font-semibold text-blue-900 capitalize"
        >
          {item.name}
        </Typography>
        <Typography variant="h6" className=" text-red-500">
          ${item.price}
        </Typography>
        <Typography variant="h6" className="capitalize">
          <strong>Condition: </strong>
          {item.condition}
        </Typography>
        <div className="flex space-x-2 mt-1 pl-0">
          <Rating name="rating" value={1} disabled />
          <Typography
            as="a"
            href="#reviews"
            variant="h6"
            className="text-gray-800 hover:text-black"
          >
            1.0 Rated
          </Typography>
        </div>

        <div className="flex my-10 items-center">
          <Typography variant="h6">Quantity:</Typography>

          <button
            className="mx-4 bg-blue-900 rounded-lg h-8 px-4"
            onClick={(e) => handleQuantity("-")}
          >
            <Typography variant="h5" className="text-white">
              -
            </Typography>
          </button>
          <Typography className="space-x-1">{quantity}</Typography>
          <button
            className="ml-4 bg-blue-900 rounded-lg h-8 px-4"
            onClick={(e) => handleQuantity("+")}
          >
            <Typography variant="h5" className="text-white">
              +
            </Typography>
          </button>
        </div>

        <Button
          fullWidth
          className="bg-yellow-400 rounded-lg border font-semibold hover:bg-red-600 hover:text-white text-black mb-4 capitalize text-sm transition-colors"
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
