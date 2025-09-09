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
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from 'sweetalert2'
import { useGetMenus } from "@/Hooks/Menu";
import type { Menu } from "@/Type/Menu";
import { useEffect, useState } from "react";
const drawerWidth = 240;



const logout = async () => {
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
  const [menu, setmenu] = useState<Menu[]>()
  const queryClient = useQueryClient();
  const routerState = useRouterState();
  const navigate = useNavigate()

  const { data: dataMenu } = useGetMenus(1, 20)

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

  useEffect(() => {
    if (dataMenu)
      setmenu(dataMenu?.items)
    else setmenu([])
  }, [dataMenu])

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        maxHeight: "100%",
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
          {menu?.map(menu => (
            <ListItem disablePadding key={menu.id}>
              <ListItemButton
                component={Link}
                to={menu?.url}
                selected={isActive(menu?.url)}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <span className="material-icons">{menu?.icon}</span>
                </ListItemIcon>
                <ListItemText primary={menu?.name} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
          </ListItem>
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 1 }} />

        {/* Settings & Logout */}
        <List>
          <ListItem disablePadding >
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
