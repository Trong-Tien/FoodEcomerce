import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import AppHeader from "@/ComponentAdmin/AppHeader"
import AppSidebar from "@/ComponentAdmin/AppSidebar";
import { Outlet } from "@tanstack/react-router";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppHeader />
      <AppSidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, mt: 8}}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
