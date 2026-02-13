import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink, Outlet } from "react-router-dom";

const drawerWidth = 240;

function siteBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const links = [
    { link: "Teacher", path: "/admin/teacher" },
    { link: "Student", path: "/admin/student" },
    { link: "Manager", path: "/admin/manager" },
    { link: "Room", path: "/admin/room" },
    { link: "Group", path: "/admin/group" },
  ];

  const drawer = (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "#0f172a",
        color: "#fff",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        ADMIN PANEL
      </Toolbar>

      <Divider sx={{ borderColor: "#1e293b" }} />

      <List sx={{ mt: 1 }}>
        {links.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ px: 1 }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 600) handleDrawerClose();
              }}
              sx={{
                borderRadius: "10px",
                mb: 0.5,
                color: "#cbd5f5",

                "&:hover": {
                  backgroundColor: "#1e293b",
                  color: "#fff",
                },

                "&.active": {
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(37,99,235,0.5)",
                },
              }}
            >
              <ListItemText
                primary={item.link}
                primaryTypographyProps={{
                  fontSize: "16px",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#020617",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            grupa bilan nom oylarmiz
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="persistent"
          open={true}
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#020617",
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

siteBar.propTypes = {
  window: PropTypes.func,
};

export default siteBar;
