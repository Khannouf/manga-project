import {
  Container,
  Box,
  CircularProgress,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
  Rating,
  Chip,
  ListItem,
  Grid,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { color, height, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mangaDetail } from "../utils/requests/title.request";
import img from "../img/linkedin_banner_image_1.png";

const MangaDetail = () => {
  const theme = useTheme();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [characters, setCharacters] = useState({});

  useEffect(() => {
    setLoading(true);
    mangaDetail(id).then((response) => {
      setLoading(false);
      if (!response || response.length === 0) return;
      setDetail(response[0]);
      setCharacters(response[0].characters);
    });
  }, [id]);
  //console.log(JSON.stringify(detail.characters));
  // characters.map((character, index) => (
  //   console.log(character.node.name)
  //   ))

  //console.log(characters);
  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : !detail ? (
        <Box>Not found</Box>
      ) : (
        <Box 
        color={"white"}
          sx={
            {
              backgroundColor:"#4b4c4d"
            }
          }
        >
          {/* BOX BannerImage */}
          {detail.bannerImage ? (
            <Box
              sx={{
                // width: "",
                height: "50vh",
                background: `linear-gradient(180deg,rgba(6, 13, 34, 0) 40%, rgba(6, 13, 34, 0.5)), url(${detail.bannerImage}) center center`,
                backgroundSize: "cover",
              }}
            ></Box>
          ) : (
            <Box
              sx={{
                // width: "",
                height: "50vh",
                background: `linear-gradient(180deg,rgba(6, 13, 34, 0) 40%, rgba(6, 13, 34, 0.5)), url(${img}) center center`,
                backgroundSize: "cover",
              }}
            ></Box>
          )}
          {/* BOX avec Cover image et titre  */}
          <Box
            sx={{
              display: "flex",
              columnGap: 4,
              margin: "0 auto",
              width: "90%",
              maxWidth: 1200,
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
              },
            }}
          >
            {/* BOX avec Cover image et titre */}
            <Box
              sx={{
                marginTop: -20,
                maxWidth: 225,
                "& img": {
                  height: 320,
                  width: "auto",
                  boxShadow: "0 0 29px rgba(49,54,68,.25)",
                  borderRadius: 2,
                },
              }}
            >
              <img src={detail.coverImage.large} alt="cover" />
              <Box
                sx={{
                  display: "flex",
                  columnGap: 1,
                  alignItems: "center",
                }}
              >
                <Rating
                  defaultValue={detail.averageScore / 20}
                  precision={0.1}
                  readOnly
                />
                <Typography variant="h6" fontWeight={700}>
                  {detail.averageScore} %
                </Typography>
              </Box>
              <Typography variant="h3" fontWeight={550}>
                {detail.title.english ?? detail.title.romaji}
              </Typography>
            </Box>
            {/* BOX avec title et description */}
            <Box
              sx={{
                flex: 1,
                marginTop: "10px",
              }}
            >
              {detail.genres.map((genre, index) => (
                <Chip
                  label={genre}
                  sx={{
                    marginRight: index === detail.genres.length - 1 ? 0 : 1,
                  }}
                />
              ))}

              <Typography
                dangerouslySetInnerHTML={{ __html: detail.description }}
              />
                <Grid container spacing={2} >
                {detail.characters.edges.slice(0, 6).map(({ node }) => (
                    <Grid item sm={6} xs={12} key={node.name.full} alignItems="center">
                      <Avatar alt={node.name.full} src={node.image.large}/>
                      <Typography variant="h7" fontWeight={550}>
                        {node.name.full}
                      </Typography>
                    </Grid>
                ))}
                </Grid>
              
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default MangaDetail;
