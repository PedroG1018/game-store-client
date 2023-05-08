import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Rating } from "@mui/material";

const Review = ({ review }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", review.userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser(docSnap.data());
        setIsLoading(false);
      } else {
        console.log("No such user");
      }
    };

    setIsLoading(true);
    fetchUser();
  }, [review]);

  if (isLoading) {
    return null;
  }

  return (
    <Card color="transparent" shadow={false} className="w-[48em] mt-4">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-6"
      >
        <Avatar
          size="lg"
          variant="circular"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
          alt="candice wu"
        />
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {user.firstName + " " + user.lastName}
            </Typography>
            <div className="flex items-center gap-0 ml-6">
              <Rating name="rating" value={review.value} disabled />
            </div>
          </div>
          <Typography color="blue-gray">{review.date}</Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0 text-black">
        <Typography variant="h5">{review.title}</Typography>
        <Typography>&quot;{review.review}&quot;</Typography>
      </CardBody>
    </Card>
  );
};

export default Review;
