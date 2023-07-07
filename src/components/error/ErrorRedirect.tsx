import { Box, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ReactComponent as OnWheelsLogo } from '../../assets/svg/onwheelslogo.svg';

const ErrorRedirect: FC = () => {
  const navigate = useNavigate();

  // in case of an error we inform the user and redirect him to the home page automatically after 3 seconds.
  // The inner structure of the error page is yet to be filled in.

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <OnWheelsLogo />
      <Typography variant="h3" marginLeft={2}>
        Oops, something went wrong!
      </Typography>
    </Box>
  );
};

export { ErrorRedirect };
