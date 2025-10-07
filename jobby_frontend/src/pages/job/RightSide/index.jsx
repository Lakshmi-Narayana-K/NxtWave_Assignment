import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import SearchComponent from "../../../components/Search";
import { observer } from 'mobx-react';
import { useStore } from "../../../store/StoreContext";
import JobCard from "../../../components/JobCard";
import NoJobsFound from "../../../assets/no-results.png";
import { Button } from "@mui/material";

const RightSide = observer(({ handleChange }) => {
  const { jobsStore } = useStore();
  
  const handleReload = () => {
    jobsStore.getAllJobs({});
  }

  return (
    <Box className="w-2/3 flex flex-col gap-4 h-[calc(100vh-150px)]">
      <SearchComponent handleChange={handleChange} />
     { jobsStore.allJobsLoading ? <Box className="flex justify-center items-center h-full"><CircularProgress color="white" /></Box> : (
      <Box className="flex flex-col gap-4 h-[calc(100vh-150px)] ">
        {jobsStore.jobs?.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      {jobsStore.jobs?.length === 0 && <Box className="flex justify-center items-center h-full flex-col gap-4">
        <img src={NoJobsFound} alt="No jobs found" className="w-1/2" />
        <Typography className="text-white" style={{ fontSize: "20px" }}>No jobs found</Typography></Box>}
      </Box>
     )}
     {jobsStore.allJobsError && <Box className="flex flex-col gap-4 justify-center text-center items-center h-full"><Typography className="text-white" style={{ fontSize: "20px" }}>
      <Typography className="text-white" style={{ fontSize: "15px" }}>Error fetching jobs. Please try again.</Typography>
      <Button variant="contained" color="primary" onClick={handleReload}>Retry</Button>
      </Typography></Box>}
    </Box>
  );
});

export default RightSide;