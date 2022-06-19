import { createTheme } from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";

export const darkTheme = createTheme({
    palette:{
        mode: 'dark',
        background: {
            default: grey[900]
        },
        primary: {
            main: blue[500]
        },
        secondary: {
            main: blue.A400
        },
        error: {
            main: red.A400
        }
      },
      components:{
          MuiAppBar: {
              defaultProps: {
                  elevation: 0
              },
              styleOverrides:{
                  root:{
                      backgroundColor: '#4a148c'
                  }
              }
          }
      }
  });
