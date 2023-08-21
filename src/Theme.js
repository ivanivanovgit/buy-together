import { createTheme } from "@mui/material/styles";
import { Constants } from "./CONSTANTS";

// Create a theme instance.
const theme = createTheme({
  palette: {
    firstColor: {
      main: Constants.firstColor,
    },
    secondColor: {
      main: Constants.secondColor,
    },
    thirdColor: {
      main: Constants.thirdColor,
    },
  },
  typography: {
    fontFamily: [Constants.firstFont, ""].join(","),
  },
});

export default theme;
