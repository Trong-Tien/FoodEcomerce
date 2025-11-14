import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";

export default function ModernAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  return (
    <AppBar
      position="fixed"
      elevation={0}
      className="backdrop-blur-lg bg-slate-800/70 border-b border-slate-700 z-50"
    >
      <Toolbar className="flex justify-between px-6">
        
        {/* LEFT: Menu + Logo */}
        <div className="flex items-center gap-3">
          <IconButton
            color="inherit"
           // onClick={onToggleSidebar}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="font-semibold">
            
          </Typography>
        </div>

        {/* MIDDLE: Search bar */}
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-xl min-w-[250px] hover:bg-white/20 transition">
          <SearchIcon className="text-white/70" />
          <InputBase
            placeholder="Search…"
            className="ml-2 text-white placeholder-white/50 w-full"
          />
        </div>

        {/* RIGHT: Notifications + Avatar */}
        <div className="flex items-center gap-3">
          <IconButton color="inherit" className="relative">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar className="w-8 h-8 bg-blue-500 text-white font-semibold">A</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            className="mt-2"
            PaperProps={{ className: "bg-slate-800 text-white" }}
          >
            <MenuItem onClick={handleMenuClose} className="hover:bg-slate-700">
              Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose} className="hover:bg-slate-700">
              Settings
            </MenuItem>
            <MenuItem onClick={handleMenuClose} className="hover:bg-slate-700">
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
