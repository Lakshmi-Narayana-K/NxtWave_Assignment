import React from "react";
import { Box } from "@mui/material";
import ProfileCard from "./profile";
import FilterSection from "../../../components/Filter";

const LeftSide = ({ profile, filterOptions, setFilterOptions, loading }) => {
  return (
      <Box className="w-1/3 flex flex-col gap-4">
        <ProfileCard profile={profile} loading={loading}/>
        <Box sx={{background : "white", height : "1px", width : "100%"}} />
        <FilterSection title="jobType" type="checkbox" filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
        <Box sx={{background : "white", height : "1px", width : "100%"}} />
        <FilterSection title="salaryRange" type="radio" filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
      </Box>
  );
};

export default LeftSide;  