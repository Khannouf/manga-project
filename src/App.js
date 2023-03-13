import logo from './logo.svg';
import { Box, Container } from '@mui/material';
import './App.css';
import ButtonAppBar from './components/NavBar.tsx';
import Accueil from './components/Accueil.tsx';
import MangaCard from './components/Card.tsx';

function App() {
  return (
    <>
    <ButtonAppBar />
    <Container sx={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      columnGap: "16px",
      rowGap: "16px",
      mt: 2,
      "& > div": {
        maxWidth: "initial",
      }
    }}>
      <MangaCard />
      <MangaCard />
      <MangaCard />
      <MangaCard />
      <MangaCard />
      <MangaCard />
    </Container>
    </>
  );
}

export default App;
