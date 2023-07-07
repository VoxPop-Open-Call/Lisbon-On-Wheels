import { useEffect, useState } from 'react';
import { POIPropertyType, POITypeMap } from '../../../utils/filterUtils';
import { FieldSelect } from '../conditionFilter/conditionRow/FieldSelect';
import { Box, IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ESortingType, SortingRule } from '../../../utils/sortingUtils';
import { TPOI } from '../../../types/types';
import ClearIcon from '@mui/icons-material/Clear';

type Props = {
  index: number;
  sorting: SortingRule;
  updateSorting: (index: number, sortingField: 'field' | 'sorting', value: keyof TPOI | ESortingType) => void;
  removeSorting: (index: number) => void;
};

const getSortingFields = (field: keyof TPOI) => {
  switch (POITypeMap[field]) {
    case POIPropertyType.NUMBER:
      return [
        <MenuItem key={ESortingType.ASC} value={ESortingType.ASC}>
          ASC
        </MenuItem>,
        <MenuItem key={ESortingType.DESC} value={ESortingType.DESC}>
          DESC
        </MenuItem>
      ];
    case POIPropertyType.BOOLEAN:
      return [
        <MenuItem key={ESortingType.YES} value={ESortingType.YES}>
          YES
        </MenuItem>,
        <MenuItem key={ESortingType.NO} value={ESortingType.NO}>
          NO
        </MenuItem>
      ];
    default:
      return [
        <MenuItem key={ESortingType.AZ} value={ESortingType.AZ}>
          A-Z
        </MenuItem>,
        <MenuItem key={ESortingType.ZA} value={ESortingType.ZA}>
          Z-A
        </MenuItem>
      ];
  }
};

export const SortingFilter = ({ sorting: { field, sorting }, updateSorting, removeSorting, index }: Props) => {
  const [sortingFields, setSortingFields] = useState(getSortingFields(field));

  const onChange = (e: SelectChangeEvent, sortingField: 'field' | 'sorting') => {
    updateSorting(index, sortingField, e.target.value as keyof TPOI | ESortingType);
  };

  useEffect(() => {
    setSortingFields(getSortingFields(field));
  }, [field]);

  return (
    <Box sx={{ mb: 2, display: 'flex', flexWrap: 'nowrap' }}>
      <IconButton color="error" sx={{ mr: 1 }} onClick={() => removeSorting(index)}>
        <ClearIcon />
      </IconButton>
      <FieldSelect purpose="sorting" value={field} onChange={(e) => onChange(e, 'field')} />
      <Select
        size="small"
        value={sorting}
        onChange={(e) => {
          onChange(e, 'sorting');
        }}
      >
        {...sortingFields}
      </Select>
    </Box>
  );
};
