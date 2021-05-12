import * as React from 'react';

const ToggleOption = ({ value, message }) => (
  <option value={value}>{message || value}</option>
);

export default ToggleOption;
