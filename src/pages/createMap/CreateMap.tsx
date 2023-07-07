import { FC } from 'react';
import { Box, Divider, Stack } from '@mui/material';
import { CategorySelector, TitleDescrInput } from '../../components';
import { TableSection } from '../../components/table/TableSection';
import { ElementPicker } from '../../components/elementPicker/ElementPicker';
import { Preview } from '../../components/preview/Preview';
import { Title } from '../../components/shared/title/Title';
import { CreationButton } from './CreationButton';
import { useTranslation } from 'react-i18next';

const CreateMap: FC = () => {
  const { t } = useTranslation();

  return (
    <Stack spacing={2} display="flex" py={2} flexDirection="column" alignItems="center">
      <Title stepNumber={1} title={t('CREATE_PAGE.TITLE_AND_DESCR')} />
      <TitleDescrInput />
      <Title stepNumber={2} title={t('CREATE_PAGE.CATEGORIES')} />
      <CategorySelector />
      <Title stepNumber={3} title={t('CREATE_PAGE.DATA')} />
      <TableSection />
      <Divider variant="middle" orientation="horizontal" />
      <Title stepNumber={4} title={t('CREATE_PAGE.DASHBOARD')} />
      <ElementPicker />
      <Box width="100vw" p={4}>
        <Preview />
      </Box>
      <CreationButton />
    </Stack>
  );
};

export { CreateMap };
