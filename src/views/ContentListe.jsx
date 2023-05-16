import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import ListeCard from "../components/ListeCard";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import MangaCard from "../components/Card";
import DeleteIcon from "@mui/icons-material/Delete";

const token = localStorage.getItem("token");
// const lists = [
//   {
//     id: 1,
//     name: "Favoris",
//   },
//   {
//     id: 2,
//     name: "A acheter",
//   },
//   {
//     id: 3,
//     name: "Acheté",
//   },
//   {
//     id: 4,
//     name: "Drop",
//   },
// ];



function test() {
  alert("test");
}

const ContentListView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [contentLists, setContentLists] = useState([]);

  


  //const [lists, setLists] = useState("");
  const handleFetch = async () => {
    setLoading(true);
    const data = await fetch(`http://localhost:8888/lists/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .catch(() => null);
    if (!data || data.type !== "success")
      return console.log("Une erreur s'est produite.", data);

    setContentLists(data.data);
    setLoading(false);
  };

  async function deleteManga(listId, mangaId) {
    ///lists/:listId/titles/:anilistId
    const data = await fetch(`http://localhost:8888/lists/${listId}/titles/${mangaId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .catch(() => null);
    if (!data || data.type !== "success")
      return console.log("Une erreur s'est produite.", data);

    handleFetch()
  };



  useEffect(() => {
    handleFetch()/*.then((response) =>{
      console.log(response.data.data.titles[0]);
    });
    console.log("------------");
    console.log(contentLists);*/
  }, []);

  //console.log(contentLists.titles);
  //contentLists?.titles.map((list) => console.log(list[0].title));
  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : !contentLists ? (
        <Box>Not found</Box>
      ) : (
        <Container
          sx={{
            display: "grid",
            columnGap: 2,
            rowGap: 2,
            mt: 4,
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          }}
        >
          {contentLists.titles.map((list) => (
            //<h1> {list[0].title} </h1>
            //<MangaCard key={list[0].id} title={list[0]} />
            //<ListeCard key={list[0].id} list={list[0].title} />
            <Card
              sx={{
                maxWidth: 230,
                "& > a": {
                  textDecoration: "none",
                  color: "inherit",
                },
              }}
              key={list[0].id}
            >
              <Link to={`/details/${list[0].id}`}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={list[0].cover}
                    sx={{
                      height: "auto",
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {list[0].id} :{list[0].title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>

              <CardActions>
                <Button
                  color="error"
                  onClick={() => {
                    deleteManga(id, list[0].id);
                  }}
                >
                  <DeleteIcon />
                </Button>
              </CardActions>
            </Card>
          ))}
        </Container>
      )}
    </>
  );
};

export default ContentListView;
