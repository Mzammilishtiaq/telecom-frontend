import React from 'react';
import { SetStateAction, useState } from "react"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import Slider from "@mui/material/Slider"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Alert from "@mui/material/Alert"
import {
  Visibility,
  VisibilityOff,
  ContentCopy,
  Refresh,
  Save,
  Language,
  Security,
  Notifications,
  Storage,
  Api,
} from "@mui/icons-material"

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
  [key: string]: unknown;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function SettingsPage() {
  const [tabValue, setTabValue] = useState(0)
  const [showApiKey, setShowApiKey] = useState(false)
  const [savedAlert, setSavedAlert] = useState(false)

  // Form states
  const [accountSettings, setAccountSettings] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Acme Inc.",
    language: "en",
  })

  const [apiSettings, setApiSettings] = useState({
    apiKey: "sk_test_51HZ6qIJHXVbzRRw1nxYBbjZGnh",
    rateLimit: 100,
    timeout: 30,
    webhookUrl: "https://example.com/webhook",
    webhookEnabled: true,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    errorAlerts: true,
    weeklyReports: true,
    monthlyReports: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    ipRestriction: false,
    allowedIps: "",
  })

  const [dataSettings, setDataSettings] = useState({
    retentionPeriod: 90,
    autoBackup: true,
    backupFrequency: "weekly",
    compressionLevel: "medium",
  })

  const handleTabChange = (_event: React.SyntheticEvent, newValue: SetStateAction<number>) => {
    setTabValue(newValue)
  }

  const handleSave = () => {
    setSavedAlert(true)
    setTimeout(() => {
      setSavedAlert(false)
    }, 3000)
  }

  const regenerateApiKey = () => {
    setApiSettings({
      ...apiSettings,
      apiKey: "sk_test_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    })
  }

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Settings</Typography>
        <Button variant="contained" color="primary" startIcon={<Save />} onClick={handleSave}>
          Save Changes
        </Button>
      </Box>

      {savedAlert && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Paper sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="settings tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<Language />} label="Account" />
            <Tab icon={<Api />} label="API" />
            <Tab icon={<Notifications />} label="Notifications" />
            <Tab icon={<Security />} label="Security" />
            <Tab icon={<Storage />} label="Data Management" />
          </Tabs>
        </Box>

        {/* Account Settings */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 4 }}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={accountSettings.name}
                onChange={(e) => setAccountSettings({ ...accountSettings, name: e.target.value })}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={accountSettings.email}
                onChange={(e) => setAccountSettings({ ...accountSettings, email: e.target.value })}
              />
            </Box>

            <TextField
              label="Company"
              variant="outlined"
              fullWidth
              value={accountSettings.company}
              onChange={(e) => setAccountSettings({ ...accountSettings, company: e.target.value })}
              sx={{ mb: 4 }}
            />

            <Typography variant="h6" gutterBottom>
              Preferences
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="language-select-label">Language</InputLabel>
              <Select
                labelId="language-select-label"
                id="language-select"
                value={accountSettings.language}
                label="Language"
                onChange={(e) => setAccountSettings({ ...accountSettings, language: e.target.value })}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                <MenuItem value="de">German</MenuItem>
                <MenuItem value="zh">Chinese</MenuItem>
              </Select>
            </FormControl>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" gutterBottom>
              Password
            </Typography>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
              <TextField label="Current Password" type="password" variant="outlined" fullWidth />
              <TextField label="New Password" type="password" variant="outlined" fullWidth />
              <TextField label="Confirm New Password" type="password" variant="outlined" fullWidth />
            </Box>
          </Box>
        </TabPanel>

        {/* API Settings */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              API Key
            </Typography>
            <Box sx={{ mb: 4 }}>
              <TextField
                label="Your API Key"
                variant="outlined"
                fullWidth
                value={apiSettings.apiKey}
                type={showApiKey ? "text" : "password"}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowApiKey(!showApiKey)} edge="end">
                        {showApiKey ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          navigator.clipboard.writeText(apiSettings.apiKey)
                        }}
                        edge="end"
                      >
                        <ContentCopy />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Refresh />}
                onClick={regenerateApiKey}
                sx={{ mt: 1 }}
              >
                Regenerate API Key
              </Button>
            </Box>

            <Typography variant="h6" gutterBottom>
              Rate Limiting
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Typography gutterBottom>Requests per minute: {apiSettings.rateLimit}</Typography>
              <Slider
                value={apiSettings.rateLimit}
                min={10}
                max={1000}
                step={10}
                onChange={(_e, newValue) => setApiSettings({ ...apiSettings, rateLimit: newValue })}
                valueLabelDisplay="auto"
                aria-labelledby="rate-limit-slider"
              />
            </Box>

            <Typography variant="h6" gutterBottom>
              Request Timeout
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Typography gutterBottom>Timeout in seconds: {apiSettings.timeout}</Typography>
              <Slider
                value={apiSettings.timeout}
                min={5}
                max={120}
                step={5}
                onChange={(_e, newValue) => setApiSettings({ ...apiSettings, timeout: newValue })}
                valueLabelDisplay="auto"
                aria-labelledby="timeout-slider"
              />
            </Box>

            <Typography variant="h6" gutterBottom>
              Webhook Configuration
            </Typography>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Webhook URL"
                variant="outlined"
                fullWidth
                value={apiSettings.webhookUrl}
                onChange={(e) => setApiSettings({ ...apiSettings, webhookUrl: e.target.value })}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={apiSettings.webhookEnabled}
                    onChange={(e) => setApiSettings({ ...apiSettings, webhookEnabled: e.target.checked })}
                  />
                }
                label="Enable Webhook"
              />
            </Box>
          </Box>
        </TabPanel>

        {/* Notification Settings */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Notification Preferences
            </Typography>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })
                    }
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, pushNotifications: e.target.checked })
                    }
                  />
                }
                label="Push Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.errorAlerts}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, errorAlerts: e.target.checked })
                    }
                  />
                }
                label="Error Alerts"
              />
            </Stack>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" gutterBottom>
              Report Scheduling
            </Typography>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.weeklyReports}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, weeklyReports: e.target.checked })
                    }
                  />
                }
                label="Weekly Reports"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.monthlyReports}
                    onChange={(e) =>
                      setNotificationSettings({ ...notificationSettings, monthlyReports: e.target.checked })
                    }
                  />
                }
                label="Monthly Reports"
              />
            </Stack>
          </Box>
        </TabPanel>

        {/* Security Settings */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Two-Factor Authentication
            </Typography>
            <Box sx={{ mb: 4 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
                  />
                }
                label="Enable Two-Factor Authentication"
              />
              {securitySettings.twoFactorAuth && (
                <Box sx={{ mt: 2 }}>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Two-factor authentication adds an extra layer of security to your account.
                  </Alert>
                  <Button variant="outlined" color="primary">
                    Set Up Two-Factor Authentication
                  </Button>
                </Box>
              )}
            </Box>

            <Typography variant="h6" gutterBottom>
              Session Timeout
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Typography gutterBottom>
                Timeout after inactivity (minutes): {securitySettings.sessionTimeout}
              </Typography>
              <Slider
                value={securitySettings.sessionTimeout}
                min={5}
                max={120}
                step={5}
                onChange={(_e, newValue) => setSecuritySettings({ ...securitySettings, sessionTimeout: newValue })}
                valueLabelDisplay="auto"
                aria-labelledby="session-timeout-slider"
              />
            </Box>

            <Typography variant="h6" gutterBottom>
              IP Restrictions
            </Typography>
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={securitySettings.ipRestriction}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, ipRestriction: e.target.checked })}
                  />
                }
                label="Enable IP Restrictions"
              />
              {securitySettings.ipRestriction && (
                <TextField
                  label="Allowed IP Addresses (comma separated)"
                  variant="outlined"
                  fullWidth
                  value={securitySettings.allowedIps}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, allowedIps: e.target.value })}
                  placeholder="192.168.1.1, 10.0.0.1"
                  sx={{ mt: 2 }}
                  helperText="Enter IP addresses that are allowed to access your account"
                />
              )}
            </Box>
          </Box>
        </TabPanel>

        {/* Data Management Settings */}
        <TabPanel value={tabValue} index={4}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Data Retention
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Typography gutterBottom>
                Retain data for {dataSettings.retentionPeriod} days
                {dataSettings.retentionPeriod === 365 && " (1 year)"}
                {dataSettings.retentionPeriod === 730 && " (2 years)"}
              </Typography>
              <Slider
                value={dataSettings.retentionPeriod}
                min={30}
                max={730}
                step={30}
                onChange={(_e, newValue) => setDataSettings({ ...dataSettings, retentionPeriod: newValue })}
                valueLabelDisplay="auto"
                aria-labelledby="retention-period-slider"
                marks={[
                  { value: 30, label: "30d" },
                  { value: 90, label: "90d" },
                  { value: 365, label: "1y" },
                  { value: 730, label: "2y" },
                ]}
              />
            </Box>

            <Typography variant="h6" gutterBottom>
              Automatic Backups
            </Typography>
            <Box sx={{ mb: 4 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={dataSettings.autoBackup}
                    onChange={(e) => setDataSettings({ ...dataSettings, autoBackup: e.target.checked })}
                  />
                }
                label="Enable Automatic Backups"
              />
              {dataSettings.autoBackup && (
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="backup-frequency-label">Backup Frequency</InputLabel>
                  <Select
                    labelId="backup-frequency-label"
                    id="backup-frequency"
                    value={dataSettings.backupFrequency}
                    label="Backup Frequency"
                    onChange={(e) => setDataSettings({ ...dataSettings, backupFrequency: e.target.value })}
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Box>

            <Typography variant="h6" gutterBottom>
              Compression Level
            </Typography>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="compression-level-label">Compression Level</InputLabel>
                <Select
                  labelId="compression-level-label"
                  id="compression-level"
                  value={dataSettings.compressionLevel}
                  label="Compression Level"
                  onChange={(e) => setDataSettings({ ...dataSettings, compressionLevel: e.target.value })}
                >
                  <MenuItem value="none">None (Faster, Larger Files)</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High (Slower, Smaller Files)</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </TabPanel>
      </Paper>
    </div>
  )
}
