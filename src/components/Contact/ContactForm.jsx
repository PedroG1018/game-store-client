import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import React from "react";

const ContactForm = () => {
  return (
    <div className="mt-4 w-96 mx-auto space-y-4">
      <Input size="lg" label="Full Name" />
      <Input size="lg" label="Email" />
      <Select label="What can we help you with?">
        <Option value="order">Problem with my order</Option>
        <Option value="item">Item did not arrive as described</Option>
        <Option value="other">Other (please specify)</Option>
      </Select>
      <Textarea label="Details" />
      <Button className="bg-blue-900 capitalize w-full" size="lg">
        Submit
      </Button>
    </div>
  );
};

export default ContactForm;
