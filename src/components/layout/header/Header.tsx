import { useState } from 'react';
import { AppBar, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router';
import { ReactComponent as OnWheelsLogo } from '../../../assets/svg/onwheelslogo.svg';

type Page = {
  name: string;
  onClick?: () => void;
  icon: JSX.Element;
  href?: string;
};

const Header = () => {
  const { t } = useTranslation();
  //TODO: Change to useRef
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const pages: Page[] = [
    { name: 'Dashboards', onClick: () => navigate('Dashboards'), icon: <DashboardIcon /> },
    {
      name: 'Github',
      icon: <GitHubIcon />,
      href: 'https://github.com/onwheelsapp/Lisbon-On-Wheels'
    },
    { name: 'Contact', icon: <MailIcon />, href: 'https://www.onwheelsapp.com/nl/contact/' }
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const linkStyles = { display: 'flex', alignItems: 'center', color: 'inherit' };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'radial-gradient(circle, rgba(29,134,50,1) 0%, rgba(49,156,53,1) 100%)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" underline="none" sx={linkStyles}>
            <OnWheelsLogo style={{ width: 60, height: 60 }} />
            <Box display="flex" alignItems="baseline">
              <Typography fontWeight={600} fontSize={36} ml={2}>
                {t('HEADER.TITLE')}
              </Typography>
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
            <IconButton
              size="large"
              aria-label="navigation dropdown"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map(({ name, onClick, icon, href }) => (
                <MenuItem
                  key={name}
                  onClick={() => {
                    onClick?.();
                    handleCloseNavMenu();
                  }}
                >
                  <Link href={href} target="_blank" underline="none" sx={{ ...linkStyles, flex: 1 }}>
                    {icon}
                    <Typography ml={1} textAlign="center">
                      {name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map(({ name, onClick, href }) => (
              <Button
                key={name}
                onClick={() => {
                  onClick?.();
                  handleCloseNavMenu();
                }}
                href={href as string}
                target="_blank"
                sx={{ my: 2, color: 'white', display: 'block', fontSize: 18 }}
              >
                {name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { Header };
