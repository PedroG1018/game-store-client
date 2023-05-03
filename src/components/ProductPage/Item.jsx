import { Button, IconButton, Typography } from "@material-tailwind/react";
import { Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const Item = ({ item, productId }) => {
  const [cartId, setCartId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      const cartQuery = query(
        collection(db, "cart"),
        where("userId", "==", currentUser.uid)
      );

      await getDocs(cartQuery)
        .then((response) => {
          setCartId(response.docs[0].id);
        })
        .catch((error) => {
          console.log("Unable to fetch cart:", error);
        });
    };

    fetchCart();
  }, []);

  const handleQuantity = (type) => {
    if (type === "+") {
      if (quantity === 3) {
        toast.error("Limit 3 per customer");
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
    setIsLoading(true);

    await addDoc(collection(db, "cartItems"), {
      cartId,
      productId,
      quantity,
    })
      .then((response) => {
        console.log("Item added to cart!", response);
      })
      .catch((error) => {
        console.log("Unable to add item to cart:", error);
      });

    setIsLoading(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex my-10 justify-center mx-auto space-x-8">
      <div className="min-w-[35em] rounded-3xl border p-2">
        <img src={item.image} alt="product" />
      </div>
      <div className="flex flex-col min-w-[30em]">
        <div className="flex justify-between">
          <Typography
            variant="h6"
            className="font-semibold text-blue-900 mb-1 capitalize"
          >
            {item.name}
          </Typography>
          <Typography variant="h6" className=" text-red-500">
            ${item.price}
          </Typography>
        </div>
        <Typography variant="h6" className="capitalize">
          <strong>Condition: </strong>
          {item.condition}
        </Typography>
        <div className="flex space-x-2 mt-1 pl-0">
          <Rating name="rating" value={4} disabled />
          <a href="#">
            <Typography variant="h6">150 Reviews</Typography>
          </a>
        </div>

        <div className="flex my-10 items-center">
          <Typography variant="h6">Quantity:</Typography>

          <button
            className="mx-4 bg-blue-900 rounded-lg h-8 px-4"
            onClick={() => handleQuantity("-")}
          >
            <Typography variant="h5" className="text-white">
              -
            </Typography>
          </button>
          <Typography className="space-x-1">{quantity}</Typography>
          <button
            className="ml-4 bg-blue-900 rounded-lg h-8 px-4"
            onClick={() => handleQuantity("+")}
          >
            <Typography variant="h5" className="text-white">
              +
            </Typography>
          </button>
        </div>

        <Button
          fullWidth
          className="bg-yellow-300 rounded-lg border font-semibold hover:bg-red-600 hover:text-white text-black mb-2 capitalize text-sm transition-colors"
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
      </div>
    </div>
  );
};

export default Item;
