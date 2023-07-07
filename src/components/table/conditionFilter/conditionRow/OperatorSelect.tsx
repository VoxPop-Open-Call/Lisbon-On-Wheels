import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Operator } from '../ConditionFilter';
import { TPOI } from '../../../../types/types';
import { POIPropertyType, POITypeMap } from '../../../../utils/filterUtils';
import { useEffect, useState } from 'react';

type Props = {
  value: Operator;
  onChange: (e: SelectChangeEvent) => void;
  selectedPropertyToFilter: keyof TPOI;
};

const operatorsToRender = (selectedPropertyToFilter: keyof TPOI): Operator[] => {
  switch (POITypeMap[selectedPropertyToFilter]) {
    case POIPropertyType.NUMBER:
      return ['<', '=', '>', '<=', '>='];
    case POIPropertyType.STRING:
      return ['=', 'in', 'not in'];
    case POIPropertyType.BOOLEAN:
      return ['='];
    case POIPropertyType.ENUM:
      return ['='];
    default:
      return ['='];
  }
};

export const OperatorSelect = ({ value, onChange, selectedPropertyToFilter }: Props) => {
  const [operators, setOperators] = useState<Operator[]>(operatorsToRender(selectedPropertyToFilter));

  useEffect(() => {
    setOperators(operatorsToRender(selectedPropertyToFilter));
  }, [selectedPropertyToFilter]);

  return (
    <Select value={value} onChange={onChange} size="small" sx={{ mr: 2 }}>
      {operators.map((operator) => (
        <MenuItem key={operator} value={operator}>
          {operator}
        </MenuItem>
      ))}
    </Select>
  );
};
