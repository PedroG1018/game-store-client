import { Button, Card, Typography } from "@material-tailwind/react";
import React from "react";

const Address = ({ address, city, state, country, zipCode }) => {
  return (
    <Card
      shadow={false}
      className="border p-4 rounded-none border-gray-600 text-black w-full"
    >
      <Typography>{address}</Typography>
      <Typography>
        {city}, {state + " " + zipCode}
      </Typography>
      <Typography className="mb-4">{country}</Typography>
      <div className="flex space-x-2 mt-auto">
        <Button className="capitalize bg-blue-900 rounded-none">Edit</Button>
        <Button className="capitalize bg-red-700 rounded-none">Delete</Button>
      </div>
    </Card>
  );
};

export default Address;
