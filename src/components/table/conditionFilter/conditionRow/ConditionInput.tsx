import React, { useEffect, useState } from 'react';
import { Select, TextField, MenuItem, Checkbox } from '@mui/material';
import { enumSelectObject } from '../../enumData';
import { TPOI } from '../../../../types/types';
import { POIPropertyType, POITypeMap, getInitialConditionValue } from '../../../../utils/filterUtils';
import { TChangeEvent } from '../ConditionFilter';

type Props = {
  field: keyof TPOI;
  onChange: (e: TChangeEvent) => void;
};

const ConditionInput = ({ onChange, field }: Props) => {
  const [conditionValue, setConditionValue] = useState(getInitialConditionValue(field));

  useEffect(() => {
    setConditionValue(getInitialConditionValue(field));
  }, [field]);

  const handleChange = (event: TChangeEvent) => {
    setConditionValue(event.target.value);
    onChange(event);
  };

  const handleBooleanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConditionValue(event.target.checked);
    onChange(event);
  };

  const renderNumberInput = () => (
    <TextField
      id="numberInput"
      type="number"
      variant="outlined"
      size="small"
      value={conditionValue}
      onChange={handleChange}
    />
  );

  const renderStringInput = () => (
    <TextField id="stringInput" variant="outlined" size="small" value={conditionValue} onChange={handleChange} />
  );

  const renderEnumInput = () => (
    <Select size="small" value={conditionValue as string} onChange={handleChange}>
      {enumSelectObject[field]?.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );

  const renderLocationInput = () => null;

  const renderBooleanInput = () => <Checkbox checked={conditionValue as boolean} onChange={handleBooleanChange} />;

  switch (POITypeMap[field]) {
    case POIPropertyType.NUMBER:
      return renderNumberInput();
    case POIPropertyType.STRING:
      return renderStringInput();
    case POIPropertyType.ENUM:
      return renderEnumInput();
    case POIPropertyType.LOCATION:
      return renderLocationInput();
    case POIPropertyType.BOOLEAN:
      return renderBooleanInput();
    default:
      return null;
  }
};

export { ConditionInput };
