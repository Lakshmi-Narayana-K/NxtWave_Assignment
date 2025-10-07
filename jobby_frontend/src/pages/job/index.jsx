import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import LeftSide from "./LeftSide";
import { observer } from 'mobx-react';
import { useStore } from "../../store/StoreContext";
import RightSide from "./RightSide";

const JobPage = observer(() => {
  const { userStore, jobsStore } = useStore();
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
    jobsStore.getAllJobs(filterOptions);
  }, [filterOptions]);

  useEffect(() => {
    userStore.getProfile();
  }, []);


  return (
    <Box className="flex gap-20 w-full h-full px-20 py-10">
      <LeftSide
        profile={userStore.profile}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        loading={userStore.profileLoading}
        error={userStore.profileError}
      />
      <RightSide handleChange={handleChange} />
    </Box>
  );
});

export default JobPage;
