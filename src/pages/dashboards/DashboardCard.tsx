import { CardContent, Typography, Card, CardActions, IconButton, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { RemoveDashboardAlert } from './RemoveDashboardAlert';
import { TCreationData } from '../../types/creationTypes';
import { useTranslation } from 'react-i18next';

type Props = {
  dashboardInfo: TCreationData;
  remove: (tile: string) => void;
};

export const DashboardCard = ({ dashboardInfo, remove }: Props) => {
  const { title, description } = dashboardInfo;
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setIsOpenDeleteAlert(true);
  };

  const navigate = useNavigate();
  const handleNav = (config: string) => {
    navigate(`/result/${config}`);
  };
  return (
    <Card
      sx={{
        bgcolor: 'common.white',
        width: 400,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <CardContent>
        <Typography variant="h6" textAlign="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          display="block"
          whiteSpace="pre-line"
          overflow="auto"
          maxHeight={170}
          sx={{ wordWrap: 'break-word' }}
        >
          {description}
        </Typography>
      </CardContent>
      <div>
        <Divider />
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => handleNav(title)}>{t('DASHBOARDS.VIEW')}</Button>
          <RemoveDashboardAlert
            open={isOpenDeleteAlert}
            setOpen={setIsOpenDeleteAlert}
            deleteConfig={() => remove(title)}
          />
          <IconButton onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
};
