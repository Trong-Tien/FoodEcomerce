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

// Icons MUI
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from 'sweetalert2'
import { useGetMenus } from "@/Hooks/Menu";
import type { Menu } from "@/Type/Menu";
const drawerWidth = 240;



const logout = async () => {

  const { data, isError: isLoadingMenuError } = useGetMenus();

  const items: Menu[] = data?.items ?? [];
  // call API Login
  const response = await fetch(`https://localhost:7004/api/Auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return response.json();
}

const AppSidebar = () => {
  const queryClient = useQueryClient();
  const routerState = useRouterState();
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      if (data?.status === 200) {
        goToAdmin()
        localStorage.clear()
      }
      else alert("Đăng nhập thất bại")
      queryClient.invalidateQueries({ queryKey: ["Auth"] });
    },
    onError: (error: any) => {
      console.error("Login thất bại:", error.message);
    },
  });

  const goToAdmin = () => {
    navigate({
      to: '/admin/',
    }).finally(() => {
      Swal.fire("Đăng xuất thành công", "success");
    })
  }


  // check active route
  const isActive = (path: string) => routerState.location.pathname.startsWith(path);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        maxHeight: "100vh",
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1e293b", // Tailwind slate-800
          color: "white",

        },
      }}
    >
      {/* Logo / Header */}
      <Toolbar>
        <Typography variant="h6" noWrap component="div">

        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      {/* Navigation */}
      <Box sx={{ overflow: "auto" }}>
        
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/Dashboard"
              selected={isActive("/admin/Dashboard")}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Bàn làm việc" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/Dashboard/DanhMuc"
              selected={isActive("/admin/Dashboard/DanhMuc")}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Danh Mục" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/Dashboard/Menu/"
              selected={isActive("/admin/Dashboard/Menu/")}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Menu" />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 1 }} />

        {/* Settings & Logout */}
        <List>
          <ListItem disablePadding sx={{ marginTop: "50vh" }}>
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
