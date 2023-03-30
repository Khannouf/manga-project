import { Global as G, css} from "@emotion/react"
// import "@fontsource/roboto/700"
// import "@fontsource/roboto/500"
// import "@fontsource/roboto/400"

const Global = () => {
  return <G styles={css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box !important;
      font-family: Roboto, sans-serif;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
  `} />
}

export default Global