import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Card className="flex-row w-full mb-8 rounded-none">
      <CardHeader
        shadow={false}
        floated={false}
        className="w-2/5 shrink-0 m-0 rounded-none"
      >
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/gridoffset-videogames-1-1585583517.jpg?crop=0.888888888888889xw:1xh;center,top"
          alt="games"
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardBody className="bg-gradient-to-r from-white to-gray-200">
        <Typography variant="h4" className="uppercase mb-4 text-blue-900">
          1-Up Store
        </Typography>
        <Typography variant="h1" color="blue-gray" className="mb-2">
          Level up your retro game shopping!
        </Typography>
        <Typography variant="h5" color="gray" className="font-normal mb-8">
          Relive your childhood and explore our vast catalogue of old school
          video games, consoles, and accessories. Buy used or refurbished; our
          products are 100% authentic and guaranteed to work at a great price!
        </Typography>
        <a href="#" className="inline-block">
          <Button
            variant="text"
            className="flex items-center gap-2 text-blue-900 text-lg"
            onClick={() => navigate("/products")}
          >
            Start Shopping
            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
          </Button>
        </a>
      </CardBody>
    </Card>
  );
};

export default Hero;
