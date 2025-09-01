import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

const ProfileCard = ({ profile , loading}) => {
  const { name = "Name", short_bio = "Short Bio", profile_image_url = "https://via.placeholder.com/150" } = profile?.profile_details || {};
  return (
    <Box className="flex flex-col gap-4 p-4 rounded-lg bg-[#dee6f8]">
      {loading ? <Box className="flex justify-center items-center h-full"><CircularProgress color="blue"/></Box> : (
       <Box className="flex flex-col gap-2">
        <img src={profile_image_url} alt="profile" className="w-10 h-10 rounded-full" />
        <Typography className="text-blue-500 text-lg font-bold">{name}</Typography>
        <Typography className="text-black text-sm">{short_bio}</Typography>
      </Box>
      )}
    </Box>

  );
};

export default ProfileCard;