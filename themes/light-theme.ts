import { createTheme } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

export const lightTheme = createTheme({
    palette:{
      mode: 'light',
      background: {
          default: grey[300]
      },
      primary: {
          main: blue[300]
      },
      secondary: {
          main: blue.A200
      }
    },
    components:{
        MuiAppBar:{
            defaultProps: {
                elevation: 0
            }
        }
    }
  });