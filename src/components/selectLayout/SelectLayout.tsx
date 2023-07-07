import { Dispatch, SetStateAction } from 'react';
import { Grid, Box, Typography, Stack, Button } from '@mui/material';
import { aspectRatios } from '../../utils/helpers';
import { TAspectRatio } from '../../types/types';

type Props = {
  selectedLayout: TAspectRatio;
  setSelectedLayout: Dispatch<SetStateAction<TAspectRatio>>;
};

const SelectLayout = ({ selectedLayout, setSelectedLayout }: Props) => {
  return (
    <>
      <Stack direction="row" flexWrap="wrap" gap={2} justifyContent="space-around">
        {aspectRatios.map(({ ratio, dimensions: { width, height } }) => (
          <Button
            key={ratio}
            variant="outlined"
            onClick={() => setSelectedLayout({ ratio, dimensions: { width, height } })}
            sx={{
              border: selectedLayout?.ratio === ratio ? '2px solid primary.main' : 'none'
            }}
          >
            <Box sx={{ bgcolor: 'common.white' }} p={2} height={173} width={288} borderRadius={4}>
              <Grid
                sx={{
                  background: 'linear-gradient(142deg, rgba(52,58,64,1) 0%, rgba(85,92,99,1) 100%)'
                }}
                height={height}
                width={width}
                borderRadius={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Typography component="p" sx={{ color: 'text.secondary' }}>
                  {ratio}
                </Typography>
              </Grid>
            </Box>
          </Button>
        ))}
      </Stack>
    </>
  );
};

export { SelectLayout };
