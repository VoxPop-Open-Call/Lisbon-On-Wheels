import { FC } from 'react';
import { Box, Typography } from '@mui/material';

type Props = {
  amountOfResults: number;
  amountOfColumns: number;
};

export const TableInfo: FC<Props> = ({ amountOfColumns, amountOfResults }) => {
  const amountOfResultsText = amountOfResults === 1 ? 'result' : 'results';
  const amountOfColumnsText = amountOfColumns > 0 ? 'columns' : 'column';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1
      }}
    >
      <Typography>{`${amountOfResults} ${amountOfResultsText}`}</Typography>
      <Typography>{`${amountOfColumns} ${amountOfColumnsText}`}</Typography>
    </Box>
  );
};
