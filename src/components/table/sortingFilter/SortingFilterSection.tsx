import { SortingFilter } from './SortingFilter';
import { Grid } from '@mui/material';
import { ESortingType } from '../../../utils/sortingUtils';
import { TPOI } from '../../../types/types';
import { useCreationContext } from '../../../utils/contextHelper';
import { POIPropertyType, POITypeMap } from '../../../utils/filterUtils';

export const SortingFilterSection = () => {
  const { filters, dispatch } = useCreationContext();
  const sortings = filters.sortings;

  const removeSorting = (index: number) => {
    const updatedSortings = [...sortings];
    updatedSortings.splice(index, 1);
    dispatch({ type: 'SET_SORTINGS', payload: updatedSortings });
  };

  const getInitialSortingValue = (field: keyof TPOI): ESortingType => {
    if (POITypeMap[field] === POIPropertyType.NUMBER) {
      return ESortingType.ASC;
    }
    if (POITypeMap[field] === POIPropertyType.BOOLEAN) {
      return ESortingType.YES;
    } else {
      return ESortingType.AZ;
    }
  };
  const updateSorting = (index: number, sortingField: 'field' | 'sorting', value: keyof TPOI | ESortingType) => {
    const updatedSortings = [...sortings];
    if (sortingField === 'field') {
      updatedSortings[index].sorting = getInitialSortingValue(value as keyof TPOI);
    }
    updatedSortings[index] = { ...sortings[index], [sortingField]: value };
    dispatch({ type: 'SET_SORTINGS', payload: updatedSortings });
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        {sortings?.map((sorting, index) => (
          <SortingFilter
            key={`${sorting.field + sorting.sorting + index}`}
            sorting={sorting}
            removeSorting={removeSorting}
            updateSorting={updateSorting}
            index={index}
          />
        ))}
      </Grid>
    </Grid>
  );
};
