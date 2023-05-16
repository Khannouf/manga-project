import * as React from "react";
import Card from "@mui/material/Card";
import {
  Button,
  CardActionArea,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const token = localStorage.getItem("token")

const ListeCard = ({ onNew, list }) => {
  const [open, setOpen] = useState(false);
  const [nomDeListe, setnomDeListe] = useState("");
  const navigate = useNavigate();

  async function deleteList(listId) {
    ///lists/:listId/titles/:anilistId
    const data = await fetch(`http://localhost:8888/lists/${listId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .catch(() => null);
    if (!data || data.type !== "success")
      return console.log("Une erreur s'est produite.", data);
      window.location.reload()
  };


  const handleClick = () => {
    if (onNew) onNew(open ? setOpen(false) : setOpen(true));
    else if (list) navigate(`/listes/${list.id}`);
  };
  const handleSubmit = async () => {
    //console.log('Create the liste : ' + nomDeListe);
    const fetchData  = await fetch("http://localhost:8888/lists", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: nomDeListe,
      })
    })
    // .then(response => {
    //   console.log(response.body);
    // })
    .then(res => res.json())
    .catch(error => {
      console.log("une erreur s'est produite");
    });
    window.location.reload()
  };
  const handleChange = (e) => {
    setnomDeListe(e.target.value)
    console.log('Create the liste : ' + nomDeListe);
    //console.log(nomDeListe);
  };
  return (
    <>
      <Card>
        <CardActionArea
          onClick={handleClick}
          sx={{
            display: "flex",
            justifyContent: "center",
            height: 120,
          }}
        >
          {list ? (
            <>
              <Typography variant="h4">{list.name}</Typography>
            </>
          ) : (
            <ControlPointIcon sx={{ height: 50, width: 50 }} />
          )}
        </CardActionArea>
          {list ? (
            <>
              <CardActions>
                <Button
                  color="error"
                  onClick={() => {
                    deleteList(list.id);
                  }}
                >
                  <DeleteIcon />
                </Button>
              </CardActions>
            </>
          ) : (
            <></>
          )}
        
      </Card>

      <Dialog
        open={open}
        onClose={handleClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Création d'une liste
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <form onSubmit={handleSubmit} name="formListe">
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="NomListe"
                  label="NomListe"
                  name="NomListe"
                  autoComplete="NomListe"
                  autoFocus
                  value={nomDeListe}
                  onChange={handleChange}
                />
            {/* <TextField
              label="Nom de liste"
              value={nomDeListe}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
            /> */}
            <Button /*type="submit"*/ onClick={handleSubmit} variant="contained" color="primary">
              Soumettre
            </Button>
          </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ListeCard;
