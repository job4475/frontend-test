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
    textgreen: {
      main: "#48846B",
    },
    btncolor: {
      main: "#84BAA1",
    },
    featurebt: {
      main: "#DAEBE3",
    },
    pending: {
      main: "#0062FF",
    },
    approve: {
      main: "#00E700",
    },
    adminapprove: {
      main: "#84BAA1",
    },
    reject: {
      main: "#FF0000",
    },
    adminreject: {
      main: "#E9563D",
    },
  },
  typography: {
    fontFamily: [
      'montserrat',
    ].join(','),
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          maxWidth: 500,
          borderRadius: 7,
          border: '1px solid rgba(119, 130, 150, 0.20)',
          background: '#FFF',
          boxShadow: '0px 4px 60px 0px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

export default theme;
