import React from "react";
import { Input as AntdInput } from "antd";
import { Box, Typography } from "@mui/material";

export const InputField = ({ label, placeholder="Enter your Data", value, onChange, type="text" }) => {
  return (
    <Box className="w-full flex flex-col gap-2">
      <Typography className="text-white">{label}</Typography>
      {type === "password" ? <AntdInput.Password placeholder={placeholder} value={value} onChange={onChange} /> : <AntdInput placeholder={placeholder} value={value} onChange={onChange} />}      
    </Box>
  );
};
