import { makeObservable, observable, action, runInAction } from 'mobx';
import axios from 'axios';
import * as api from '../../api';

class UserStore {
  constructor() {
    makeObservable(this, {
      jwt_token: observable,
      profile: observable,
      loginLoading: observable,
      profileLoading: observable,
      loginError: observable,
      profileError: observable,
      
      loginUser: action.bound,
      getProfile: action.bound,
      logout: action.bound,
    });
  }

  jwt_token = '';
  profile = {};
  loginLoading = false;
  profileLoading = false;
  loginError = null;
  profileError = null;

  async loginUser(credentials) {
    this.loginLoading = true;
    this.loginError = null;

    try {
      const response = await axios.post(api.loginUrl, credentials);
      
      runInAction(() => {
        this.jwt_token = response.data.jwt_token;
        this.loginLoading = false;
        this.loginError = null;
      });

      return response.data;
    } catch (error) {
      runInAction(() => {
        this.loginError = error.response?.data || { error_msg: "Login failed" };
        this.loginLoading = false;
      });
      throw error;
    }
  }

  async getProfile() {
    this.profileLoading = true;
    this.profileError = null;

    const jwt_token = localStorage.getItem("jwt_token");
    
    try {
      const response = await axios.get(api.profileUrl, {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      });

      runInAction(() => {
        this.profile = response.data;
        this.profileLoading = false;
        this.profileError = null;
      });

      return response.data;
    } catch (error) {
      runInAction(() => {
        this.profileError = error.response?.data || { error_msg: "Profile fetch failed" };
        this.profileLoading = false;
      });
      throw error;
    }
  }

  logout() {
    this.jwt_token = '';
    this.profile = {};
    this.loginError = null;
    this.profileError = null;
    localStorage.removeItem("jwt_token");
  }

}

const userStore = new UserStore();
export default userStore;
