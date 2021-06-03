import { makeStyles } from "@material-ui/core"

// custom theme to keep all components under AppBar

const theme = {
    gridContainer: {
        marginTop: '5%'
    },
    gridItem: {
        width: '70%'
    },
    tablePaper: {
        height: '640px',        // TODO change this to use %
    }
}

export const useStyles = makeStyles(theme)