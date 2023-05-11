import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Input, Typography } from "@material-tailwind/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";

const PasswordInput = ({ label, error, id, onChange, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((cur) => !cur);
  };

  return (
    <>
      <Input
        label={label}
        size="lg"
        onChange={onChange}
        type={showPassword ? "text" : "password"}
        required={required || false}
        id={id}
        error={error || false}
        icon={
          showPassword ? (
            <Visibility
              onClick={handleClickShowPassword}
              className="cursor-pointer"
            />
          ) : (
            <VisibilityOff
              onClick={handleClickShowPassword}
              className="cursor-pointer"
            />
          )
        }
      />
      <Typography
        variant="small"
        color="gray"
        className="flex items-center gap-1 font-normal text-xs"
      >
        <InformationCircleIcon className="w-4 h-4 -mt-px" />
        Use at least 8 characters.
      </Typography>
    </>
  );
};

export default PasswordInput;
