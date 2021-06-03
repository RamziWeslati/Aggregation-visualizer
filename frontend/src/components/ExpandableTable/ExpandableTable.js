import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  TablePagination,
} from "@material-ui/core";

import SimpleTable from "../Table/Table";
import Collapsable from "../Collapsable/Collapsable";

import { StyledTableCell, useStyles } from "../../styles/ExpandableTable.theme";

const ExpandableTable = ({ data, onExpand, header }) => {
  /**Component to render Table expandable rows of data
   * 
   * uses SimpleTable and Collapsable components 
   * 
   * @props
   * - data: array of object
   *      data to display, each object is mapped to a row
   * - header [optional]: array of string
   *      header to display as column names. defaulted to keys of a data object
   * - onExpand: function
   *      callback function to fetch expanded table data by
   * @state
   * - expandedRow / setExpandedRow: integer
   *      index of expanded row, null if table is not expanded
   * - expandedData / setExpandedData: array of object
   * - isLoading: boolean
   *      boolean to render loading components
   */

  // column names definition
  const columns = header ? header : Object.keys(data[0]);

  const [isLoading, setIsLoading] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedData, setExpandedData] = useState([]);
  //pagination helpers
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // fetch data to fill expanded child table, when we have a new expanded row
  useEffect( async () => {
    if (expandedRow !== null) {
      setIsLoading(true);
      const _expandedData = await onExpand(data[expandedRow])
      setExpandedData(_expandedData);
      setIsLoading(false);
    }
  }, [expandedRow]);

  const onCellClick = (idx) => {
    if (expandedRow == idx) {
      //undo expand and reset expanded data
      setExpandedRow(null);
      setExpandedData([]);
    }
    //expand
    else setExpandedRow(idx);
  };

  const handleChangePage = (event, newPage) => {
    // helper pagination function
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // helper pagination function
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // render empty rows for the fill the fixed height
  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      data.length + expandedData.length - page * rowsPerPage
    ) // TODO compute the correct value to add

  const classes = useStyles()

  return (
    <>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow data-testid="header" >
              {columns.map((column, idx) => (
                <StyledTableCell key={`header-cell-${idx}`}>
                  {column}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).flatMap((rowData, rIdx) => (
              <>
                <TableRow data-testid="row" key={`table-row-${rIdx}`}>
                  {Object.values(rowData).map((rowValue, cIdx) => (
                    <TableCell
                      key={`table-row-${cIdx}-${rIdx}`}
                      onClick={() => onCellClick(rIdx)}
                      className={classes.tableContentCell}
                    >
                      {rowValue}
                    </TableCell>
                  ))}
                </TableRow>
                {rIdx == expandedRow && ( isLoading? <LinearProgress  style={{width: '2000px'}} />
                :
                 expandedData.length > 0 && (
                  <Collapsable
                    data-testid="expanded-table"
                    colNumber={columns.length}
                  >
                    <SimpleTable data={expandedData} />
                  </Collapsable>
                ))}
              </>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

ExpandableTable.propTypes = {
  // custom prop checker to require non empty arrays of data
  data: (props, propName, componentName) => {
    const errorBaseString = `Invalid prop ${propName} supplied to ${componentName}, `;
    const dataProp = props[propName];

    if (dataProp === undefined)
      return new Error(errorBaseString + "data prop is required.");
    if (!Array.isArray(dataProp))
      return new Error(errorBaseString + "data prop must be an array.");
    if (dataProp.length == 0)
      return new Error(errorBaseString + "data prop must not be empty.");
  },
  onExpand: PropTypes.func.isRequired,
  header: PropTypes.array,
};

export default ExpandableTable;