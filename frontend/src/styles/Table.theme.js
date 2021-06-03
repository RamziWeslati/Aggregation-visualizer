import { withStyles } from '@material-ui/core/styles';
import { TableCell } from '@material-ui/core';

// custom theme to define customized TableCell 

export const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#33434FB3',
      color: theme.palette.common.white,
      fontWeight: 'bold',
      fontSize: 14,
    },
}))(TableCell);