import React, { useContext, useEffect, useState, useMemo } from "react";
import { Button, Typography } from "@material-tailwind/react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Header from "../components/Header";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  // calculates the subtotal using the product prices and quantities in the user's cart
  const subTotal = useMemo(() => {
    let total = 0;

    for (let i = 0; i < products.length; i++) {
      total += products[i].data().price * quantities[i];
    }

    return total;
  }, [quantities]);

  useEffect(() => {
    // fetches the user's cart
    const fetchCart = async () => {
      const cartQuery = query(
        collection(db, "cart"),
        where("userId", "==", currentUser.uid)
      );

      await getDocs(cartQuery)
        .then(async (response) => {
          const cartId = response.docs[0].id;

          const cartItemsQuery = query(
            collection(db, "cartItems"),
            where("cartId", "==", cartId)
          );

          // fetches the cart items
          await getDocs(cartItemsQuery)
            .then(async (response) => {
              const items = response.docs;
              let products = [];
              let qty = [];

              // fetches the products linked to each cart item
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

              setCartItems(items);
              setProducts(products);
              setQuantities(qty);
            })
            .catch((error) => {
              console.log("Unable to fetch cart items:", error);
            });
        })
        .catch((error) => {
          console.log("Unable to fetch cart:", error);
        });

      setOpen(false);
    };

    setOpen(true);
    fetchCart();
  }, []);

  // removes an item from the user's cart
  // delete document from collection
  const handleRemove = async (id) => {
    const docRef = doc(db, "cartItems", id);
    await deleteDoc(docRef)
      .then((response) => {
        console.log("Item removed from cart:", response);
        navigate(0);
      })
      .catch((error) => {
        console.log("Unable to remove item from cart:", error);
      });
  };

  return (
    <>
      <Header title="My Cart" />
      <div className="flex flex-col mx-auto max-w-screen-lg w-full justify-center my-10">
        <Spinner open={open} />

        <div className="md:w-[36em] w-[30em] justify-center mx-auto">
          <hr />
          {products.map((product, index) => {
            return (
              <div className="flex justify-between my-6" key={product.id}>
                <div className="flex space-x-2">
                  <img
                    src={product.data().image}
                    alt="shirt"
                    className="w-[140px]"
                  />
                  <div>
                    <Typography className="font-medium">
                      {product.data().name}
                    </Typography>
                    <Typography className="capitalize">
                      {product.data().condition}
                    </Typography>
                    {product.data().quantity === 0 ? (
                      <Typography color="red">Out of Stock</Typography>
                    ) : (
                      <Typography color="green">In Stock</Typography>
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
                        onClick={() => handleRemove(cartItems[index].id)}
                      >
                        Remove
                      </Typography>
                    </div>
                  </div>
                </div>
                <Typography className="font-medium">
                  ${product.data().price}
                </Typography>
              </div>
            );
          })}
        </div>
        <div className="md:w-[36em] w-[30em] justify-center items-center mx-auto mt-6">
          <div className="flex justify-between mb-6">
            <Typography className="font-semibold">Subtotal</Typography>
            <Typography className="font-semibold">${subTotal}</Typography>
          </div>

          <Button
            className="w-full capitalize text-md rounded-none bg-blue-900"
            size="lg"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
