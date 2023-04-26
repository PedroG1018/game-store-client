import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Review = ({ review }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", review.userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser(docSnap.data());
        console.log(user);
        setIsLoading(false);
      } else {
        console.log("No such user");
      }
    };

    setIsLoading(true);
    fetchUser();
  }, [review.userId]);

  if (isLoading) {
    return null;
  }

  return (
    <Card
      color="transparent"
      shadow={false}
      className="w-full max-w-[26rem] mx-auto"
    >
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        <Avatar
          size="lg"
          variant="circular"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          alt="candice wu"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {user.firstName + " " + user.lastName}
            </Typography>
            <div className="5 flex items-center gap-0">
              <StarIcon className="h-5 w-5 text-yellow-700" />
              <StarIcon className="h-5 w-5 text-yellow-700" />
              <StarIcon className="h-5 w-5 text-yellow-700" />
              <StarIcon className="h-5 w-5 text-yellow-700" />
              <StarIcon className="h-5 w-5 text-yellow-700" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <Typography>&quot;{review.review}&quot;</Typography>
      </CardBody>
    </Card>
  );
};

export default Review;
