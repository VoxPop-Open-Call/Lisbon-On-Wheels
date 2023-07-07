import { Box, Divider, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { ErrorRedirect } from '../../components';
import { useParams } from 'react-router';
import { getMapConfigByTitle } from '../../utils/creationUtils';
import { usePoiContext } from '../../utils/contextHelper';
import { ElementRenderer } from '../../components/elementRenderer/ElementRenderer';

const Result: FC = () => {
  const { untouchedPoiList } = usePoiContext();
  const { title } = useParams();
  const creationData = getMapConfigByTitle(title || '');

  const renderElements = () => {
    return creationData?.elements?.map((element, i) => (
      <ElementRenderer
        key={i}
        element={element}
        poiList={untouchedPoiList}
        selectedFields={creationData?.filters.selectedFields}
      />
    ));
  };

  if (creationData === null) {
    return <ErrorRedirect />;
  }

  return (
    <Box minHeight="84vh" p={1} maxWidth="100vw" display="flex" flexDirection="column">
      <Grid container spacing={2} p={2}>
        <Grid item xs={12}>
          <Typography variant="h2" textAlign="center">
            {creationData?.title}
          </Typography>
          <Typography display="block" whiteSpace="pre-line" sx={{ wordWrap: 'break-word' }}>
            {creationData?.description}
          </Typography>
        </Grid>
        <Grid item xs={12} my={2}>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid container>{renderElements()}</Grid>
      </Grid>
    </Box>
  );
};

export { Result };
