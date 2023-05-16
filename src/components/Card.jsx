import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// var data = JSON.stringify({
//   query: `query ($search: String) {
//    Media (search: $search) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
//     id
//     type
//     characters {
//         pageInfo{
//             total
//         }
//     }
//     volumes

//     coverImage {
//         medium
//     }
//     format
//     title {
//       romaji
//       english

//       native
//     }
//   }
// }`,
//   variables: {"search":"One piece"}
// });

// var config = {
//   method: 'post',
//   url: 'https://graphql.anilist.co',
//   headers: {
//     'Content-Type': 'application/json',
//     'Cookie': 'laravel_session=qmA9DwGhitdP05oMNtvnH0hcweEfvvSNnTpb01s9'
//   },
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
//   var data = response.data
//   var title = data.data.Media.title.romaji;
//   console.log(title);

// })
// .catch(function (error) {
//   console.log(error);
// });

// export default function MangaCard(title : String) {
//   return (
//     <Card sx={{ maxWidth: 240 }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="140"
//           image="https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx30013-oT7YguhEK1TE.jpg"
//           alt="green iguana"
//           sx={{
//             height: "auto",
//           }}
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             {title}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//       <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
//       </CardActions>
//     </Card>
//   );
// }

const MangaCard = (props) => {
  return (
    <Card sx={{ maxWidth: 230, "& > a": {
      textDecoration: "none",
      color: "inherit"
    } }}>
      <Link to={`/details/${props.title.id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={props.title.coverImage.large}
            sx={{
              height: "auto",
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.title.id} :
              {props.title.title.english ?? props.title.title.romaji}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default MangaCard;
