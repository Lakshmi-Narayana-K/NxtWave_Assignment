import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SpecificType from "../JobCard/type";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';

const SimilarJobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <Box className="flex flex-col gap-6 bg-[#262724] p-4 rounded-lg w-1/2 cursor-pointer" onClick={() => navigate(`/job/${job.id}`)}>
      <Box className="flex flex-row gap-4">
         <img src={job.company_logo_url} alt="company logo" className="w-10 h-10 object-cover rounded-lg" style={{ objectFit: "cover" }} />
        <Box className="flex flex-col gap-1">
          <Typography className="text-white font-bold">{job.title}</Typography>
          <Typography style={{ fontSize: "12px" }} className="text-white">⭐{job.rating}</Typography>
       </Box>
      </Box>
      <Box className="flex flex-col gap-2">
        <Typography className="text-white" style={{ fontSize: "12px" }}>Description</Typography>
        <Typography className="text-white" style={{ fontSize: "12px" }}>{job.job_description}</Typography>
      </Box>
       <Box className="flex flex-row gap-2 justify-between items-center pb-3">
       <Box className="flex flex-row gap-2">
         <SpecificType icon={<LocationOnIcon style={{ fontSize: '20px', color: "white" }} />} label={job.location} />
        <SpecificType icon={<MailIcon style={{ fontSize: '20px', color: "white" }} />} label={job.employment_type} />
       </Box>
       <Typography className="text-white" style={{ fontSize: "15px" }}>{job.package_per_annum}</Typography>
      </Box>
    </Box>
  );
};

export default SimilarJobCard;