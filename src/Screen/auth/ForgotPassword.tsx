import React from 'react';
import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  Email,
  Error as ErrorIcon,
} from "@mui/icons-material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { backendCall } from "../../service/backendCall";

export default function ForgotPassword() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isAdminRoute = location.pathname.includes("/admin/signin");
  const roleFromParams = searchParams.get("role");
  const defaultRole = isAdminRoute ? roleFromParams || "admin" : "client";
  const router = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    // role: defaultRole,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    setFormData((prev) => ({ ...prev, role: defaultRole }));
  }, [defaultRole]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await backendCall({
        url: "/api/auth/password-reset/request",
        method: "POST",
        data: {
          email: formData.email,
          // role: formData.role,
        },
      });

      console.log("response", response);
      // dispatch(setResetToken(response.resetToken));
      if(!response){
      router(`/signin`)
      }
      // if (response.user.role === "admin") {
      //   dispatch(login({ user: response.user, remember: formData.rememberMe }));
      //   router("/admin/dashboard");
      // } else {
      //   dispatch(login({ user: response.user, remember: formData.rememberMe }));
      //   router("/");
      // }
      // Display success message to the user
      alert(response.message); // Using alert for simplicity, can be replaced with a more sophisticated UI notification
      // Optionally, redirect the user to a confirmation page or login page
      // router('/forgot-password-confirmation');
    } catch (err: Error | unknown) {
      console.error("Request password reset error:", err);
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
                  Forgot Your Password?
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Enter your email address and well send you instructions to
                  reset your password
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
                  {isLoading ? "Sending Reset ..." : "Send Reset Link"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
