import React, { useState, useContext } from "react";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

import toast from "react-hot-toast";
import PasswordInput from "../components/PasswordInput";

const Signup = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    console.log(value);

    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password.length < 8) {
      setError(true);
      toast.error("Password should be at least 6 characters");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        phoneNumber: data.phoneNumber,
        zipCode: data.zipCode,
        createdAt: new Date(),
      })
        .then(async () => {
          await addDoc(collection(db, "cart"), {
            userId: res.user.uid,
          })
            .then(() => {
              toast.success("Account created successfully");

              try {
                signInWithEmailAndPassword(auth, data.email, data.password)
                  .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    dispatch({ type: "LOGIN", payload: user });
                    navigate("/");
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode + ": " + errorMessage);
                  });
              } catch (error) {
                console.log(error);
              }
            })
            .catch((error) => {
              console.log("Unable to create cart:", error);
            });
        })
        .catch((error) => {
          console.log("Unable to create account:", error);
        });
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
        return;
      }
    }
  };

  return (
    <Card className="mx-auto w-full max-w-lg my-6">
      <form className="p-10 flex flex-col gap-4" onSubmit={handleSubmit}>
        <Typography variant="h3" className="text-center text-blue-900">
          CREATE ACCOUNT
        </Typography>
        <Input
          label="Email"
          size="lg"
          onChange={handleChange}
          type="email"
          required
          id="email"
        />
        <PasswordInput error={error} onChange={handleChange} />
        <Input
          label="First Name"
          size="lg"
          onChange={handleChange}
          required
          id="firstName"
        />
        <Input
          label="Last Name"
          size="lg"
          onChange={handleChange}
          required
          id="lastName"
        />
        <Input
          label="Address"
          size="lg"
          onChange={handleChange}
          required
          id="address"
        />
        <Input
          label="City"
          size="lg"
          onChange={handleChange}
          required
          id="city"
        />
        <Input
          label="State/Province"
          size="lg"
          onChange={handleChange}
          required
          id="state"
        />
        <Input
          label="Country"
          size="lg"
          onChange={handleChange}
          required
          id="country"
        />
        <Input
          label="Phone Number"
          size="lg"
          onChange={handleChange}
          required
          id="phoneNumber"
        />
        <Input
          label="Zip/Postal Code"
          type="text"
          size="lg"
          onChange={handleChange}
          required
          id="zipCode"
        />
        <Button fullWidth className="mt-2 capitalize bg-blue-900" type="submit">
          Sign Up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
};

export default Signup;
