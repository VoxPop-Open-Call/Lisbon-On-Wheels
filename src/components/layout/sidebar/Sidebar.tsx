import { FC } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

import styles from './sidebar.module.css';
import { useTranslation } from 'react-i18next';

const Sidebar: FC = () => {
  const { t } = useTranslation();
  const navLinkClass = ({ isActive }: { isActive: boolean }) => (isActive ? styles.active : styles.standard);

  return (
    <Box minWidth={300}>
      <Box padding={1.5} bgcolor="common.black" textAlign="center">
        <Typography fontWeight={700} fontSize={20} color="white">
          {t('SIDEBAR.DASHBOARD').toUpperCase()}
        </Typography>
      </Box>
      <List>
        <List>
          <NavLink to="create-list" className={navLinkClass}>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={t('CHARTS.LIST')} />
            </ListItemButton>
          </NavLink>
        </List>

        <List>
          <NavLink to="create-column-chart" className={navLinkClass}>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={t('CHARTS.COLUMN')} />
            </ListItemButton>
          </NavLink>
        </List>

        <List>
          <NavLink to="create-pie-chart" className={navLinkClass}>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={t('CHARTS.PIE')} />
            </ListItemButton>
          </NavLink>
        </List>

        <List>
          <NavLink to="create-doughnut-chart" className={navLinkClass}>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={t('CHARTS.DOUGHNUT')} />
            </ListItemButton>
          </NavLink>
        </List>

        <List>
          <NavLink to="create-line-chart" className={navLinkClass}>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={t('CHARTS.LINE')} />
            </ListItemButton>
          </NavLink>
        </List>
      </List>
      <List>
        <NavLink to="create-map" className={navLinkClass}>
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Create a Map" />
          </ListItemButton>
        </NavLink>
      </List>
    </Box>
  );
};

export { Sidebar };
