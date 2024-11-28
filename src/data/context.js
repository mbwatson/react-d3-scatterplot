import {
  createContext,
  useContext,
  useState,
} from 'react';
import PropTypes from 'prop-types';

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

import data from './rsvnet_hospitalization.csv';
import columns from './rsvnet-hospitalization-columns.js';

const dataWithIDs = data.map(d => ({
  ...d,
  location: String(d.location).padStart(2, '0'),
  id: self.crypto.randomUUID(),
}));

const DataContext = createContext({ })
export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
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

  const filterCount = table.getAllLeafColumns()
    .filter(col => col.getIsFiltered()).length

  const graphData = table.getFilteredRowModel().rows
    .map(d => d.original);

  return (
    <DataContext.Provider value={{
      data: {
        graph: graphData,
        table,
        columnFilters, setColumnFilters,
        sorting, setSorting,
      },
      filterCount,
    }}>{ children }</DataContext.Provider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node,
  accessToken: PropTypes.string,
}
