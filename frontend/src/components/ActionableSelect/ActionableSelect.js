import React from "react";
import PropTypes from 'prop-types';

import { NativeSelect, Grid } from "@material-ui/core";
// import CancelIcon from "@material-ui/icons/Cancel";
import CancelPresentationTwoToneIcon from '@material-ui/icons/CancelPresentationTwoTone';

const ActionableSelect = ({ data, placeholder, action }) => {
  /**Component to render select that fires an action with each select value change
   * 
   * @props
   * - data: array of string
   *      options to select from
   * - placeholder: string
   *      defaulted disabled option
   * - action: function
   *      callback function to call on expand while passing it the value of the selected option
   * @state
   * - 
   */
  const [value, setValue] = React.useState('');

  const onSelectChange = ({ target: { value } }) => {
    setValue(value);
    action(value);
  };

  const onCancelClick = () => {
    setValue('');
    action('');
  };

  return (
    <Grid data-testid="act-select" container spacing={2} >
      <Grid item xs={1.2}>
      <NativeSelect data-testid="select" value={value} onChange={onSelectChange} style={{fontWeight: 'bold'}}>
        <option disabled value="">
          {placeholder}
        </option>
        {data.map((elem, idx) => (
          <option key={idx} value={elem}>{elem}</option>
        ))}
      </NativeSelect>
      </Grid>
      { value != '' && <Grid item xs={10.8}> <CancelPresentationTwoToneIcon data-testid="cancel" onClick={onCancelClick} /> </Grid>}
    </Grid>
  );
};

ActionableSelect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  action: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default ActionableSelect;