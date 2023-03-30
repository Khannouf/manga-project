import { Container, Box, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { mangaDetail } from "../utils/requests/title.request"

const MangaDetail = () => {
  const { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    setLoading(true)
    mangaDetail(id).then(response => {
      setLoading(false)
      if (!response || response.length === 0) return
      setDetail(response[0])
    })
  }, [id])

  return (
    <Container>
      {loading ? (
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <CircularProgress />
        </Box>
      ) : !detail ? (
        <Box>Not found</Box>
      ) : (
        <Box>
          <h1>{detail.title.english}</h1>
        </Box>
      )}
    </Container>
  )
}

export default MangaDetail
