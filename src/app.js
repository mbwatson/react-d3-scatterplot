import { Fragment, useState } from 'react';
import { Container } from './components/container';
import { Scatterplot } from './components/scatterplot';
import { DataTable, Pagination, TableToolbar } from './components/data-table';
import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import data from './data/rsvnet_hospitalization.csv';
import columns from './data/rsvnet-hospitalization-columns.js';


const dataWithIDs = data.map(d => ({ ...d, id: self.crypto.randomUUID() }));

export const App = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])

  const table = useReactTable({
    data: dataWithIDs,
    columns: columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    state: {
      columnFilters,
      pagination,
      sorting,
    },
  })
  
  const graphData = table.getFilteredRowModel().rows.map(d => d.original);

  return (
    <Fragment>
      <Container>
        <Scatterplot
          data={ graphData }
          width={ 1000 }
          height={ 600 }
        />
      </Container>

      <Container>
        <TableToolbar>
          <span>{ graphData.length } rows</span>
          <span>&#47;&#47;</span> 
          <Pagination table={ table } />
        </TableToolbar>

        <DataTable table={ table } />
        
        <TableToolbar>
          <Pagination table={ table } />
        </TableToolbar>
      </Container>
    </Fragment>
  );
};
