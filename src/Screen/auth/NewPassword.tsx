import type React from "react";
import { useState, useEffect } from "react";
import { Link,useSearchParams } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
  LinearProgress,
  Paper,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ArrowBack,
  CheckCircle,
  Error as ErrorIcon,
  Lock,
  Visibility,
  VisibilityOff,
  Check,
  Close,
  Security,
} from "@mui/icons-material";
import { backendCall } from "../../service/backendCall";
interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
  met: boolean;
}

export default function NewPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
const [searchParams] = useSearchParams();
const token = searchParams.get('token');

  const [requirements, setRequirements] = useState<PasswordRequirement[]>([
    {
      label: "At least 8 characters long",
      test: (pwd) => pwd.length >= 8,
      met: false,
    },
    {
      label: "Contains uppercase letter",
      test: (pwd) => /[A-Z]/.test(pwd),
      met: false,
    },
    {
      label: "Contains lowercase letter",
      test: (pwd) => /[a-z]/.test(pwd),
      met: false,
    },
    { label: "Contains a number", test: (pwd) => /\d/.test(pwd), met: false },
    {
      label: "Contains special character",
      test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      met: false,
    },
  ]);

  useEffect(() => {
    // Update password requirements
    const updatedRequirements = requirements.map((req) => ({
      ...req,
      met: req.test(password),
    }));
    setRequirements(updatedRequirements);

    // Calculate password strength
    const metCount = updatedRequirements.filter((req) => req.met).length;
    setPasswordStrength((metCount / requirements.length) * 100);
  }, [password]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return "error";
    if (passwordStrength < 80) return "warning";
    return "success";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 40) return "Weak";
    if (passwordStrength < 80) return "Medium";
    return "Strong";
  };

  const isFormValid = () => {
    return (
      password &&
      confirmPassword &&
      password === confirmPassword &&
      requirements.every((req) => req.met)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isFormValid()) {
      setError("Please fill in all fields and ensure all requirements are met");
      return;
    }

    

    setIsLoading(true);
    try {
      const response = await backendCall({
        url: "/api/auth/password-reset/confirm",
        method: "POST",
        data: {
          token: token,
          newPassword: password
        },
      });
      console.log("response new password", response);
      setSuccess(true);
    } catch (err: Error | unknown) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Invalid credentials. Please try again.");
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
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Card elevation={4} sx={{ maxWidth: 400, width: "100%" }}>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <Box
              sx={{
                p: 1,
                borderRadius: "50%",
                bgcolor: "success.light",
                color: "success.main",
                display: "inline-flex",
                mb: 2,
              }}
            >
              <CheckCircle fontSize="large" />
            </Box>
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              Password Changed Successfully
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Your password has been successfully updated. Your account is now
              more secure.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Redirecting to dashboard in a few seconds...
            </Typography>
            <Button
              variant="contained"
              fullWidth
              component={Link}
              to="/admin/dashboard"
              sx={{ py: 1.5 }}
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
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
            <Link to="/admin/settings" style={{ textDecoration: "none" }}>
              <Button
                startIcon={<ArrowBack />}
                sx={{ color: "text.secondary" }}
                variant="text"
                size="small"
              >
                Back to settings
              </Button>
            </Link>
          </Box>

          <Card elevation={4}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: "50%",
                    bgcolor: "primary.light",
                    color: "primary.main",
                    display: "inline-flex",
                    mb: 2,
                  }}
                >
                  <Security fontSize="large" />
                </Box>
                <Typography variant="h5" component="h1" fontWeight="bold">
                  Change Your Password
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Enter your current password and create a new secure password
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
                    id="password"
                    type={showPassword ? "text" : "password"}
                    label="New Password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {password && (
                    <Box sx={{ mt: 2 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          Password strength:
                        </Typography>
                        <Typography
                          variant="body2"
                          color={`${getPasswordStrengthColor()}.main`}
                          fontWeight="medium"
                        >
                          {getPasswordStrengthText()}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={passwordStrength}
                        color={getPasswordStrengthColor()}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  )}
                </Box>

                <Box sx={{ mb: 3 }}>
                  <TextField
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirm Password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    fullWidth
                    required
                    error={
                      confirmPassword !== "" && password !== confirmPassword
                    }
                    helperText={
                      confirmPassword !== "" && password !== confirmPassword
                        ? "Passwords do not match"
                        : ""
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock fontSize="small" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                            size="small"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {password && (
                  <Paper
                    variant="outlined"
                    sx={{ p: 2, mb: 3, bgcolor: "grey.50" }}
                  >
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Password Requirements:
                    </Typography>
                    <List dense sx={{ py: 0 }}>
                      {requirements.map((requirement, index) => (
                        <ListItem key={index} sx={{ py: 0.25, px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            {requirement.met ? (
                              <Check fontSize="small" color="success" />
                            ) : (
                              <Close fontSize="small" color="error" />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={requirement.label}
                            primaryTypographyProps={{
                              variant: "body2",
                              color: requirement.met
                                ? "success.main"
                                : "text.secondary",
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                )}

                <Button
                  type="submit"
                  disabled={isLoading || !isFormValid()}
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ py: 1.5 }}
                  startIcon={
                    isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                >
                  {isLoading ? "Updating Password..." : "Update Password"}
                </Button>
              </form>
            </CardContent>

            <Box
              sx={{
                p: 2,
                bgcolor: "grey.50",
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Make sure to choose a password that you havent used before and
                is unique to this account.
              </Typography>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
