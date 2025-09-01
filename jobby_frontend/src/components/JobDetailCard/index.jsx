import React from "react";
import { Box, Typography } from "@mui/material";
import SpecificType from "../JobCard/type";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from "react-router-dom";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LifeAtCompany from "../../assets/lifeAtCompany.png";

const JobDetailCard = ({ job }) => {
  return (
    <Box className="flex flex-col gap-6 bg-[#262724] p-4 rounded-lg w-full ">
      <Box className="flex flex-row gap-4">
         <img src={job?.company_logo_url || "#"} alt="company logo" className="w-10 h-10 object-cover rounded-lg" style={{ objectFit: "cover" }} />
        <Box className="flex flex-col gap-1">
          <Typography className="text-white font-bold">{job.title}</Typography>
          <Typography style={{ fontSize: "15px" }} className="text-white">⭐{job.rating}</Typography>
       </Box>
      </Box>
      <Box className="flex flex-row gap-2 justify-between items-center border-b border-white pb-3">
       <Box className="flex flex-row gap-2">
         <SpecificType icon={<LocationOnIcon style={{ fontSize: '20px', color: "white" }} />} label={job.location} />
        <SpecificType icon={<MailIcon style={{ fontSize: '20px', color: "white" }} />} label={job.employment_type} />
       </Box>
       <Typography className="text-white" style={{ fontSize: "15px" }}>{job.package_per_annum}</Typography>
      </Box>
      <Box className="flex flex-col gap-2">
        <Box className="flex flex-row gap-2 justify-between items-center">
        <Typography className="text-white" style={{ fontSize: "15px", fontWeight: "bold" }}>Description</Typography>
        <Link href={job?.company_website_url || "#"} target="_blank" className="flex flex-row text-white items-center" >
          <Typography className="text-white" style={{ fontSize: "15px", fontWeight: "bold", color: "blue" }}>Visit</Typography>
          <ArrowRightIcon style={{ fontSize: '20px', color: "blue" }} />
        </Link>

        </Box>
        <Typography className="text-white" style={{ fontSize: "15px" }}>{job.job_description}</Typography>
      </Box>
      <Box className="flex flex-col gap-2">
        <Typography className="text-white" style={{ fontSize: "15px", fontWeight: "bold" }}>Skills</Typography>
        <Box className="flex flex-row gap-2 items-center">
          {job?.skills?.map((skill) => (
            <Box className="flex flex-row gap-2 items-center">
            <img src={skill.image_url} alt="skill" className="w-8 h-8 object-cover rounded-lg" style={{ objectFit: "cover" }} />
            <Typography className="text-white" style={{ fontSize: "15px" }}>{skill.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="flex flex-col gap-2">
        <Typography className="text-white" style={{ fontSize: "15px", fontWeight: "bold" }}>Life at Company</Typography>
        <Box className="flex flex-row gap-2 justify-between">
          <Typography className="text-white" style={{ fontSize: "15px" }}>{job?.life_at_company?.description}</Typography>
          <img src={LifeAtCompany} alt="life at company" className="w-1/4 object-cover rounded-lg" style={{ objectFit: "cover" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default JobDetailCard;