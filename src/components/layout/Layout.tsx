import React from 'react';
import { Footer, Header } from '..';
import { Grid } from '@mui/material';

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item container direction="row" wrap="nowrap">
        <Grid
          item
          sx={{
            flexGrow: 1,
            background: 'radial-gradient(circle, rgba(245,245,245,1) 0%, rgba(240,239,239,1) 100%)',
            minHeight: '84vh'
          }}
        >
          {children}
        </Grid>
      </Grid>
      <Footer />
    </Grid>
  );
};

export { Layout };
