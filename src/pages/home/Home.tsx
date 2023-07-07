import { FC } from 'react';
import { Box } from '@mui/material';
import { CreateMap } from '..';

const Home: FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%'
      }}
    >
      <CreateMap />
    </Box>
  );
};

export { Home };
