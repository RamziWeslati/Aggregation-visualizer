import React from "react";
import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { StyledTableCell } from "../../styles/Table.theme";

const SimpleTable = ({ data, header }) => {
  /**Presentational component that renders data in a row column fashion 
   * 
   * @props
   * - data: array of object
   *      data to display, each object is mapped to a row
   * - header [optional]: array of string
   *      header to display as column names. defaulted to keys of a data object
   */

  // column names definition
  const columns = header ? header : Object.keys(data[0]);

  return (
    <TableContainer style={{maxHeight: '300px'}}>
      <Table stickyHeader>
        <TableHead >
          <TableRow data-testid="header">
            {columns.map((column, idx) => (
              <StyledTableCell key={`header-cell-${idx}`}>{column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.flatMap((rowData, rIdx) => (
            <TableRow data-testid="row" key={`table-row-${rIdx}`}>
              {Object.values(rowData).map((rowValue, cIdx) => (
                <TableCell key={`table-row-${cIdx}-${rIdx}`}>{rowValue}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


SimpleTable.propTypes = {
  header: PropTypes.array, // optional, defaulted in component using props
  
  // custom prop checker to require non empty arrays of data
  data: (props, propName, componentName) => {
    const errorBaseString = `Invalid prop ${propName} supplied to ${componentName}, `
    const dataProp = props[propName]

    if (dataProp === undefined)
      return new Error(
        errorBaseString + 'data prop is required.'
      );
    if (!Array.isArray(dataProp))
      return new Error(
        errorBaseString + 'data prop must be an array.'
      );
    if (dataProp.length == 0)
      return new Error(
        errorBaseString + 'data prop must not be empty.'
    );
  },
};

export default SimpleTable;
