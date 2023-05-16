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
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import RecommendIcon from '@mui/icons-material/Recommend';
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate()
  const deconnexion = () =>{
    localStorage.removeItem("token")
    navigate('/')
    window.location.reload()
  }
  
  let i = localStorage.getItem("token");
  console.log(i);
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
          {localStorage.getItem("token") ? (
            <>
            <Link to="/recommendations">
            <Button color="inherit" sx={{ color: "#66d37e" }} title="Recommendations">
              <RecommendIcon />
            </Button>
            </Link>
            <Link>
              <Button color="inherit" sx={{ color: "#66d37e" }} title="Décoonnexion" onClick={deconnexion}>
                <ExitToAppIcon />
              </Button>
            </Link>
            <Link to="/listes">
            <Button color="inherit" sx={{ color: "#66d37e" }} title="Mes listes">
              <BookmarksIcon />
            </Button>
            </Link>
          </>
          ) : (
            <>
              <Link to="/connexion">
                <Button color="inherit" sx={{ color: "#66d37e" }}  title="Connexion">
                  <LoginIcon />
                </Button>
              </Link>
              <Link to="/inscription">
                <Button color="inherit" sx={{ color: "#66d37e" }} title="Inscription">
                  <AppRegistrationIcon />
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
