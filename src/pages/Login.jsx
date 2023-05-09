import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import PasswordInput from "../components/PasswordInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
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
  };

  return (
    <Card className="mx-auto w-full max-w-md my-6">
      <form className="p-10 flex flex-col gap-4" onSubmit={handleLogin}>
        <Typography variant="h3" className="text-center text-blue-900">
          SIGN IN
        </Typography>
        <Input
          type="email"
          label="Email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          error={false}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            className="bg-blue-700 text-white py-3 px-8 hover:bg-red-600 font-bold rounded focus:outline-none focus:shadow-outline capitalize"
          >
            Sign in
          </Button>
          <a
            href="/"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Forgot password?
          </a>
        </div>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign Up
          </a>
        </Typography>
      </form>
    </Card>
  );
};

export default Login;
