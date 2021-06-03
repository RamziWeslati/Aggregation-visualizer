import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TableCell } from '@material-ui/core';

// custom theme to define customized TableCell and limit table max height

export const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#33434F',
      color: theme.palette.common.white,
      fontWeight: 'bolder',
      fontSize: 16,
    },
}))(TableCell);

export const useStyles = makeStyles((theme) => ({
  container: { 
    maxHeight: "600px" 
  },
  tableContentCell: {
    backgroundColor: '#eee'
  }
}))