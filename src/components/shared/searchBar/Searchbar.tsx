import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchBarProps = {
  search: string;
  onSearch: (searchValue: string) => void;
  placeholder?: string;
};

export const SearchBar = ({ search, onSearch, placeholder }: SearchBarProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      bgcolor="common.white"
      borderRadius={2}
      p={1}
      sx={{ minWidth: { sm: 500, xs: 400 } }}
    >
      <SearchIcon />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        value={search}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
    </Box>
  );
};
