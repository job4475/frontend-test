import { createTheme } from "@mui/material/styles";
import 'typeface-montserrat';
import 'typeface-prompt';

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#f0f",
    },
    white: {
      main: "#fff",
    },
    gray: {
      main: "#778296",
    },
  },
  typography: {
    fontFamily: [
      'montserrat',
    ].join(','),
  },
});

export default theme;
