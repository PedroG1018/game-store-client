import React, { useState } from "react";
import {
  CardBody,
  Card,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        phoneNumber: data.phoneNumber,
        zipCode: data.zipCode,
        timeStamp: serverTimestamp(),
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-lg my-6" onSubmit={handleSubmit}>
      <form className="p-10 flex flex-col gap-4">
        <Typography variant="h3" className="text-center text-blue-700">
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
        <Input
          label="Password"
          size="lg"
          onChange={handleChange}
          type="password"
          required
          id="password"
        />
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
          label="Postal Code"
          type="number"
          size="lg"
          onChange={handleChange}
          required
          id="zipCode"
        />
        <Button variant="gradient" fullWidth className="mt-2" type="submit">
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
