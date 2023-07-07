import { FC } from 'react';
import { Paper, SxProps, Theme } from '@mui/material';
import { FieldsFilter } from '../fieldsFilter/FieldsFilter';
import { SortingFilterSection } from '../sortingFilter/SortingFilterSection';
import { ConditionFilterSection } from '../conditionFilter/ConditionFilterSection';
import { FilterButtonRow } from '../FilterButtonRow';

type Props = {
  sx?: SxProps<Theme> | undefined;
};

export const TableFilters: FC<Props> = ({ sx }) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2,
        maxHeight: '300px',
        overflow: 'auto',
        ...sx
      }}
    >
      <FieldsFilter sx={{ mb: 2 }} />
      <ConditionFilterSection />
      <SortingFilterSection />
      <FilterButtonRow />
    </Paper>
  );
};
