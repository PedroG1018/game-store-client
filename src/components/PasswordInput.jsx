import { Input } from "@material-tailwind/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";

const PasswordInput = ({ label, error, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((cur) => !cur);
  };

  return (
    <Input
      label={label}
      size="lg"
      onChange={onChange}
      type={showPassword ? "text" : "password"}
      required
      id="password"
      error={error}
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
  );
};

export default PasswordInput;
