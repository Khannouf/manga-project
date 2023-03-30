
import { Route, Routes } from "react-router-dom"
import Connexion from "../components/Connexion"
import Inscription from "../components/Inscription"
import ButtonAppBar from "../components/NavBar"
import Home from "../views/Home"
import MangaDetail from "../views/MangaDetails"

const Router = () => {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/details/:id" element={<MangaDetail />} />
    <Route path="/connexion" element={<Connexion />} />
    <Route path="/inscription" element={<Inscription />} />
  </Routes>
}

export default Router
