import React, { FC, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  Paper
} from '@mui/material';
import { Column, useTable } from 'react-table';
import { TableInfo } from '../tableInfo/TableInfo';
import { TPOI } from '../../../types/types';
import { POIPropertyName } from '../../../utils/poiUtils';

type Props = {
  data: TPOI[];
  selectedFields: (keyof TPOI)[];
};

export const CustomTable: FC<Props> = ({ data, selectedFields }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns: Array<Column> = React.useMemo(() => {
    const defaultColumns = [
      {
        Header: '#',
        accessor: 'index'
      }
    ];

    const selectedColumns = selectedFields.map((field) => ({
      Header: POIPropertyName[field],
      accessor: field,
      Cell: ({ value }: { value: string | number | boolean | object }) => {
        if (field === 'location') {
          const location = value as {
            latitude: number;
            longitude: number;
          };
          return `${location.latitude}, ${location.longitude} `;
        } else return String(value);
      }
    }));

    const allColumns = [...defaultColumns, ...selectedColumns];

    return selectedFields.length > 0 ? allColumns : defaultColumns;
  }, [selectedFields]);

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: data.map((poi, index) => ({ index: index + 1, ...poi }))
  });

  return (
    <Paper sx={{ p: 2 }}>
      <TableInfo amountOfResults={data.length} amountOfColumns={selectedFields.length + 1} />
      <TableContainer sx={{ maxHeight: 440, maxWidth: '96vw' }}>
        <Table {...getTableProps()} sx={{ border: '1px solid #E6E8E8' }}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ backgroundColor: '#525658' }}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps()}
                    style={{ color: '#FFFFFF' }}
                    sx={{
                      whiteSpace: 'nowrap',
                      border: '1px solid #E6E8E8',
                      padding: '12px'
                    }}
                  >
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  {row.cells.map((cell) => (
                    <TableCell
                      {...cell.getCellProps()}
                      sx={{
                        whiteSpace: 'nowrap',
                        border: '1px solid #E6E8E8'
                      }}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
