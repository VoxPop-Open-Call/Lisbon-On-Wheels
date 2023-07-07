import {  Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { TPOI } from '../../../../types/types';
import { POIProperties, POIPropertyName } from '../../../../utils/poiUtils';

type Props = {
  value: keyof TPOI;
  onChange: (e: SelectChangeEvent) => void;
  purpose: 'condition' | 'sorting'; //Is this component used in ConditionFilter or SortingFilter?
};

export const FieldSelect = ({ value, onChange, purpose }: Props) => {
  const propertiesToExclude = purpose === 'condition' ? ['location', 'category'] : ['location'];

  return (
    <Select value={value} onChange={onChange} size="small" sx={{ mr: 2 }}>
      {POIProperties.filter((property) => !propertiesToExclude.includes(property)).map((property) => (
        <MenuItem key={property} value={property}>
          {POIPropertyName[property]}
        </MenuItem>
      ))}
    </Select>
  );
};
