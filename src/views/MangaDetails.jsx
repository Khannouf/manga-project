import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { mangaDetails } from "../utils/requests/title.request"

const MangaDetail = () => {
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
    mangaDetails(id).then(response => {
      setLoading(false)
      console.log(response);
      //setData(manga)
    })
  }, [id])

  console.log(data[0].title.romaji);
  return <>
  <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="The house from the offer."
        //src={data[0].bannerImage}
      />
    <h2>{id}</h2>
  </>
}

export default MangaDetail
