import React from "react";
import { Box } from "@mui/material";
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const SearchComponent = ({ handleChange }) => {
  return (
    <Box className="flex flex-col gap-4">
      <Input placeholder="Search" onChange={(e) => handleChange(e, "search")} suffix={<SearchOutlined />} />
    </Box>
  );
};

export default SearchComponent;