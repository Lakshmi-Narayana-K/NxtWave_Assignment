import React from "react";
import { Box } from "@mui/material";

export const Button = ({ label = "Login", bgColor="#00969b" , onClick, disabled = false, className = ""}) => {
  return (
    <Box className={`bg-purple-500 text-white rounded-md w-24 p-2 flex items-center justify-center cursor-pointer ${className}`} style={{ backgroundColor: bgColor }} disabled={disabled} onClick={onClick}> 
      {label}
    </Box>
  );
};