import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Badge,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const AppHeader = ({ onToggleSidebar }: { onToggleSidebar?: () => void }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, backgroundColor: "#1e293b" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Menu toggle + Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onToggleSidebar}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
                Trang quản trị bán hàng
          </Typography>
        </Box>

        {/* Middle: Search bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.15)",
            padding: "2px 8px",
            borderRadius: "8px",
            minWidth: "250px",
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder="Search…"
            sx={{ ml: 1, color: "inherit", flex: 1 }}
          />
        </Box>

        {/* Right: Notifications + User menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
