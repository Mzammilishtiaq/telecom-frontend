"use client"

import { SetStateAction, useState } from "react"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, ShowChart, PieChart as PieChartIcon, Public, Download } from "@mui/icons-material"

// Mock data for charts
const dailyData = [
  { date: "Jan 1", validations: 4000, successful: 3800 },
  { date: "Jan 2", validations: 3000, successful: 2850 },
  { date: "Jan 3", validations: 2000, successful: 1900 },
  { date: "Jan 4", validations: 2780, successful: 2600 },
  { date: "Jan 5", validations: 1890, successful: 1800 },
  { date: "Jan 6", validations: 2390, successful: 2300 },
  { date: "Jan 7", validations: 3490, successful: 3300 },
]

const validationResults = [
  { name: "Valid", value: 85 },
  { name: "Invalid Format", value: 7 },
  { name: "Non-existent", value: 5 },
  { name: "Carrier Error", value: 2 },
  { name: "Other", value: 1 },
]

const countryData = [
  { name: "USA", value: 45 },
  { name: "UK", value: 15 },
  { name: "Canada", value: 10 },
  { name: "Australia", value: 8 },
  { name: "Germany", value: 7 },
  { name: "France", value: 5 },
  { name: "Other", value: 10 },
]

const phoneTypeData = [
  { name: "Mobile", value: 65 },
  { name: "Landline", value: 20 },
  { name: "VoIP", value: 10 },
  { name: "Other", value: 5 },
]

const monthlyData = [
  { month: "Jan", validations: 65000 },
  { month: "Feb", validations: 75000 },
  { month: "Mar", validations: 85000 },
  { month: "Apr", validations: 95000 },
  { month: "May", validations: 120000 },
  { month: "Jun", validations: 135000 },
  { month: "Jul", validations: 150000 },
  { month: "Aug", validations: 165000 },
  { month: "Sep", validations: 185000 },
  { month: "Oct", validations: 200000 },
  { month: "Nov", validations: 220000 },
  { month: "Dec", validations: 250000 },
]

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [tabValue, setTabValue] = useState(0)

  const handleTimeRangeChange = (event: { target: { value: SetStateAction<string> } }) => {
    setTimeRange(event.target.value)
  }

  const handleTabChange = (_event: any, newValue: SetStateAction<number>) => {
    setTabValue(newValue)
  }

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Analytics</Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="time-range-label">Time Range</InputLabel>
            <Select
              labelId="time-range-label"
              id="time-range"
              value={timeRange}
              onChange={handleTimeRangeChange}
              label="Time Range"
            >
              <MenuItem value="24h">Last 24 hours</MenuItem>
              <MenuItem value="7d">Last 7 days</MenuItem>
              <MenuItem value="30d">Last 30 days</MenuItem>
              <MenuItem value="90d">Last 90 days</MenuItem>
              <MenuItem value="1y">Last year</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" startIcon={<Download />}>
            Export
          </Button>
        </Box>
      </Box>

      {/* Overview Stats */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          gap: 3,
          mb: 4,
        }}
      >
        {/* Card 1 */}
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  bgcolor: "primary.light",
                  borderRadius: "50%",
                  p: 1,
                  mr: 2,
                  display: "flex",
                }}
              >
                <TrendingUp color="primary" />
              </Box>
              <Typography variant="h6" component="div">
                Total Validations
              </Typography>
            </Box>
            <Typography variant="h4" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
              1,248,392
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
              <TrendingUp fontSize="small" color="success" sx={{ mr: 0.5 }} />
              12.5% increase from last period
            </Typography>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  bgcolor: "success.light",
                  borderRadius: "50%",
                  p: 1,
                  mr: 2,
                  display: "flex",
                }}
              >
                <ShowChart color="success" />
              </Box>
              <Typography variant="h6" component="div">
                Success Rate
              </Typography>
            </Box>
            <Typography variant="h4" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
              94.7%
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
              <TrendingUp fontSize="small" color="success" sx={{ mr: 0.5 }} />
              2.3% increase from last period
            </Typography>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  bgcolor: "warning.light",
                  borderRadius: "50%",
                  p: 1,
                  mr: 2,
                  display: "flex",
                }}
              >
                <PieChartIcon color="warning" />
              </Box>
              <Typography variant="h6" component="div">
                Avg. Response Time
              </Typography>
            </Box>
            <Typography variant="h4" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
              87ms
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
              <TrendingUp fontSize="small" color="success" sx={{ mr: 0.5 }} />
              5.1% faster than last period
            </Typography>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  bgcolor: "info.light",
                  borderRadius: "50%",
                  p: 1,
                  mr: 2,
                  display: "flex",
                }}
              >
                <Public color="info" />
              </Box>
              <Typography variant="h6" component="div">
                Countries Covered
              </Typography>
            </Box>
            <Typography variant="h4" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
              240+
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Global coverage across all continents
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Tabs for different analytics views */}
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="analytics tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Overview" />
          <Tab label="Validation Results" />
          <Tab label="Geographic Distribution" />
          <Tab label="Phone Types" />
          <Tab label="Trends" />
        </Tabs>
      </Box>

      {/* Tab content */}
      {tabValue === 0 && (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
          <Box sx={{ flex: { xs: "1 1 100%", md: "2 1 0%" } }}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Validation Trends
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Daily validation counts over time
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="validations" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="successful" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Box>
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 0%" } }}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Validation Results
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Breakdown of validation outcomes
              </Typography>
              <Box sx={{ height: 350, display: "flex", justifyContent: "center" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={validationResults}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {validationResults.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Box>
        </Box>
      )}

      {tabValue === 1 && (
        <Box>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Validation Results Breakdown
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Detailed analysis of validation outcomes
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={validationResults} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8">
                    {validationResults.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>
      )}

      {tabValue === 2 && (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Top Countries
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Distribution of validations by country
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={countryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {countryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Regional Distribution
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Validation distribution by region
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={countryData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8">
                      {countryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Box>
        </Box>
      )}

      {tabValue === 3 && (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Phone Types
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Distribution of phone number types
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={phoneTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {phoneTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Carrier Distribution
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Top carriers by validation volume
              </Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Verizon", value: 25 },
                      { name: "AT&T", value: 20 },
                      { name: "T-Mobile", value: 18 },
                      { name: "Vodafone", value: 15 },
                      { name: "Orange", value: 12 },
                      { name: "Other", value: 10 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8">
                      {phoneTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Box>
        </Box>
      )}

      {tabValue === 4 && (
        <Box>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Validation Trends
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Validation volume over the past year
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="validations" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>
      )}
    </div>
  )
}