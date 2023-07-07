import { Box, Grid, IconButton } from '@mui/material';
import { useMemo } from 'react';
import { StreetMap } from '..';
import { TPOI } from '../../types/types';
import { mapAspectRatioToGrid, mapAspectRatioToHeight } from '../../utils/resultUtils';
import { CustomTable } from '../table/customTable/CustomTable';
import { PieChart } from '../chart/piechart/PieChart';
import ClearIcon from '@mui/icons-material/Clear';
import { TElement } from '../../types/elementTypes';
import { applyConditions } from '../../utils/filterUtils';
import { sortPois } from '../../utils/sortingUtils';

type Props = {
  element: TElement;
  removeElement?: (element: TElement) => void;
  poiList: TPOI[];
  selectedFields?: (keyof TPOI)[];
};

export const ElementRenderer = ({ element, removeElement, poiList }: Props) => {
  const {
    aspectRatio,
    type,
    filters: { categories, filters }
  } = element;
  const { conditions, sortings, selectedFields } = filters;
  const gridMd = mapAspectRatioToGrid(aspectRatio);
  const gridHeight = ['map', 'chart'].includes(type) ? mapAspectRatioToHeight(aspectRatio) : undefined;
  const filteredPoiList = applyConditions(poiList, conditions, categories);
  const sortedPoiList = sortPois(filteredPoiList, sortings);
  const data = useMemo(() => [...sortedPoiList], [sortedPoiList]);

  const renderElement = () => {
    switch (type) {
      case 'map':
        return <StreetMap poiList={data} />;
      case 'list':
        return <CustomTable data={data} selectedFields={selectedFields} />;
      case 'chart':
        return <PieChart poiList={data} />;
      default:
        return null;
    }
  };

  return (
    <Grid item borderRadius={2} md={gridMd} xs={12}>
      <Box sx={{ position: 'relative', padding: 2 }} minHeight={gridHeight} height={gridHeight}>
        {renderElement()}
        {removeElement && (
          <IconButton
            color="error"
            sx={{ position: 'absolute', top: 8, right: 12, zIndex: 999 }}
            onClick={() => removeElement(element)}
          >
            <ClearIcon />
          </IconButton>
        )}
      </Box>
    </Grid>
  );
};
