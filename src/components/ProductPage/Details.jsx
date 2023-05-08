import React, { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
} from "@material-tailwind/react";

const Icon = ({ id, open }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
};

const Details = ({ details }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Fragment>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          Description
        </AccordionHeader>
        <AccordionBody className="text-md">{details.desc}</AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>Details</AccordionHeader>
        <AccordionBody className="text-md">
          <Typography>
            <strong>Region: </strong>
            {details.region}
          </Typography>
          <Typography>
            <strong>Release Date: </strong>
            {details.releaseDate}
          </Typography>
          <Typography>
            <strong>Platform: </strong>
            {details.platform}
          </Typography>
        </AccordionBody>
      </Accordion>
    </Fragment>
  );
};

export default Details;
