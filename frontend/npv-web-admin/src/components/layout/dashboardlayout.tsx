import * as React from "react";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  InputBase,
  Paper,
  Toolbar
} from "@mui/material";
import dayjs from "dayjs";
import { BiBell, BiSearch } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import logo from "../../assets/logo-white.png";

import { Sidebar } from "./components/sidebar/sidebar";
import { DRAWER_WIDTH } from "../../config/constants";
import { FaBars, FaCalendarAlt } from "react-icons/fa";

const pageHeader = (
  <Toolbar className="!mb-10 md:!flex !hidden !px-0 !py-5">
    <div className="w-full justify-between items-center hidden md:flex">
      <div>
        <Paper
          component="form"
          className="!w-[300px] lg:!w-[500px]"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            borderRadius: 30,
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          }}>
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions">
            <BiSearch />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
        </Paper>
      </div>
      <div className="flex items-center gap-6 ">
        <p className="text-npv_black text-[14px] font-semibold flex items-center gap-3">
          <IconButton>
            <FaCalendarAlt className="text-[20px]" />
          </IconButton>
          {dayjs(new Date()).format("dddd, DD MMMM")}
        </p>
        <div className="text-npv_black">
          <IconButton>
            <BiBell />
          </IconButton>
        </div>
      </div>
    </div>
  </Toolbar>
);

export const Dashboardlayout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <>
      <div className="flex">
        <CssBaseline />
        <AppBar position="fixed" className="!shadow-none !border-b">
          <Toolbar className="md:!hidden !flex !items-center !justify-between !bg-white !shadow-none">
            <div className="flex gap-1 items-end">
              <img src={logo} alt="Logo" className="w-[25px]" />
              <span className="text-gray-500 text-[12px] font-medium">
                Admin
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IconButton>
                <Avatar className="!w-[32px] !h-[32px]" />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: "none" } }}>
                <FaBars className="text-npv_purple text-[24px]" />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <div className="sidenav">
          <Box
            component="nav"
            sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
            aria-label="Side menu">
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: DRAWER_WIDTH
                }
              }}>
              <Sidebar closeSidebar={handleDrawerClose} />
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: DRAWER_WIDTH
                }
              }}
              open>
              <Sidebar closeSidebar={handleDrawerClose} />
            </Drawer>
          </Box>
        </div>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }
          }}>
          <div className="w-full container mx-auto lg:px-6">
            {pageHeader}
            <Toolbar className="md:!hidden" />
            <Outlet />
          </div>
        </Box>
      </div>
    </>
  );
};
