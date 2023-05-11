import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { toast } from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const PasswordResetForm = ({ open, handleOpen }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    const q = query(collection(db, "users"), where("email", "==", email));

    await getDocs(q)
      .then((response) => {
        if (response.empty) {
          setError(true);
          return;
        }

        sendPasswordResetEmail(auth, email)
          .then(() => {
            setError(false);
            navigate(0);
          })
          .catch((error) => {
            console.log("Unable to send password reset email:", error);
          });
      })
      .catch((error) => {
        console.log("An error occurred:", error);
        toast.error("No account found with provided email");
      });
  };
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none flex"
    >
      <Card className="mx-auto">
        <form>
          <CardBody className="flex flex-col gap-4">
            <Input
              size="lg"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {error ? (
              <Typography
                variant="small"
                color="gray"
                className="flex items-center gap-1 font-normal text-xs text-red-700"
              >
                Account not found with that email
              </Typography>
            ) : null}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              type="submit"
              fullWidth
              className="capitalize bg-blue-900"
              onClick={handlePasswordReset}
            >
              Reset Password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Dialog>
  );
};

export default PasswordResetForm;
