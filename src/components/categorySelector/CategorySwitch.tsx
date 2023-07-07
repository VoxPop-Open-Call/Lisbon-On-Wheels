import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Switch } from '@mui/material';
import { TCategory } from '../../types/types';
import { useCreationContext } from '../../utils/contextHelper';

type Props = {
  category: TCategory;
};

export const CategorySwitch: FC<Props> = ({ category }) => {
  const { categories: selectedCategories, setCategories: setSelectedCategories } = useCreationContext();
  const [selected, setSelected] = useState(selectedCategories?.includes(category));

  useEffect(() => {
    setSelected(selectedCategories?.includes(category));
  }, [selectedCategories, category]);

  const onChange = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setSelected(checked);
    const updatedCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter((categoryInState) => categoryInState !== category);

    setSelectedCategories(updatedCategories);
  };

  return <Switch checked={selected} onChange={onChange} />;
};
