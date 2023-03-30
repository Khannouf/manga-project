import ButtonAppBar from "./components/NavBar.jsx";
import Providers from "./providers/index.jsx";
import Router from "./routes/index.jsx";
import Global from "./styles/Global.jsx";

function App() {
  return (
    <>
      <Global />
      <Providers>
        <ButtonAppBar />
        <Router />
      </Providers>
    </>
  );
}

export default App;
