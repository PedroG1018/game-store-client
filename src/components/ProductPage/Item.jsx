import { Button, Typography } from "@material-tailwind/react";
import { Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import Spinner from "../Spinner";

const Item = ({ item, productId }) => {
  const [cartId, setCartId] = useState("");
  const [inCart, setInCart] = useState(false);
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

          const cartItemsQuery = query(
            collection(db, "cartItems"),
            where("cartId", "==", cartId)
          );

          await getDocs(cartItemsQuery)
            .then((response) => {
              const cartItems = response.docs;

              for (const item of cartItems) {
                if (productId === item.data().productId) {
                  setInCart(true);
                  return;
                }
                setInCart(false);
              }
            })
            .catch((error) => {
              console.log("Unable to fetch cart items:", error);
            });
        })
        .catch((error) => {
          console.log("Unable to fetch cart:", error);
        });
    };

    fetchCart();
  }, [cartId]);

  // handles
  const handleQuantity = (e, type) => {
    e.preventDefault();

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

  const handleAddToCart = async () => {
    if (inCart) {
      toast.error("Item already in your cart");
      return;
    }

    setOpen(true);

    await addDoc(collection(db, "cartItems"), {
      cartId,
      productId,
      quantity,
    })
      .then((response) => {
        console.log("Item added to cart!", response);
        toast.success("Item added to your cart");
        setInCart(true);
      })
      .catch((error) => {
        console.log("Unable to add item to cart:", error);
      });

    setOpen(false);
  };

  return (
    <div className="flex my-10 justify-center mx-auto space-x-8">
      <div className="max-w-[24em] rounded-3xl border p-2">
        <img src={item.image} alt="product" />
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
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button
          fullWidth
          className="bg-gray-100 px-6 rounded-lg border font-semibold hover:bg-red-600 hover:text-white text-black capitalize text-sm transition-colors"
        >
          Add to Wishlist
        </Button>
        <Spinner open={open} />
      </div>
    </div>
  );
};

export default Item;
