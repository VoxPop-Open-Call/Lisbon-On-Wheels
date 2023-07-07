import { Grid, Typography } from '@mui/material';
import { useElementContext, usePoiContext } from '../../utils/contextHelper';
import { ElementRenderer } from '../elementRenderer/ElementRenderer';
import { TElement } from '../../types/elementTypes';
import { useTranslation } from 'react-i18next';

export const Preview = () => {
  const { untouchedPoiList } = usePoiContext();
  const { elements, setElements } = useElementContext();
  const { t } = useTranslation();

  const removeElement = (element: TElement) => {
    const elementsAfterRemove = elements.filter((el) => el !== element);
    setElements(elementsAfterRemove);
  };

  return (
    <Grid container sx={{ bgcolor: 'common.white', minHeight: 300, borderRadius: 4 }}>
      {elements?.length > 0 ? (
        elements?.map((element, i) => (
          <ElementRenderer key={i} element={element} removeElement={removeElement} poiList={untouchedPoiList} />
        ))
      ) : (
        <Grid item xs={12} p={2} display="flex" justifyContent="center" alignItems="center">
          <Typography fontSize={32} fontWeight={600} color="#525658">
            {t('PREVIEW.TRY_ADD')}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
