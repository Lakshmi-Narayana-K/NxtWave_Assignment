import { Box, Typography, CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobById } from '../../store/modules/jobs';
import { useEffect } from 'react';
import JobDetailCard from '../../components/JobDetailCard';
import SimilarJobCard from '../../components/JobDetailCard/similarJob';

const JobDetailPage = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const { 
  data: { jobDetails, similarJobs } = {}, 
  loading: { jobDetailsLoading } = {} 
} = useSelector((state) => state.jobs || {});

  useEffect(() => {
    dispatch(getJobById({ jobId: id }));
  }, [id]);

  return (
    <Box className='flex flex-col gap-4 overflow-y-auto' style={{ margin: "20px 100px" }}>
      {jobDetailsLoading ? <Box className="flex justify-center items-center h-full"><CircularProgress color="blue" /></Box> : (
        <Box className="flex flex-col gap-4 h-full">
          <JobDetailCard key={id} job={jobDetails} />
          <Box className="flex flex-col gap-4">
            <Typography className="text-white" style={{ fontSize: "15px", fontWeight: "bold" }}>Similar Jobs</Typography>
            <Box className="flex flex-row gap-4 overflow-x-auto w-full " style={{ scrollbarWidth: "none" }}>
            {similarJobs?.map((job) => (
              <SimilarJobCard key={job.id} job={job} />
            ))}
          </Box>
          </Box>
        </Box>
      )}
      </Box>
  )
}

export default JobDetailPage