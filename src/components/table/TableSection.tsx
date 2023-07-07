import React from 'react';
import { Box } from '@mui/material';
import { TableFilters } from './tableFilters/TableFilters';
import { CustomTable } from './customTable/CustomTable';
import { useCreationContext, usePoiContext } from '../../utils/contextHelper';

export const TableSection = () => {
  const { poiList } = usePoiContext();
  const { filters } = useCreationContext();
  const data = React.useMemo(() => [...poiList], [poiList]);

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        maxHeight: 880,
        maxWidth: '96vw',
        minWidth: '85%',
        borderRadius: 4
      }}
      p={2}
    >
      <TableFilters sx={{ mb: 2 }} />
      <CustomTable data={data} selectedFields={filters.selectedFields} />
    </Box>
  );
};
