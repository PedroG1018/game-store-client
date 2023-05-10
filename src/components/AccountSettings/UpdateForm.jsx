import { Card, Input, Typography } from "@material-tailwind/react";
import React from "react";
import PasswordInput from "../PasswordInput";
import PhoneInput from "../PhoneInput";

const UpdateForm = () => {
  return (
    <Card shadow={false} className="mx-auto max-w-md mt-4">
      <form className="space-y-4">
        <PasswordInput label="Current Password" />
        <PasswordInput label="New Password" />
        <Input label="Phone Number" size="lg" type="tel" />
        {/* <PhoneInput /> */}
      </form>
    </Card>
  );
};

export default UpdateForm;
