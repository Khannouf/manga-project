
import { Route, Routes } from "react-router-dom"
import Connexion from "../views/Connexion"
import Inscription from "../views/Inscription"
import Home from "../views/Home"
import MangaDetail from "../views/MangaDetail"

const Router = () => {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/details/:id" element={<MangaDetail />} />
    <Route path="/connexion" element={<Connexion />} />
    <Route path="/inscription" element={<Inscription />} />
  </Routes>
}

export default Router
