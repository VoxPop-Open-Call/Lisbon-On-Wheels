import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio as RadioButton,
  RadioGroup,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import { SelectLayout } from '..';
import { TAspectRatio } from '../../types/types';
import { aspectRatios } from '../../utils/helpers';
import { useCreationContext, useElementContext, usePoiContext } from '../../utils/contextHelper';
import { useTranslation } from 'react-i18next';

type TElement = 'map' | 'list' | 'chart';

export const ElementPicker = () => {
  const [selectedElement, setSelectedElement] = useState<TElement>('map');
  const [selectedLayout, setSelectedLayout] = useState<TAspectRatio>(aspectRatios[0]);
  const { t } = useTranslation();
  const { filters, categories } = useCreationContext();
  const { areFiltersApplied } = usePoiContext();
  const { setElements } = useElementContext();
  const handleElementChange = (e: SelectChangeEvent) => {
    setSelectedElement(e.target.value as TElement);
  };

  const onAdd = () => {
    const newElement = {
      type: selectedElement,
      aspectRatio: selectedLayout,
      filters: {
        filters: {
          conditions: areFiltersApplied ? filters.conditions : [],
          sortings: areFiltersApplied ? filters.sortings : [],
          selectedFields: filters.selectedFields
        },
        categories
      }
    };
    setElements((prevElements) => [...prevElements, newElement]);
  };

  const radio = <RadioButton sx={{ color: 'rgba(76,76,76,1)' }} />;
  return (
    <Box display="flex" alignItems="center" flexDirection="column" justifyContent="center">
      <FormControl sx={{ alignItems: 'center' }}>
        <RadioGroup value={selectedElement} onChange={handleElementChange} row>
          <FormControlLabel
            value="map"
            control={radio}
            label={<Typography fontWeight={600}>{t('ELEMENTS.MAP')}</Typography>}
          />
          <FormControlLabel
            value="list"
            control={radio}
            label={<Typography fontWeight={600}>{t('ELEMENTS.LIST')}</Typography>}
          />
          <FormControlLabel
            value="chart"
            control={radio}
            label={<Typography fontWeight={600}>{t('ELEMENTS.CHART')}</Typography>}
          />
        </RadioGroup>
      </FormControl>
      <SelectLayout selectedLayout={selectedLayout} setSelectedLayout={setSelectedLayout} />
      <Button variant="contained" sx={{ mt: 4 }} onClick={onAdd}>
        {t('ELEMENTS.ADD_ELEMENT')}
      </Button>
    </Box>
  );
};
