import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  Email,
  Error as ErrorIcon,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { backendCall } from "../../service/backendCall";
import { login } from "../../redux/sliceing/authslice";
import { useDispatch } from "react-redux";
import {handleToastMessage} from '../../component/toasitly'
import { StorageI } from "../../service/interface";

interface LoginResponse {
    user: StorageI;
    token:string;
    message: string;
}

function navigate(url: string) {
  window.location.href = url;
}

async function auth() {
  const response = await fetch('http://telecom-frontend-two.vercel.app/api/auth/google/request', { method: 'post' });
  const data = await response.json();
  console.log(data);
  navigate(data.url);
}

export default function LoginPage() {
  // const location = useLocation();
  // const [searchParams] = useSearchParams();

  // const isAdminRoute = location.pathname.includes("/admin/signin");
  // const roleFromParams = searchParams.get("role");
  // const defaultRole = isAdminRoute ? roleFromParams || "admin" : "client";
  const router = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: 'FREE_USER',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // useEffect(() => {
  //   setFormData((prev) => ({ ...prev, role: defaultRole }));
  // }, [defaultRole]);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }));
  };
const dispatch = useDispatch()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    await backendCall({
      url: "/api/auth/login",
      method: "POST",
      data: {
        email: formData.email,
        password: formData.password,
        role:"FREE_USER"
      },
    }).then((response) => {
      const loginResponse = response as unknown as LoginResponse;
      console.log("response", loginResponse);
      if (loginResponse && loginResponse.user) {
        // if (loginResponse.userdata) {
        //   dispatch(login({ user: loginResponse.userdata, remember: formData.rememberMe }));
        //   router("/admin/dashboard");
        //   handleToastMessage('success', loginResponse.message);
        //   setIsLoading(false);
        // } else {
        // }
          dispatch(login({ 
            user: {
              ...loginResponse.user,
              token: loginResponse.token
            }, 
            remember: formData.rememberMe 
          }));
          router("/");
          handleToastMessage('success', loginResponse.message);
          setIsLoading(false);
      } else {
        setIsLoading(false);
        setError(loginResponse?.message || "Login failed");
        handleToastMessage('error', loginResponse?.message || "Login failed");
      }
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.100",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "400px" }}>
          <Box sx={{ mb: 4 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                startIcon={<ArrowBack />}
                sx={{ color: "text.secondary" }}
                variant="text"
                size="small"
              >
                Back to home
              </Button>
            </Link>
          </Box>

          <Card elevation={4}>
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{
                  textAlign: "center",
                  mb: 4,
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Box
                  style={{ backgroundColor: "#8837EA" }}
                  sx={{
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <LocalPhoneOutlinedIcon className="text-white" />
                </Box>
                <Typography
                  variant="body2"
                  color="#8837EA"
                  sx={{ mt: 1, fontWeight: "600", fontSize: "20px" }}
                >
                  VeriPhone
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h5" component="h1" fontWeight="bold">
                  Welcome back
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Sign in to your account to continue
                </Typography>
              </Box>

              {error && (
                <Alert
                  severity="error"
                  sx={{ mb: 3 }}
                  icon={<ErrorIcon fontSize="inherit" />}
                >
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    fullWidth
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      component="label"
                      htmlFor="password"
                    >
                      Password
                    </Typography>
                    <Link
                      to="/forgot-password"
                      style={{
                        textDecoration: "none",
                        color: "primary.main",
                        fontSize: "0.875rem",
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Box>
                  <TextField
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    fullWidth
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock fontSize="small" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onChange={handleCheckboxChange}
                        disabled={isLoading}
                        size="small"
                      />
                    }
                    label={<Typography variant="body2">Remember me</Typography>}
                  />
                </Box>

                <Button
                  type="submit"
                  disabled={isLoading}
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: "#8837EA" }}
                  size="large"
                  sx={{ py: 1.5 }}
                  startIcon={
                    isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={()=>auth()}
                  startIcon={
                    <svg
                      width="18"
                      height="18"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                    </svg>
                  }
                >
                  {/* <GoogleLogin
                  
                  onSuccess={(credentialResponse) => {
                    if (credentialResponse.credential) {
                      const decodedUser = jwtDecode(credentialResponse.credential);
                      console.log('User Info:', decodedUser);
                    }
                  }}
                  onError={() => {
                    console.error("Google Sign-In failed");
                  }}
                  text="signin_with"/> */}
                  Signin with in Google
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={
                    <svg
                      width="18"
                      height="18"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
                      />
                    </svg>
                  }
                >
                  Sign in with Facebook
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Dont have an account?{" "}
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  color: "primary.main",
                  fontWeight: 500,
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
