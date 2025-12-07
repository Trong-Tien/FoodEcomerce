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
  const response = await fetch("https://localhost:7004/api/Auth/logout", {
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
  const menu: MenuPermission[] = useMemo(() => (Array.isArray(data) ? data : []), [data]);

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
  const isActive = (path: string) => routerState.location.pathname.startsWith(path);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "linear-gradient(to bottom, #1e293b, #111827)",
          backdropFilter: "blur(4px)",
          color: "white",
        },
      }}
    >
      {/* Header */}
      <Toolbar>
        <Typography className="text-white font-bold text-xl">Trang quản trị bán hàng</Typography>
      </Toolbar>
      <Divider className="border-white/20" />

      {/* Menu */}
      <Box
        sx={{
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 3 },
        }}
      >
        <List>
          {menu.map((m) => (
            <ListItem disablePadding key={m.menuId}>
              <ListItemButton
                component={Link}
                to={m.url}
                selected={isActive(m.url)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "rgba(59,130,246,0.3)",
                    color: "#3b82f6",
                  },
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  transition: "0.2s",
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <span className="material-icons">{m.icon}</span>
                </ListItemIcon>
                <ListItemText primary={m.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider className="border-white/20 my-1" />

        {/* Settings & Logout */}
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/settings"
              selected={isActive("/admin/settings")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "rgba(59,130,246,0.3)",
                  color: "#3b82f6",
                },
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                transition: "0.2s",
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Cài đặt" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => mutation.mutate()}
              sx={{
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                transition: "0.2s",
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
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
