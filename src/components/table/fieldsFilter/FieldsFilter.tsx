import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  SelectChangeEvent,
  Checkbox,
  Theme,
  SxProps,
  Button,
  Box
} from '@mui/material';
import { TPOI } from '../../../types/types';
import { useCreationContext } from '../../../utils/contextHelper';
import { POIProperties, POIPropertyName } from '../../../utils/poiUtils';
import { useTranslation } from 'react-i18next';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 9 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const fields = POIProperties;

type Props = {
  sx?: SxProps<Theme> | undefined;
};

export const FieldsFilter = ({ sx }: Props) => {
  const { filters, dispatch } = useCreationContext();
  const { selectedFields } = filters;
  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent<typeof selectedFields>) => {
    const { value } = event.target;
    dispatch({
      type: 'SET_SELECTED_FIELDS',
      payload: typeof value === 'string' ? (value.split(',') as (keyof TPOI)[]) : value
    });
  };

  const setAll = () => {
    dispatch({
      type: 'SET_SELECTED_FIELDS',
      payload: selectedFields.length === fields.length ? [] : fields
    });
  };

  return (
    <Box>
      <FormControl sx={{ width: 300, mr: 1, ...sx }}>
        <InputLabel id="selected-fields-label" sx={{ color: 'primary.main' }}>
          {t('FILTERS.SELECT_FIELDS')}
        </InputLabel>
        <Select
          labelId="selected-fields-label"
          id="selected-fields"
          size="small"
          multiple
          value={selectedFields}
          onChange={handleChange}
          input={<OutlinedInput label={t('FILTERS.SELECT_FIELDS')} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {fields.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedFields.indexOf(name) > -1} />
              <ListItemText primary={POIPropertyName[name]} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={setAll}>
        {selectedFields.length === fields.length ? t('CATEGORIES.CLEAR_ALL') : t('CATEGORIES.SELECT_ALL')}
      </Button>
    </Box>
  );
};
