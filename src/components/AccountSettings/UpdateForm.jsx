import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import PasswordInput from "../PasswordInput";
import ReactPhoneInput from "react-phone-input-material-ui";
import { AuthContext } from "../../context/AuthContext";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";

const UpdateForm = () => {
  const [data, setData] = useState({
    currentPassword: "",
    password: "",
    phoneNumber: "",
  });

  const [error, setError] = useState({
    currentPassword: false,
    password: false,
    phoneNumber: false,
  });

  const { currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });

    const timer = setTimeout(() => {
      if (value.length < 8 && value.length !== 0) {
        setError({ ...error, [id]: true });
      } else {
        setError({ ...error, [id]: false });
      }
    }, 1000);

    return () => clearTimeout(timer);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (data.currentPassword.length >= 8 && data.password.length >= 8) {
      signInWithEmailAndPassword(auth, currentUser.email, data.currentPassword)
        .then(() => {
          updatePassword(auth.currentUser, data.password)
            .then(() => {
              toast.success("Password successfully updated.");
            })
            .catch((error) => {
              console.log("Unable to update password:", error);
              toast.error("Unable to update Password.");
            });
        })
        .catch((error) => {
          console.log("Current password mismatch:", error);
          toast.error("Current password does not match.");
        });
    } else {
      toast.error("Password fields must be at least 8 characters long.");
    }
  };

  return (
    <form className="space-y-4 mx-auto max-w-md mt-4" onSubmit={handleUpdate}>
      <PasswordInput
        label="Current Password"
        error={error.currentPassword}
        id="currentPassword"
        onChange={handleChange}
      />
      <PasswordInput
        label="New Password"
        error={error.password}
        id="password"
        onChange={handleChange}
      />
      <ReactPhoneInput
        static
        label="Phone: 1 (702) 123-4567"
        placeholder=""
        defaultCountry="us"
        component={Input}
        onChange={(phone) => setData({ ...data, phoneNumber: phone })}
      />
      <Button
        className="capitalize bg-blue-900 flex mx-auto w-full justify-center"
        type="submit"
      >
        Update Details
      </Button>
    </form>
  );
};

export default UpdateForm;
