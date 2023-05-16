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
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DropdownButton from "../components/MenuAddList";




const token = localStorage.getItem("token")


const MangaDetail = () => {
  const theme = useTheme();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [characters, setCharacters] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [list, setLists] = useState([])
  const [contentLists, setContentLists] = useState([])


  const handleFetch = async () => {
    const data = await fetch("http://localhost:8888/lists/details", {
      method: 'GET', 
      headers: { 'Authorization': `Bearer ${token}`}
    })
      .then(res => res.json())
      .catch(() => null);
    if (!data || data.type !== "success") return console.log("Une erreur s'est produite.", data)
    data?.data.map(async (listData) => {
      //console.log(listData.id);
      const contentListData = await fetch(`http://localhost:8888/lists/${listData.id}`,{
        method: 'GET',
        headers: {'Authorization' : `Bearer ${token}`}
      })
    })
    //const listData = await fetch(`http://localhost:8888/lists/${data.data.id}`)
    setLists(data.data)
    //console.log(data.data);
  }

  useEffect(() => {
    setLoading(true);
    handleFetch()
    mangaDetail(id).then((response) => {
      setLoading(false);
      if (!response || response.length === 0) return;
      setDetail(response[0]);
      setCharacters(response[0].characters);
    });
  }, [id]);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


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
              {/* Rajout du boutton add to list */}
              {/* <div>
                <Button
                  variant="contained"
                  onClick={handleClick}
                >
                  Ajouter à la liste
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  {

                  }
                  {list?.map((lists) =>(
                    <MenuItem onClick={handleClose} key={lists.id}>{lists.name}</MenuItem>
                  ))}
                </Menu>
              </div> */}
              <DropdownButton />
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
                  key={genre}
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
