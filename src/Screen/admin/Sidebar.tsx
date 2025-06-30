import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/sliceing/authslice';
import {GetStorage} from '../../service/authservice'

import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Storage as StorageIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  BarChart as AnalyticsIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { Popover } from "@mui/material";

// Sidebar width when open
const DRAWER_WIDTH = 300;

// Styled components
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
  isMobile?: boolean;
}>(({ theme, open, isMobile }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: isMobile ? 0 : `-${DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// Navigation items
const navItems = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "User Submissions",
    path: "/admin/submissions",
    icon: <PeopleIcon />,
  },
  {
    title: "Database Management",
    path: "/admin/database",
    icon: <StorageIcon />,
  },
  {
    title: "Analytics",
    path: "/admin/analytics",
    icon: <AnalyticsIcon />,
  },
];

const secondaryNavItems = [
  {
    title: "Settings",
    path: "/admin/settings",
    icon: <SettingsIcon />,
  },
];

interface AdminSidebarProps {
  children: React.ReactNode;
}

export const AdminSidebar = ({ children }: AdminSidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(!isMobile);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Add useDispatch hook
  const pathname = location.pathname;
  const [isdropdownopen, setisDropdownOpen] = React.useState(false);
  React.useEffect(() => {
    // Close drawer on mobile when route changes
    if (isMobile) {
      setOpen(false);
    }
  }, [pathname, isMobile]);

  React.useEffect(() => {
    // Update open state when screen size changes
    setOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const getstorage = GetStorage();
 
  const drawer = (
    <>
      <DrawerHeader>
        <Box
          sx={{ display: "flex", alignItems: "center", width: "100%", px: 2 }}
        >
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          {isMobile && (
            <IconButton onClick={handleDrawerToggle}>
              <ChevronLeftIcon />
            </IconButton>
          )}
        </Box>
      </DrawerHeader>
      <Divider />

      {/* User profile section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
        }}
      >
        <Avatar
          sx={{ width: 64, height: 64, mb: 1, bgcolor: "primary.main" }}
          alt="Admin User"
         
        >
           {getstorage?.name.slice(0, 1)||''}
        </Avatar>
      </Box>

      <Divider />

      {/* Main navigation */}
      <List>
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <ListItem key={item.path} disablePadding>
              <Link
                to={item.path}
                style={{
                  width: "100%",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItemButton
                  sx={{
                    bgcolor: isActive ? "rgba(0, 0, 0, 0.04)" : "transparent",
                    borderLeft: isActive
                      ? `4px solid ${theme.palette.primary.main}`
                      : "4px solid transparent",
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "primary.main" : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontWeight: isActive ? "bold" : "regular",
                      color: isActive ? "primary.main" : "inherit",
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Secondary navigation */}
      <List>
        {secondaryNavItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <ListItem key={item.path} disablePadding>
              <Link
                to={item.path}
                style={{
                  width: "100%",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItemButton
                  sx={{
                    bgcolor: isActive ? "rgba(0, 0, 0, 0.04)" : "transparent",
                    borderLeft: isActive
                      ? `4px solid ${theme.palette.primary.main}`
                      : "4px solid transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "primary.main" : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontWeight: isActive ? "bold" : "regular",
                      color: isActive ? "primary.main" : "inherit",
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}

        {/* Logout button */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => { dispatch(logout()); navigate('/signin'); }}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: open ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%" },
          ml: { sm: open ? `${DRAWER_WIDTH}px` : 0 },
          bgcolor: "background.paper",
          color: "text.primary",
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: open ? "none" : "block" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {navItems.find((item) => item.path === pathname)?.title ||
              "Admin Panel"}
          </Typography>

          {/* Notification icon */}
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Tooltip>

          {/* User avatar for mobile */}
          <IconButton sx={{ ml: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}  onClick={() => setisDropdownOpen(true)}>
            {getstorage?.name.slice(0, 1)||''}
            </Avatar>
          </IconButton>
          <Popover
          open={isdropdownopen}
          onClose={() => setisDropdownOpen(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            ".MuiPopover-paper": {
              top: "55px !important",
            },
          }}
        >
          <div className="w-64 ">
            <div className="flex flex-col justify-center items-center my-4">
              <div
                className="flex items-center justify-center  w-full font-semibold text-xs p-2 mt-3 cursor-pointer"
                onClick={() => {
                  setisDropdownOpen(false);
                }}
              >
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
                  alt="Admin User"
                >
                  {getstorage?.name.slice(0, 1)||''}
                </Avatar>

                <div className="flex flex-col w-full ml-3">
                  <p className="text-black-900 font-medium text-sm capitalize">
                    {getstorage?.name ||"name"}
                  </p>
                  <p className="text-black-900 text-opacity-30 font-medium sm:text-[9px] text-[11px]  w-40 break-words">
                    {getstorage?.email||"email null"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full mt-2">
                <p className="text-xs font-medium text-black-900 pl-3 pt-2 cursor-pointer">
                  Profile Settings
                </p>
                <p className="text-xs font-medium text-black-900 pl-3 pt-2 cursor-pointer hover:bg-gray-100 hover:pb-1 ">
                  Payment Method
                </p>
                <p className="text-xs font-medium text-black-900 pl-3 pt-2 cursor-pointer hover:bg-gray-100 hover:pb-1 ">
                  Manage Shorts
                </p>
                <p className="text-xs font-medium text-black-900 pl-3 pt-2 cursor-pointer hover:bg-gray-100 hover:pb-1 ">
                  Settings
                </p>
                {/* <p className="text-xs font-medium text-red-500 pl-3 pt-2 cursor-pointer hover:bg-gray-100 hover:pb-1 ">
                  {" "}
                  Sign Out
                </p> */}
              </div>
            </div>
            <div className="flex justify-around items-center bg-grey-200"></div>
          </div>
        </Popover>
        </Toolbar>
      </AppBar>

      {/* Sidebar drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={open}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main content */}
      <Main open={open} isMobile={isMobile}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};
