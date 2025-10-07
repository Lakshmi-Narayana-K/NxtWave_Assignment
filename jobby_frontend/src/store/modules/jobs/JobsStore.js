import { makeObservable, observable, action, runInAction } from 'mobx';
import axios from 'axios';
import * as api from '../../api';

class JobsStore {
  constructor() {
    makeObservable(this, {
      jobs: observable,
      jobDetails: observable,
      similarJobs: observable,
      allJobsLoading: observable,
      jobDetailsLoading: observable,
      allJobsError: observable,
      jobDetailsError: observable,
      total: observable,
      pageNumber: observable,
      itemsPerPage: observable,
      
      getAllJobs: action.bound,
      getJobById: action.bound,
    });
  }

  jobs = [];
  jobDetails = {};
  similarJobs = [];
  allJobsLoading = false;
  jobDetailsLoading = false;
  allJobsError = null;
  jobDetailsError = null;
  total = 0;
  pageNumber = 1;
  itemsPerPage = 10;

  async getAllJobs(filters = {}) {
    this.allJobsLoading = true;
    this.allJobsError = null;

    try {
      const { search = "", jobType = [], salaryRange = "" } = filters;
      const response = await axios.get(
        `${api.allJobsUrl}?search=${search}&employment_type=${jobType}&minimum_package=${salaryRange}`
      );

      runInAction(() => {
        this.jobs = response.data.jobs || [];
        this.total = response.data.total || 0;
        this.pageNumber = response.data.page_number || 1;
        this.itemsPerPage = response.data.items_per_page || 10;
        this.allJobsLoading = false;
        this.allJobsError = null;
      });

      return response.data;
    } catch (error) {
      runInAction(() => {
        this.allJobsError = error.response?.data || { error_msg: "Failed to fetch jobs" };
        this.allJobsLoading = false;
      });
      throw error;
    }
  }

  async getJobById(jobId) {
    this.jobDetailsLoading = true;
    this.jobDetailsError = null;

    try {
      const response = await axios.get(`${api.jobDetailsUrl}/${jobId}`);

      runInAction(() => {
        this.jobDetails = response.data.job_details || {};
        this.similarJobs = response.data.similar_jobs || [];
        this.jobDetailsLoading = false;
        this.jobDetailsError = null;
      });

      return response.data;
    } catch (error) {
      runInAction(() => {
        this.jobDetailsError = error.response?.data || { error_msg: "Failed to fetch job details" };
        this.jobDetailsLoading = false;
      });
      throw error;
    }
  }

}

const jobsStore = new JobsStore();
export default jobsStore;
