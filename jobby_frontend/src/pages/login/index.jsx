import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Button as CustomButton } from "../../components/Button";
import { InputField as CustomInputField } from "../../components/InputField";
import JobbyLogo from "../../assets/jobby-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/modules/user";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading: { loginLoading }, error: { loginError }, data: { jwt_token } } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (loginError?.error_msg) {
      setMessage(loginError.error_msg);
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [loginError]);

  useEffect(() => {
    if (jwt_token) {
      localStorage.setItem("jwt_token", jwt_token);
      setMessage("Login successful!");
      navigate("/");
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [jwt_token, navigate]);

  const handleLogin = () => {
    if (!loginData.username.trim() || !loginData.password.trim()) {
      setMessage("Please fill all the fields");
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
    setMessage("");
    dispatch(loginUser(loginData));
  };

  return (
    <Box className="flex flex-col items-center justify-center h-screen">
      <Box className="flex flex-col items-center space-y-6 justify-between bg-gray-800 rounded-lg px-20 pt-10 pb-20 w-1/3">
        <Box className="flex flex-col gap-6 w-full h-full">
          <Box className="flex items-center justify-center gap-2 h-auto">
            <img src={JobbyLogo} alt="Jobby Logo" style={{ width: "80px", height: "80px" }} />
            <Typography className="text-[#00969b] text-2xl font-serif">Jobby</Typography>
          </Box>

          <Box className="flex flex-col gap-10 w-full">
            <Box className="flex flex-col gap-4 w-full">
              <CustomInputField
                label="Username"
                placeholder="Enter your username"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              />
              <CustomInputField
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </Box>

            <Box className="flex flex-col gap-2 w-full">
              <CustomButton label={loginLoading ? "Logging in..." : "Login"} onClick={handleLogin} disabled={loginLoading} className="w-full"/>
              {message && <Typography className="text-red-500 text-sm">{message}</Typography>}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
