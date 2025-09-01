import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import SearchComponent from "../../../components/Search";
import { useSelector } from "react-redux";
import JobCard from "../../../components/JobCard";
import NoJobsFound from "../../../assets/no-results.png";

const RightSide = ({ handleChange }) => {
  const { data: { jobs }, loading: { allJobsLoading } } = useSelector((state) => state.jobs);
  
  return (
    <Box className="w-2/3 flex flex-col gap-4 h-[calc(100vh-150px)]">
      <SearchComponent handleChange={handleChange} />
     { allJobsLoading ? <Box className="flex justify-center items-center h-full"><CircularProgress color="blue" /></Box> : (
      <Box className="flex flex-col gap-4 h-[calc(100vh-150px)] ">
        {jobs?.jobs?.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      {jobs?.jobs?.length === 0 && <Box className="flex justify-center items-center h-full flex-col gap-4">
        <img src={NoJobsFound} alt="No jobs found" className="w-1/2" />
        <Typography className="text-white" style={{ fontSize: "20px" }}>No jobs found</Typography></Box>}
      </Box>
     )}
    </Box>
  );
};

export default RightSide;