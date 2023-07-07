import { Box, Theme, Typography, SxProps } from '@mui/material';

type Props = {
  stepNumber: number;
  title: string;
  sx?: SxProps<Theme>;
};

export const Title = ({ stepNumber, title, sx }: Props) => {
  return (
    <Box
      sx={{
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(90deg, rgba(76,76,76,1) 0%, rgba(124,123,123,1) 100%)',
        height: 46,
        minWidth: '95%',
        ...sx
      }}
    >
      <Box
        sx={{
          bgcolor: 'primary.main',
          height: 46,
          width: 46,
          borderRadius: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography color="white" fontWeight={600} fontSize={18}>
          {stepNumber}
        </Typography>
      </Box>
      <Typography color="white" variant="h6">
        {title}
      </Typography>
      <Box width={46} />
    </Box>
  );
};
