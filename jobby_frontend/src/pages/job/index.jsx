import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import LeftSide from "./LeftSide";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../store/modules/user";
import RightSide from "./RightSide";
import { getAllJobs } from "../../store/modules/jobs";

const JobPage = () => {
  const dispatch = useDispatch();
  const { data: { profile } , loading: {profileLoading}, error: {profileError}} = useSelector((state) => state.user);
  const [filterOptions, setFilterOptions] = useState({
    search: "",
    jobType: [],
    salaryRange: "",
  });

  const searchTimerRef = useRef(null);

  const handleChange = (e, name) => {
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    const value = e.target.value;
    searchTimerRef.current = setTimeout(() => {
      setFilterOptions((prev) => ({ ...prev, [name]: value }));
    }, 1000);
  };

  useEffect(() => {
    dispatch(getAllJobs(filterOptions));
  }, [filterOptions]);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    console.log("filterOptions", filterOptions);
  }, [filterOptions]);

  return (
    <Box className="flex gap-20 w-full h-full px-20 py-10">
      <LeftSide
        profile={profile}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        loading={profileLoading}
        error={profileError}
      />
      <RightSide handleChange={handleChange} />
    </Box>
  );
};

export default JobPage;
