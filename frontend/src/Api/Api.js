import axios from 'axios';

/* exports helper functions that wrap http requests to the proxy
    - proxy is configured package.json
*/

export default {
  getAggregateColumns: async () => {
    /**fetches all data columns except aggregation column
     * @returns
     * - columns: array of strings
     **/
    return (await axios.get('/agg/columns')).data;
  },
  getAggregatedData: async (aggColumn) => {
    /**fetches aggregated data grouped by a column
     * @params
     * - aggColumn: string
     *      column to group data by
     * @returns
     * - aggregatedData: array of object
     **/
    return (await axios.get(`/agg/${aggColumn}/aggregations`)).data;
  },
  getDataByColumnValue: async (column, value) => {
    /**fetches all data having matching the value for a given column
     * @params
     * - column: string
     *      column to match data on
     * - value: string
     *      value to check data against
     * @returns
     * - data: array of object
     **/
    return (await axios.get(`describe/values?column=${column}&value=${value}`)).data;
  },
};
