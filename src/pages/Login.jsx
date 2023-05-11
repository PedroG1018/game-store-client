import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import PasswordInput from "../components/PasswordInput";
import PasswordResetForm from "../components/Login/PasswordResetForm";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        toast.success("Signed in.");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/invalid-email") {
          toast.error("Invalid email.");
        }
        if (errorCode === "auth/wrong-password") {
          toast.error("Incorrect password.");
        }
        console.log(errorCode + ": " + errorMessage);
      });
  };

  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  return (
    <>
      <Card className="mx-auto w-full max-w-md" shadow={false}>
        <form className="p-10 flex flex-col gap-4" onSubmit={handleLogin}>
          <Typography variant="h3" className="text-center text-black">
            Sign In
          </Typography>
          <Input
            type="email"
            label="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <PasswordInput
            label="Password"
            error={false}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              className="bg-blue-900 text-white py-3 px-8 font-semibold rounded capitalize"
            >
              Sign in
            </Button>
            <a
              href="#"
              className="inline-block align-baseline font-medium text-sm text-blue-700 hover:text-blue-900"
              onClick={handleOpen}
            >
              Forgot password?
            </a>
          </div>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-blue-700 transition-colors hover:text-blue-900"
            >
              Sign Up
            </a>
          </Typography>
        </form>
      </Card>
      <PasswordResetForm open={open} handleOpen={handleOpen} />
    </>
  );
};

export default Login;
