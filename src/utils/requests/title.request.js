import axios from "axios";

export const searchTitles = (query) => {
  const requestQuery = JSON.stringify({
    query: `query ($search: String) {
      Page {
        media(type: MANGA, search: $search, isAdult: false, sort: TRENDING_DESC) {
          id 
          title {
            romaji
            english
          }
          chapters
          genres
          averageScore
          coverImage {
              extraLarge
              large
              color
          }
          bannerImage
        }
      }
    }`,
    variables: { search: query.toLowerCase().trim() },
  });

  return axios
    .post("https://graphql.anilist.co", requestQuery, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data.data.Page.media)
    .catch(() => []);
};

export const mangaDetail = (id) => {
  const requestQuery = JSON.stringify({
    query: `query ($id: Int) {
      Page {
        media(type: MANGA, id: $id, isAdult: false, sort: TRENDING_DESC) {
          id 
          description
          title {
            romaji
            english
          }
          characters(sort: FAVOURITES_DESC) {
            edges {
              node {
                name {
                  full
                }
                image {
                  large
                }
              }
            }
          }
          chapters
          genres
          averageScore
          coverImage {
              extraLarge
              large
              color
          }
          bannerImage
        }
      }
    }`,
    variables: { id: id},
  });

  return axios
    .post("https://graphql.anilist.co", requestQuery, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data.data.Page.media)
    .catch(() => []);
};
