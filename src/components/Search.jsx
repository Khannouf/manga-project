import { Container, CircularProgress, Box, TextField } from "@mui/material";
import MangaCard from "./Card.jsx";
import { useEffect, useState } from "react";
import { searchTitles } from "../utils/requests/title.request.js";

const Search = () => {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    if (!query) return setTitles([])

    setLoading(true)
    searchTitles(query).then(titles => {
      setLoading(false)
      setTitles(titles)
    })
  }, [query])

  return (
    <Box>
      <TextField value={query} onChange={e => setQuery(e.target.value)} />
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          columnGap: "16px",
          rowGap: "16px",
          mt: 2,
          "& > div": {
            maxWidth: "initial",
          },
        }}
      >
        {loading ? <CircularProgress /> : titles.map(title => (
          <MangaCard key={title.id} title={title} />
        ))}
      </Container>
    </Box>
  );
}

export default Search;
