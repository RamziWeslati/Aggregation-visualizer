import { createMuiTheme } from "@material-ui/core";

// holds common theme
const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
          '@global': {
            '*': {
              'scrollbar-width': 'thin',
            },
            '*::-webkit-scrollbar': {
              width: '1px',
              height: '1px',
            }
          }
        }
      }
})

export default theme;