import { FC, useEffect } from 'react';
import { Box, Button, FormGroup, List, ListItem, Typography } from '@mui/material';
import { MARKERS, CATEGORY_MAP as categories } from '../../assets/markers/markerSVGs';
import { CategorySwitch } from './CategorySwitch';
import { Icon } from '../icon/Icon';
import { allCategories } from '../../utils/creationUtils';
import { useCreationContext, usePoiContext } from '../../utils/contextHelper';
import { TCategoryMap } from '../../types/types';
import { applyAllFilters } from '../../utils/filterUtils';
import { useTranslation } from 'react-i18next';

const CategorySelector: FC = () => {
  const { untouchedPoiList, setPoiList } = usePoiContext();
  const { t } = useTranslation();
  const {
    categories: selectedCategories,
    setCategories: setSelectedCategories,
    filters: { conditions, sortings }
  } = useCreationContext();
  const allCategoriesSelected = selectedCategories.length === allCategories.length;

  useEffect(() => {
    applyAllFilters(untouchedPoiList, selectedCategories, conditions, sortings, setPoiList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);

  const onPressAll = () => {
    setSelectedCategories(allCategoriesSelected ? [] : [...allCategories]);
  };

  const sortedCategories = [...categories].sort((a, b) => a.name.localeCompare(b.name));

  const renderCategoryListItem = ({ name, value }: TCategoryMap) => {
    return (
      <ListItem
        key={name}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          maxWidth: { xs: '100%', sm: '50%' },
          '.MuiListItem-divider': {
            width: '90%'
          }
        }}
        divider
      >
        <Box display="flex" alignItems="center">
          <Icon icon={MARKERS[name]} />
          <Typography mx={2} fontWeight={500}>
            {value}
          </Typography>
        </Box>
        <CategorySwitch category={name} />
      </ListItem>
    );
  };

  return (
    <FormGroup sx={{ backgroundColor: 'white', borderRadius: 4, minWidth: '85%' }}>
      <ListItem sx={{ justifyContent: 'center' }}>
        <Button variant="contained" onClick={onPressAll}>
          {allCategoriesSelected ? t('CATEGORIES.CLEAR_ALL') : t('CATEGORIES.SELECT_ALL')}
        </Button>
      </ListItem>
      <List
        sx={{
          maxHeight: 820,
          overflow: 'auto',
          flexFlow: { xs: 'column', sm: 'column wrap' },
          display: 'flex'
        }}
      >
        {sortedCategories.map(renderCategoryListItem)}
      </List>
    </FormGroup>
  );
};

export { CategorySelector };
