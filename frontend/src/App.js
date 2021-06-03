import React, { useEffect, useState } from "react";

import { Grid, MuiThemeProvider, Paper } from "@material-ui/core";

import AppBar from "./components/AppBar/AppBar";
import ActionableSelect from "./components/ActionableSelect/ActionableSelect";
import ExpandableTable from "./components/ExpandableTable/ExpandableTable";
import Api from "./Api/Api";

import theme from "./styles/theme";
import { useStyles } from "./styles/App.theme";
import logo from "./assets/fitle_balck.png";

function App() {
  /**Entry component to the application, rendering a single page application
   * 
   * @state
   * - aggregationCandidates: array of strings
   *      array of possible columns to aggregate by
   * - aggregationColumn: string
   *      column to fetch aggregated data by
   * - aggregatedData: array of object
   *      holds fetched aggregated data
   * - isLoading: boolean
   *      boolean to render loading components
   */
  const [aggregationCandidates, setAggregationCandidates] = useState([]);
  const [aggregationColumn, setAggregationColumn] = useState("");
  const [aggregatedData, setAggregatedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch possible possible agg columns when mounted
  useEffect(async () => {
    setIsLoading(true);
    const aggregationCandidates = await Api.getAggregateColumns();
    setAggregationCandidates(aggregationCandidates);
    setIsLoading(false);
  }, []);

  // given a column, fetch aggregated data
  useEffect(async () => {
    setIsLoading(true);
    if (aggregationColumn == "")
      //reset
      setAggregatedData([]);
    //fetch column aggregated data
    else setAggregatedData(await Api.getAggregatedData(aggregationColumn));
    setIsLoading(false);
  }, [aggregationColumn]);

  const aggregate = (column) => {
    setAggregationColumn(column);
  };

  const getDataByColumnValue = (rowData) => {
    /**call back to get expanded data
     * @params:
     * - rowData: object
     *      an element of aggregatedData
     * @returns:
     * - expandedData: array of object
     **/
    const expandData = Api.getDataByColumnValue(
      aggregationColumn,
      rowData.value
    );
    return expandData;
  };

  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar logo={logo} />
      <Grid
        container
        direction="column"
        spacing={8}
        justify="center"
        alignItems="center"
        className={classes.gridContainer}
      >
        <Grid item className={classes.gridItem}>
          <ActionableSelect
            data={aggregationCandidates}
            action={aggregate}
            placeholder="Aggregate by"
          />
        </Grid>
        <Grid item className={classes.gridItem}> {/* TODO change <>Loading</> to spinner*/}
          {isLoading ? (
            <>Loading</>
          ) : (
            aggregatedData.length > 0 && (
              <Paper className={classes.tablePaper}>
                <ExpandableTable
                  data={aggregatedData}
                  onExpand={getDataByColumnValue}
                />
              </Paper>
            )
          )}
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;