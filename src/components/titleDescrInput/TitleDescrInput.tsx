import { FC, useContext, useState } from 'react';
import { FormControl, Stack, TextField } from '@mui/material';
import { CreationContext } from '../../context/CreationContext';
import { isTitleUnique } from '../../utils/creationUtils';

const TitleDescrInput: FC = () => {
  const { setTitle, setDescription, title, description } = useContext(CreationContext);
  const [isTitleEmpty, setIsTitleEmpty] = useState(title === '');
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(description === '');

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleEmpty(event.target.value === '');
  };
  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    setIsDescriptionEmpty(event.target.value === '');
  };

  const titleHelpertext = () => {
    if (isTitleEmpty) return 'Please provide a title.';
    if (!isTitleUnique(title)) return 'You already have a map with this title.';
    return '';
  };

  return (
    <FormControl sx={{ minWidth: '85%' }} variant="standard">
      <Stack direction="column" spacing={2}>
        <TextField
          onChange={onChangeTitle}
          value={title}
          fullWidth
          label="Title"
          required
          InputProps={{ sx: { borderRadius: 5, bgcolor: 'common.white' } }}
          InputLabelProps={{ sx: { color: 'common.black' } }}
          error={isTitleEmpty || !isTitleUnique(title)}
          helperText={titleHelpertext()}
        />
        <TextField
          onChange={onChangeDescription}
          value={description}
          fullWidth
          required
          label="Description"
          InputProps={{ sx: { borderRadius: 5, bgcolor: 'common.white' } }}
          InputLabelProps={{ sx: { color: 'common.black' } }}
          multiline
          rows={3}
          error={isDescriptionEmpty}
          helperText={isDescriptionEmpty ? 'Please provide a description.' : ''}
        />
      </Stack>
    </FormControl>
  );
};

export { TitleDescrInput };
