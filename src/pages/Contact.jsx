import { Input, Typography } from "@material-tailwind/react";
import React from "react";
import Header from "../components/Header";
import ContactForm from "../components/Contact/ContactForm";

const Contact = () => {
  return (
    <div className="justify-center flex flex-col">
      <Header title="Contact Us" />
      <ContactForm />
    </div>
  );
};

export default Contact;
