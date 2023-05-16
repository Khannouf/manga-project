import { Container } from "@mui/material";
import ListeCard from "../components/ListeCard";
import { useEffect, useState } from "react";







const token = localStorage.getItem("token")
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

const ListView = () => {

  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([])

  //const [lists, setLists] = useState("");
  const handleFetch = async () => {
    const data = await fetch("http://localhost:8888/lists", {
      method: 'GET', 
      headers: { 'Authorization': `Bearer ${token}`}
    })
      .then(res => res.json())
      .catch(() => null);
    if (!data || data.type !== "success") return console.log("Une erreur s'est produite.", data)
  
    setLists(data.data)
  }
  useEffect(() => {
    handleFetch()
  }, []);

  console.log(lists);
  return (
    <Container
      sx={{
        display: "grid",
        columnGap: 2,
        rowGap: 2,
        mt: 4,
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      }}
    >

      <ListeCard onNew={() => console.log("new")} />
      {lists.map((list) => (
        <ListeCard key={list.id} list={list} />
      ))}
    </Container>
  );
};

export default ListView;
