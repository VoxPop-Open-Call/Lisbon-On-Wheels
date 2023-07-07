import { Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  deleteConfig: () => void;
};

export const RemoveDashboardAlert = ({ open, setOpen, deleteConfig }: Props) => {
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(false);
    deleteConfig();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="delete-alert-title">{t('DASHBOARDS.DELETE')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-alert-description"></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          {t('COMMON.BUTTONS.CANCEL')}
        </Button>
        <Button onClick={handleDelete} color="error">
          {t('COMMON.BUTTONS.DELETE')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
