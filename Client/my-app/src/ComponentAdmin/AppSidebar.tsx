import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useGetMenusByPermission } from "@/Hooks/Menu";
import type { MenuPermission } from "@/Type/MenuPermission";
import { useMemo } from "react";

const drawerWidth = 240;

// API logout
const logout = async () => {
<<<<<<< HEAD
  const response = await fetch("http://localhost:5292/api/Auth/logout", {
=======
  const response = await fetch(`http://localhost:5292/api/Auth/logout`, {
>>>>>>> 15de3b67f25597396e005d5e96777554070b92a4
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Logout failed");
  }
  return response.json();
};

const AppSidebar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const routerState = useRouterState();

  // Lấy roleId từ localStorage
  const dataRole: string | null = localStorage.getItem("role");
  const roleId = dataRole ? JSON.parse(dataRole) : null;

  // API menus theo quyền
  const { data } = useGetMenusByPermission(roleId);

  const menu: MenuPermission[] = useMemo(
    () => (Array.isArray(data) ? data : []),
    [data]
  );

  // Mutation logout
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: (res) => {
      if (res?.status === 200) {
        localStorage.clear();
        queryClient.invalidateQueries({ queryKey: ["Auth"] });
        navigate({ to: "/admin/" }).finally(() => {
          Swal.fire("Đăng xuất thành công", "", "success");
        });
      } else {
        Swal.fire("Đăng xuất thất bại", "", "error");
      }
    },
    onError: (error: any) => {
      Swal.fire("Lỗi khi đăng xuất", error.message, "error");
    },
  });

  // Check active route
  const isActive = (path: string) =>
    routerState.location.pathname.startsWith(path);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        maxHeight: "100%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1e293b", // Tailwind slate-800
          color: "white",
        },
      }}
    >
      {/* Header */}
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {/* Logo hoặc tên app */}
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      {/* Navigation */}
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menu.map((m) => (
            <ListItem disablePadding key={m.menuId}>
              <ListItemButton
                component={Link}
                to={m.url}
                selected={isActive(m.url)}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <span className="material-icons">{m.icon}</span>
                </ListItemIcon>
                <ListItemText primary={m.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 1 }} />

        {/* Settings & Logout */}
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/settings"
              selected={isActive("/admin/settings")}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Cài đặt" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => mutation.mutate()}>
              <ListItemIcon sx={{ color: "white" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Đăng xuất" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default AppSidebar;
