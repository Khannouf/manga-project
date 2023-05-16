import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';


const token = localStorage.getItem("token")

const DropdownButton = () => {
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [list, setLists] = useState([])
  const [contentLists, setContentLists] = useState([])
  const [add, setAdd] = useState(false)
  const tableau = []

  const handleFetch = async () => {
    const data = await fetch("http://localhost:8888/lists/details", {
      method: 'GET', 
      headers: { 'Authorization': `Bearer ${token}`}
    })
      .then(res => res.json())
      .catch(() => null);
    if (!data || data.type !== "success") return console.log("Une erreur s'est produite.", data)
  
    setLists(data.data)
    //console.log(data.data)
  }

  
  const filteredListes = list.filter(liste => {
    const mangaId = id
    tableau.push(liste.list_titles.every(listTitle => listTitle.id !==mangaId))
    return liste.list_titles.every(listTitle => listTitle.id !== parseInt(mangaId));

  });
  useEffect(() => {
    handleFetch()
  }, []);

  //if (list) console.log(list);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

    const addTolist = async (listId) => {
      //console.log('Create the liste : ' + nomDeListe);
      const fetchData  = await fetch(`http://localhost:8888/lists/${listId}/titles/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        // body: JSON.stringify({
        //   name: nomDeListe,
        // })
      })
      // .then(response => {
      //   console.log(response.body);
      // })
      .then(res => res.json())
      .catch(error => {
        console.log("une erreur s'est produite");
      });

      console.log(fetchData.type);
      handleFetch()
      if(fetchData.type == "success") setAdd(true)
    };



  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (add) {
      const timer = setTimeout(() => {
        setAdd(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [add]);

  return (
    <>
      <Snackbar open={add} autoHideDuration={6000} onClose={() => setAdd(false)}>
        <Alert onClose={() => setAdd(false)} severity="success" sx={{ width: '100%' }}>
          Ajouté avec succès
        </Alert>
      </Snackbar>
    <div>
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
        {filteredListes?.map((list) =>(
                    <MenuItem onClick={() => addTolist(list.id)} key={list.id}>{list.name}</MenuItem>
                  ))} 
      </Menu>
    </div>
    </>
  );
};

export default DropdownButton;