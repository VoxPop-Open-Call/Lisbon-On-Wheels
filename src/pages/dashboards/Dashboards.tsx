import { Box, Grid } from '@mui/material';
import { getAllMapConfigs, removeMapConfigByTitle } from '../../utils/creationUtils';
import { DashboardCard } from './DashboardCard';
import { useState } from 'react';
import { SearchBar } from '../../components/shared/searchBar/Searchbar';
import { useTranslation } from 'react-i18next';

export const Dashboards = () => {
  const mapConfigs = getAllMapConfigs();
  const [configs, setConfigs] = useState(mapConfigs);
  const [search, setSearch] = useState('');
  const { t } = useTranslation();
  const removeConfig = (title: string) => {
    removeMapConfigByTitle(title);
    const configsWithoutUnwanted = configs.filter((config) => config.title !== title);
    setConfigs(configsWithoutUnwanted);
  };

  const onSearch = (searchValue: string) => {
    setSearch(searchValue);
    if (searchValue === '') {
      return setConfigs(mapConfigs);
    }
    const filteredConfigs = mapConfigs.filter(({ title }) => {
      return title.toLowerCase().includes(searchValue.toLowerCase());
    });
    setConfigs(filteredConfigs);
  };

  if (mapConfigs.length < 1) return null;
  return (
    <Box minHeight="84vh">
      <Box justifyContent="center" display="flex" pt={2} px={2}>
        <SearchBar
          search={search}
          onSearch={onSearch}
          placeholder={t('DASHBOARDS.SEARCH') || 'Search for a dashboard'}
        />
      </Box>
      <Grid container>
        {configs.map((config) => (
          <Grid item xs={12} sm={6} md={4} key={config.title} p={4} display="flex" justifyContent="center">
            <DashboardCard dashboardInfo={config} remove={removeConfig} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
