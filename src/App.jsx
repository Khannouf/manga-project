import Navbar from "./components/Navbar.jsx";
import Providers from "./providers/index.jsx";
import Router from "./routes/index.jsx";
import Global from "./styles/Global.jsx";
import myTheme from "./theme.js";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
function App() {
  return (
    <>
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        <Global />
        <Providers>
          <Navbar />
          <Router />
        </Providers>
      </ThemeProvider>
    </>
  );
}

export default App;
