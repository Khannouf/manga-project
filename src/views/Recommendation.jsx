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

const Recommendationview = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  


  //const [lists, setLists] = useState("");
  const handleFetch = async () => {
    setLoading(true);
    const data = await fetch(`http://localhost:8888/recommendations`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .catch(() => null);
    if (!data || data.type !== "success")
      return console.log("Une erreur s'est produite.", data);

    console.log(data.data);
    setRecommendations(data.data);
    setLoading(false);
  };


  console.log(recommendations[0]?.title);

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
    <Typography variant="h1" component="div"> Suggestions </Typography>
    {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : !recommendations ? (
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
        {recommendations.map((reco) => (
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
        >
          <Link to={`/details/${reco.id}`}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={reco.cover}
                sx={{
                  height: "auto",
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {reco.id} :{reco.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
      ))}
    </Container>
  )}

    </>
  );
};

export default Recommendationview;
