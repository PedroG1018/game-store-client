import React, { Fragment, useContext, useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const cartQuery = query(
    collection(db, "cart"),
    where("userId", "==", currentUser.uid)
  );

  useEffect(() => {
    const fetchCart = async () => {
      await getDocs(cartQuery)
        .then(async (response) => {
          const cartId = response.docs[0].id;

          const cartItemsQuery = query(
            collection(db, "cartItems"),
            where("cartId", "==", cartId)
          );

          await getDocs(cartItemsQuery)
            .then(async (response) => {
              const items = response.docs;
              let products = [];
              let qty = [];

              for (const item of items) {
                qty.push(item.data().quantity);

                const docRef = doc(db, "products", item.data().productId);

                await getDoc(docRef)
                  .then((response) => {
                    products.push(response);
                  })
                  .catch((error) => {
                    console.log("Unable to fetch products:", error);
                  });
              }

              setCartItems(products);
              setQuantities(qty);
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
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col mx-auto max-w-screen-lg w-full justify-center my-10">
      <Typography variant="h3" className="text-center mb-8">
        Your Cart
      </Typography>
      <div className="md:w-[36em] w-[30em] justify-center mx-auto">
        <hr />
        {cartItems.map((cartItem, index) => {
          return (
            <div className="flex justify-between my-6" key={cartItem.id}>
              <div className="flex space-x-2">
                <img
                  src={cartItem.data().image}
                  alt="shirt"
                  className="w-[140px]"
                />
                <div>
                  <Typography>{cartItem.data().name}</Typography>
                  <Typography className="capitalize">
                    {cartItem.data().condition}
                  </Typography>
                  {cartItem.data().quantity === 0 ? (
                    <Typography>Out of Stock</Typography>
                  ) : (
                    <Typography>In Stock</Typography>
                  )}

                  <div className="flex space-x-2 mt-4">
                    <select
                      label="Qty"
                      className="w-[4em] h-[2em] border border-gray-400 rounded-lg"
                      defaultValue={quantities[index]}
                    >
                      <option className="">1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                    <Typography
                      className="text-red-500 font-medium mt-2 cursor-pointer hover:font-semibold my-auto"
                      onClick={() => alert("hey")}
                    >
                      Remove
                    </Typography>
                  </div>
                </div>
              </div>
              <Typography>${cartItem.data().price}</Typography>
            </div>
          );
        })}
      </div>
      <div className="md:w-[36em] w-[30em] justify-center items-center mx-auto mt-6">
        <div className="flex justify-between mb-6">
          <Typography className="font-semibold">Subtotal</Typography>
          <Typography className="font-semibold">$99.00</Typography>
        </div>

        <Button className="w-full py-4 capitalize text-md">Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
