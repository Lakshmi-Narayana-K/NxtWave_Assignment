import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ProfileCard from "./profile";
import FilterSection from "../../../components/Filter";
import { observer } from 'mobx-react';
import { useStore } from "../../../store/StoreContext";

const LeftSide = observer(({ profile, filterOptions, setFilterOptions, loading, error }) => {
  const { userStore } = useStore();
  
  const handleReload = () => {
    userStore.getProfile();
  }
  return (
      <Box className="w-1/3 flex flex-col gap-4">
        {error && <Box className="flex flex-col gap-4 justify-center text-center items-center h-full"><Typography className="text-white" style={{ fontSize: "20px" }}>
          <Typography className="text-white" style={{ fontSize: "15px" }}>Error fetching profile. Please try again.</Typography>
          <Button variant="contained" color="primary" onClick={handleReload}>Retry</Button>
          </Typography></Box>}
        <ProfileCard profile={profile} loading={loading}/>
        <Box sx={{background : "white", height : "1px", width : "100%"}} />
        <FilterSection title="jobType" type="checkbox" filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
        <Box sx={{background : "white", height : "1px", width : "100%"}} />
        <FilterSection title="salaryRange" type="radio" filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
      </Box>
  );
});

export default LeftSide;  