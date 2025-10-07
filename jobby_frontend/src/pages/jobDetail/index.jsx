import { Box, Typography, CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../store/StoreContext';
import { useEffect } from 'react';
import JobDetailCard from '../../components/JobDetailCard';
import SimilarJobCard from '../../components/JobDetailCard/similarJob';

const JobDetailPage = observer(() => {
  const { id } = useParams();
  const { jobsStore } = useStore();

  useEffect(() => {
    jobsStore.getJobById(id);
  }, [id]);

  return (
    <Box className='flex flex-col gap-4 overflow-y-auto' style={{ margin: "20px 100px" }}>
      {jobsStore.jobDetailsLoading ? <Box className="flex justify-center items-center h-full"><CircularProgress color="blue" /></Box> : (
        <Box className="flex flex-col gap-4 h-full">
          <JobDetailCard key={id} job={jobsStore.jobDetails} />
          <Box className="flex flex-col gap-4">
            <Typography className="text-white" style={{ fontSize: "15px", fontWeight: "bold" }}>Similar Jobs</Typography>
            <Box className="flex flex-row gap-4 overflow-x-auto w-full " style={{ scrollbarWidth: "none" }}>
            {jobsStore.similarJobs?.map((job) => (
              <SimilarJobCard key={job.id} job={job} />
            ))}
          </Box>
          </Box>
        </Box>
      )}
      </Box>
  )
});

export default JobDetailPage;