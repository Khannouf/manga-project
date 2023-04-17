import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

export default function Navbar() {
  let i = 1;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar color="black">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: "#66d37e" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            color="secondary"
          >
            <Link to="/">MangaProject</Link>
          </Typography>
          {i === 0 ? (
            <Link to="/deconnexion">
              <Button color="inherit" sx={{ color: "#66d37e" }}>
                <ExitToAppIcon />
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/connexion">
                <Button color="inherit" sx={{ color: "#66d37e" }}>
                  <LoginIcon />
                </Button>
              </Link>
              <Link to="/inscription">
                <Button color="inherit" sx={{ color: "#66d37e" }}>
                  Inscription
                </Button>
              </Link>
            </>
          )}
          <Link to="/listes">
            <Button color="inherit" sx={{ color: "#66d37e" }}>
              <BookmarksIcon />
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
