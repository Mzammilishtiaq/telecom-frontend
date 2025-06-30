import type React from "react";
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
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  CheckCircle,
  Email,
  Error as ErrorIcon,
  Lock,
  Password,
  Person,
} from "@mui/icons-material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { backendCall } from "../../../service/backendCall";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function SignupPage() {
  const router = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all required fields");
      return;
    }


    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      backendCall({
        url: "/api/user/admin/signup",
        method: "POST",
        data: {
          fullname: formData.firstName,
          email: formData.email,
          password: formData.password,
        },
      }).then((response: any) => {
        console.log("response", response);
      }).catch((error)=>{
        console.log(error)
      })

      setSuccess(true);
    } catch (err) {
      setError("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
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
            <Card elevation={4}>
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: "50%",
                      bgcolor: "success.light",
                      color: "success.main",
                    }}
                  >
                    <CheckCircle fontSize="large" />
                  </Box>
                </Box>
                <Typography
                  variant="h5"
                  component="h1"
                  fontWeight="bold"
                  gutterBottom
                >
                  Account Created Successfully!
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  Thank you for signing up. We've sent a confirmation email to{" "}
                  <strong>{formData.email}</strong>.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => router("/admin_signin")}
                  sx={{ py: 1.5 }}
                >
                  Continue to Login
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    );
  }

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
        <Box sx={{ width: "100%", maxWidth: "500px" }}>
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
                  Create an account
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Sign up to get started with our service
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
                    id="firstName"
                    name="firstName"
                    label="Full Name"
                    placeholder="Full Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={isLoading}
                    fullWidth
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

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

                <Box sx={{ mb: 3 }}>
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
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
                    }}
                    helperText="Must be at least 8 characters"
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onChange={handleCheckboxChange}
                        disabled={isLoading}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          style={{
                            textDecoration: "none",
                            color: "primary.main",
                          }}
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          style={{
                            textDecoration: "none",
                            color: "primary.main",
                          }}
                        >
                          Privacy Policy
                        </Link>
                      </Typography>
                    }
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
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* <Button
                  variant="outlined"
                  fullWidth
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
                > */}
                  {/* Sign up with Google */}
                  <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    if (credentialResponse.credential) {
                      const decodedUser = jwtDecode(credentialResponse.credential);
                      console.log('User Info:', decodedUser);
                    }
                  }}
                  onError={() => {
                    console.error("Google Sign-In failed");
                  }}
                  text="signin_with"/>
                {/* </Button> */}
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
                  Sign up with Facebook
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link
                to="/admin_signin"
                style={{
                  textDecoration: "none",
                  color: "primary.main",
                  fontWeight: 500,
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
