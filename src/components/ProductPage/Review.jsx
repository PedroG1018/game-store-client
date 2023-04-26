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
    <Card color="transparent" shadow={false} className="w-full mx-auto">
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
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {user.firstName + " " + user.lastName}
            </Typography>
            <div className="5 flex items-center gap-0">
              {Array(parseInt(review.value))
                .fill(0)
                .map((star) => (
                  <StarIcon className="h-5 w-5 text-yellow-700" key={star} />
                ))}
              {Array(parseInt(5 - review.value))
                .fill(0)
                .map((star) => (
                  <StarIcon className="h-5 w-5 text-gray-700" key={star} />
                ))}
            </div>
          </div>
          <Typography color="blue-gray">
            {review.date.toDate().toLocaleDateString()}
          </Typography>
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
