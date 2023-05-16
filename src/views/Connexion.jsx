import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import img from "../img/facebook_cover_photo_2.png"
import { useNavigate } from "react-router-dom";

const Connexion = () => {
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("email"),
      password: data.get("password"),

    });
    const fetchData  = await fetch("http://localhost:8888/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.get("email"),
        password: data.get("password")
      })
    })
    // .then(response => {
    //   console.log(response.body);
    // })
    .then(res => res.json())
    .catch(error => {
      console.log("une erreur s'est produite");
    });
    if (fetchData.type == "success"){
      console.log(fetchData.data);
      localStorage.setItem("token", fetchData.data)
      fetch("http://localhost:8888/auth/me", {
        method: 'GET', // Remplacez GET par la méthode appropriée (GET, POST, PUT, etc.)
        headers: {
          'Authorization': `Bearer ${fetchData.data}`
        }
      })
      .then(response => {
        console.log("reussi");
        navigate('/')
        window.location.relaod()
      })
      .catch(error => {
        console.log("erreu : " + error);
      });
    }else{
      console.log("pas de token");
    }

  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${img})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Connexion
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1, "& input": { height: "auto" } }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Connexion
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/inscription" variant="body2" color="secondary">
                      Pas de compte ? Inscrivez-vous !
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Connexion