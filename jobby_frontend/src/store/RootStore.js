import UserStore from './modules/user/UserStore';
import JobsStore from './modules/jobs/JobsStore';

class RootStore {
  constructor() {
    this.userStore = UserStore;
    this.jobsStore = JobsStore;
  }
}

const rootStore = new RootStore();
export default rootStore;
