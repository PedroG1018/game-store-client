import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="w-full h-96 cursor-pointer hover:opacity-90 bg-gray-200 rounded-none"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <CardHeader
        shadow={false}
        floated={false}
        className="h-96 bg-transparent"
      >
        <img
          src={product.data().image}
          alt={product.data().name}
          className="object-cover items-center mx-auto h-full"
        />
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between mb-2">
          <Typography color="blue-gray" className="font-semibold">
            {product.data().name}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            ${product.data().price.toFixed(2)}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {product.data().desc.slice(0, 100)}...
        </Typography>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
