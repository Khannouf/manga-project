import {
  Container,
  CircularProgress,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import MangaCard from "./Card.jsx";
import { useEffect, useState } from "react";
import { searchTitles } from "../utils/requests/title.request.js";
import { SearchInput } from "./Input.jsx";
import { height } from "@mui/system";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    if (!query) return setTitles([]);

    setLoading(true);
    searchTitles(query).then((titles) => {
      setLoading(false);
      setTitles(titles);
    });
  }, [query]);

  return (
    <Box sx={{
      display:"flex",
      flexDirection: "column",
      alignItems:"center",
      justifyContent:"center",
      minHeight: "100vh",
      marginTop: 3,
    }}>
          
        <SearchInput value={query} onChange={e => setQuery(e.target.value)} />
        {loading && (
          <Box sx={{
            display: "flex",
            justifyContent: "center",
          }}>
            <CircularProgress color="secondary" sx={{
              mt : 2,
              width: "150px !important",
              height: "150px !important"
            }}/>
          </Box>
        )}
        <Container
        sx={{
          // display: "grid",
          // gridTemplateColumns: "repeat(4, 1fr)",
          // columnGap: "16px",
          // rowGap: "16px",
          // mt: 2,
          display: "grid",
        columnGap: 2,
        rowGap: 2,
        mt: 4,
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          "& > div": {
            maxWidth: "initial",
          },
        }}
      >
        {loading ? (
          <></>
        ) : (
          titles.map((title) => <MangaCard key={title.id} title={title} />)
        )}
      </Container>
    </Box>
  );
};

export default Search;
