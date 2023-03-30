import Navbar from "./components/Navbar.jsx";
import Providers from "./providers/index.jsx";
import Router from "./routes/index.jsx";
import Global from "./styles/Global.jsx";

function App() {
  return (
    <>
      <Global />
      <Providers>
        <Navbar />
        <Router />
      </Providers>
    </>
  );
}

export default App;
