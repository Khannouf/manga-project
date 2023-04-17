import { createTheme } from '@mui/material/styles';

const myTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#4b4c4d"
    },
    text: {
      primary: "#fff"
    },
    primary: {
      main: '#222423',
    },
    secondary:{
      main: '#66d37e',
    },
  },
});

export default myTheme;