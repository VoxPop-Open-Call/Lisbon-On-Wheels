import { Box, Button } from '@mui/material';
import { applyAllFilters, clearFilters } from '../../utils/filterUtils';
import { ESortingType } from '../../utils/sortingUtils';
import { useCreationContext, usePoiContext } from '../../utils/contextHelper';
import { useTranslation } from 'react-i18next';

export const FilterButtonRow = () => {
  const { setPoiList, untouchedPoiList, setAreFiltersApplied } = usePoiContext();
  const { filters, dispatch, categories } = useCreationContext();
  const { conditions, sortings } = filters;
  const { t } = useTranslation();

  const addCondition = () => {
    dispatch({
      type: 'SET_CONDITIONS',
      payload: [...conditions, { field: 'doorWidth', operator: '=', operands: [0] }]
    });
  };

  const addSorting = () => {
    dispatch({ type: 'SET_SORTINGS', payload: [...sortings, { field: 'name', sorting: ESortingType.AZ }] });
  };

  const applyFilters = () => {
    applyAllFilters(
      untouchedPoiList,
      categories,
      filters.conditions,
      filters.sortings,
      setPoiList,
      setAreFiltersApplied
    );
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
      <Box display="flex" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button
          sx={{ mr: 1, mb: { xs: 1, sm: 0 }, width: 130 }}
          variant="outlined"
          color="primary"
          size="small"
          onClick={addCondition}
        >
          {t('FILTERS.ADD_CONDITION')}
        </Button>
        <Button variant="outlined" color="primary" size="small" onClick={addSorting} sx={{ width: 130 }}>
          {t('FILTERS.ADD_SORTING')}
        </Button>
      </Box>
      <Box alignItems="right" display="flex" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => clearFilters(setPoiList, untouchedPoiList, dispatch, categories, setAreFiltersApplied)}
          sx={{ mb: { xs: 1, sm: 0 }, width: 130 }}
        >
          {t('FILTERS.CLEAR_FILTERS')}
        </Button>
        <Button
          sx={{ ml: { sm: 1 }, width: 130 }}
          variant="outlined"
          color="primary"
          size="small"
          onClick={applyFilters}
        >
          {t('FILTERS.APPLY_FILTERS')}
        </Button>
      </Box>
    </Box>
  );
};
