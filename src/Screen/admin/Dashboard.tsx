import React from "react"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { PeopleOutline, BarChart, AttachMoney, TrendingUp } from "@mui/icons-material"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemIcon from "@mui/material/ListItemIcon"
import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import Chip from "@mui/material/Chip"
import LinearProgress from "@mui/material/LinearProgress"
import { CheckCircle, Settings, ListAlt, Report, VpnKey, ErrorOutline } from "@mui/icons-material"
import Button from "@mui/material/Button"

export default function DashboardPage() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Stats cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 3,
          }}
        >
          <Card>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <PeopleOutline sx={{ fontSize: 40, color: "primary.main" }} />
                <Box>
                  <Typography variant="h5" component="div">
                    1,245
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Total Users
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <BarChart sx={{ fontSize: 40, color: "success.main" }} />
                <Box>
                  <Typography variant="h5" component="div">
                    42.5k
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Total Submissions
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <AttachMoney sx={{ fontSize: 40, color: "warning.main" }} />
                <Box>
                  <Typography variant="h5" component="div">
                    $12,350
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Revenue
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <TrendingUp sx={{ fontSize: 40, color: "info.main" }} />
                <Box>
                  <Typography variant="h5" component="div">
                    +24%
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Growth
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Main content area */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "8fr 4fr" }, gap: 3 }}>
          {/* Recent Activity */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6">Recent Activity</Typography>
              <Button size="small" color="primary">
                View All
              </Button>
            </Box>

            <List sx={{ width: "100%" }}>
              {[
                {
                  user: "John Doe",
                  action: "added a new phone validation",
                  time: "2 minutes ago",
                  status: "success",
                  icon: <CheckCircle />,
                  number: "+1 (555) 123-4567",
                },
                {
                  user: "Sarah Johnson",
                  action: "updated API settings",
                  time: "45 minutes ago",
                  status: "info",
                  icon: <Settings />,
                },
                {
                  user: "Mike Wilson",
                  action: "bulk validated 250 numbers",
                  time: "2 hours ago",
                  status: "success",
                  icon: <ListAlt />,
                },
                {
                  user: "Emily Davis",
                  action: "reported an invalid number",
                  time: "5 hours ago",
                  status: "warning",
                  icon: <Report />,
                  number: "+44 20 1234 5678",
                },
                {
                  user: "Robert Smith",
                  action: "changed password",
                  time: "1 day ago",
                  status: "info",
                  icon: <VpnKey />,
                },
              ].map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start" sx={{ py: 1.5 }}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor:
                            item.status === "success"
                              ? "success.light"
                              : item.status === "warning"
                                ? "warning.light"
                                : "info.light",
                        }}
                      >
                        {item.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" component="span">
                          {item.user} {item.action}
                          {item.number && (
                            <Typography
                              component="span"
                              sx={{
                                display: "inline-block",
                                ml: 1,
                                bgcolor: "background.default",
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                fontSize: "0.875rem",
                              }}
                            >
                              {item.number}
                            </Typography>
                          )}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.secondary">
                          {item.time}
                        </Typography>
                      }
                    />
                    <Chip
                      label={item.status === "success" ? "Success" : item.status === "warning" ? "Warning" : "Info"}
                      size="small"
                      color={item.status === "success" ? "success" : item.status === "warning" ? "warning" : "info"}
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                  </ListItem>
                  {index < 4 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* Additional Stats */}
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              System Status
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">API Uptime</Typography>
                <Typography variant="body2" fontWeight="bold">
                  99.99%
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={99.99} color="success" sx={{ height: 8, borderRadius: 4 }} />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">Database Load</Typography>
                <Typography variant="body2" fontWeight="bold">
                  42%
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={42} color="info" sx={{ height: 8, borderRadius: 4 }} />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">Memory Usage</Typography>
                <Typography variant="body2" fontWeight="bold">
                  68%
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={68} color="warning" sx={{ height: 8, borderRadius: 4 }} />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              Recent Alerts
            </Typography>

            <List dense>
              <ListItem>
                <ListItemIcon>
                  <ErrorOutline fontSize="small" color="warning" />
                </ListItemIcon>
                <ListItemText primary="High API usage detected" secondary="Today, 10:23 AM" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ErrorOutline fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText primary="Database backup failed" secondary="Yesterday, 11:45 PM" />
              </ListItem>
            </List>
          </Paper>
        </Box>
      </Box>
    </div>
  )
}
