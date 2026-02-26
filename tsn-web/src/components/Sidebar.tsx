import { Drawer, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 220, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        <ListItemButton component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/tools">
          <ListItemText primary="Tools" />
        </ListItemButton>
        <ListItemButton component={Link} to="/settings">
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;