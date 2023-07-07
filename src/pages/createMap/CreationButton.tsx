import { useCreationData } from '../../hooks/useCreationData';
import { useNavigate } from 'react-router';
import { isTitleUnique, saveMapConfig } from '../../utils/creationUtils';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const CreationButton = () => {
  const creationData = useCreationData();
  const { t } = useTranslation();
  const { description, title, elements } = creationData;
  const navigate = useNavigate();
  const canCreate = description && title && isTitleUnique(title) && elements.length > 0;
  const onCreate = () => {
    if (canCreate) {
      saveMapConfig(creationData);
      navigate(`result/${title}`);
    }
  };
  return (
    <Button
      variant="contained"
      disabled={!canCreate}
      sx={{ mt: 6, alignSelf: 'center' }}
      size="large"
      onClick={onCreate}
    >
      {t('COMMON.BUTTONS.CREATE')}
    </Button>
  );
};
