
import { Route, Routes } from "react-router-dom"
import Connexion from "../views/Connexion"
import Inscription from "../views/Inscription"
import Home from "../views/Home"
import MangaDetail from "../views/MangaDetail"
import ListView from "../views/Liste"
import ContentListView from "../views/ContentListe"
import Recommendationview from "../views/Recommendation"

const Router = () => {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/details/:id" element={<MangaDetail />} />
    <Route path="/connexion" element={<Connexion />} />
    <Route path="/inscription" element={<Inscription />} />
    <Route path="/listes" element={<ListView />} />
    <Route path="/listes/:id" element={<ContentListView />} />
    <Route path="/recommendations" element={<Recommendationview />} />

  </Routes>
}

export default Router
