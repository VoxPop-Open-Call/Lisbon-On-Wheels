import { Grid, Paper } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = { children: ReactNode };

const PageLayout: FC<Props> = ({ children }) => {
  return (
    <Paper elevation={0}>
      <Grid container p={2} pt={2}>
        {children}
      </Grid>
    </Paper>
  );
};

export { PageLayout };
