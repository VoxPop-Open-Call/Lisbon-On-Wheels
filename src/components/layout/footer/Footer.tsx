import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { ReactComponent as VoxpopLogo } from '../../../assets/svg/voxpoplogo.svg';
import { ReactComponent as LisbonLogo } from '../../../assets/svg/logolisbon.svg';
import logoeuuia from '../../../assets/images/logoeuuia.png';

import './footer.css';
import { useTranslation } from 'react-i18next';

const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        background: 'radial-gradient(circle, rgba(29,134,50,1) 0%, rgba(49,156,53,1) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: {
          xs: 'center',
          md: 'space-between'
        },
        flexDirection: {
          xs: 'column',
          md: 'row'
        },
        py: 1,
        px: 4
      }}
    >
      <Typography
        sx={{
          color: '#FFFFFF',
          fontWeight: 'bold',
          fontSize: 18,
          marginBottom: {
            xs: 4,
            md: 0
          }
        }}
      >
        {t('FOOTER.SPONSOR.PART_1')}
        <br />
        {t('FOOTER.SPONSOR.PART_2')}
      </Typography>
      <Box
        alignItems="center"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: {
            xs: 'column',
            md: 'row'
          },
          justifyContent: {
            xs: 'center',
            md: 'space-between'
          }
        }}
      >
        <LisbonLogo className="logo" />
        <img src={logoeuuia} className="logo" />
        <VoxpopLogo />
      </Box>
    </Box>
  );
};

export { Footer };
