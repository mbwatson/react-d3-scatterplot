import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('location', {
    cell: info => info.getValue(),
    header: 'Location',
    footer: 'Location',
    meta: { filterVariant: 'select' },
  }),
  columnHelper.accessor('date', {
    cell: info => info.getValue(),
    header: 'Date',
    footer: 'Date',
    meta: { filterVariant: 'text' },
  }),
  columnHelper.accessor('age_group', {
    cell: info => info.getValue(),
    header: 'Age Group',
    footer: 'Age Group',
    meta: { filterVariant: 'select' },
  }),
  columnHelper.accessor('target', {
    cell: info => info.getValue(),
    header: 'Target',
    footer: 'Target',
    meta: { filterVariant: 'select' },
  }),
  columnHelper.accessor('value', {
    cell: info => info.getValue(),
    header: 'Value',
    footer: 'Value',
    meta: { filterVariant: 'range' },
  }),
  columnHelper.accessor('population', {
    cell: info => info.getValue(),
    header: 'Population',
    footer: 'Population',
    meta: { filterVariant: 'range' },
  }),
];

export default columns;
