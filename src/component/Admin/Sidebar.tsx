import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Tooltip from "@mui/material/Tooltip"
import Avatar from "@mui/material/Avatar"
import { styled, useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
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
} from "@mui/icons-material"

// Sidebar width when open
const DRAWER_WIDTH = 300

// Styled components
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean
    isMobile?: boolean
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
}))

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}))

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
]

const secondaryNavItems = [
    {
        title: "Settings",
        path: "/admin/settings",
        icon: <SettingsIcon />,
    },
]

interface AdminSidebarProps {
    children: React.ReactNode
}

export const AdminSidebar = ({ children }: AdminSidebarProps) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const [open, setOpen] = React.useState(!isMobile)
    const location = useLocation();
    const pathname = location.pathname

    React.useEffect(() => {
        // Close drawer on mobile when route changes
        if (isMobile) {
            setOpen(false)
        }
    }, [pathname, isMobile])

    React.useEffect(() => {
        // Update open state when screen size changes
        setOpen(!isMobile)
    }, [isMobile])

    const handleDrawerToggle = () => {
        setOpen(!open)
    }

    const drawer = (
        <>
            <DrawerHeader>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%", px: 2 }}>
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
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 2 }}>
                <Avatar sx={{ width: 64, height: 64, mb: 1, bgcolor: "primary.main" }} alt="Admin User">
                    A
                </Avatar>
                <Typography variant="subtitle1" fontWeight="bold">
                    Admin User
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    admin@example.com
                </Typography>
            </Box>

            <Divider />

            {/* Main navigation */}
            <List>
                {navItems.map((item) => {
                    const isActive = pathname === item.path

                    return (
                        <ListItem key={item.path} disablePadding>
                            <Link to={item.path} style={{ width: "100%", textDecoration: "none", color: "inherit" }}>
                                <ListItemButton
                                    sx={{
                                        bgcolor: isActive ? "rgba(0, 0, 0, 0.04)" : "transparent",
                                        borderLeft: isActive ? `4px solid ${theme.palette.primary.main}` : "4px solid transparent",
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
                    )
                })}
            </List>

            <Divider />

            {/* Secondary navigation */}
            <List>
                {secondaryNavItems.map((item) => {
                    const isActive = pathname === item.path

                    return (
                        <ListItem key={item.path} disablePadding>
                            <Link to={item.path} style={{ width: "100%", textDecoration: "none", color: "inherit" }}>
                                <ListItemButton
                                    sx={{
                                        bgcolor: isActive ? "rgba(0, 0, 0, 0.04)" : "transparent",
                                        borderLeft: isActive ? `4px solid ${theme.palette.primary.main}` : "4px solid transparent",
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
                    )
                })}

                {/* Logout button */}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    )

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
                        {navItems.find((item) => item.path === pathname)?.title || "Admin Panel"}
                    </Typography>

                    {/* Notification icon */}
                    <Tooltip title="Notifications">
                        <IconButton color="inherit">
                            <NotificationsIcon />
                        </IconButton>
                    </Tooltip>

                    {/* User avatar for mobile */}
                    <IconButton sx={{ ml: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>A</Avatar>
                    </IconButton>
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
    )
}
