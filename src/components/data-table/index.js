import PropTypes from 'prop-types';
import { flexRender } from '@tanstack/react-table';
import { ColumnFilter } from './column-filter.js';
import classes from './data-table.module.css';

export const DataTable = ({ table, style = {} }) => {
  return (
    <table className={ classes.dataTable } style={ style }>
      <thead>
        { table.getHeaderGroups().map(headerGroup => (
          <tr key={ headerGroup.id }>
            { headerGroup.headers.map(header => (
              <th
                key={ header.id }
                colSpan={header.colSpan}
                style={{ maxWidth: `${ header.getSize() }px` }}
              >
                { header.isPlaceholder ? null : (
                  <span className="sortable" { ...{
                    onClick: header.column.getToggleSortingHandler(),
                  } }>
                    { flexRender(header.column.columnDef.header, header.getContext()) }
                    {{ asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted()] ?? null }
                  </span>
                ) }
                { header.column.getCanFilter() ? (
                  <div className="filter">
                    <ColumnFilter column={ header.column } />
                  </div>
                ) : null }
              </th>
            )) }
          </tr>
        )) }
      </thead>

      <tbody>
        { table.getRowModel().rows.map(row => (
          <tr key={ row.id }>
            { row.getVisibleCells().map(cell => {
              return (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              )}) }
          </tr>
        )) }
      </tbody>
      
      <tfoot>
        { table.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id}>
            { footerGroup.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan}>
                { header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                ) }
              </th>
            )) }
          </tr>
        )) }
      </tfoot>          
    </table>
  );
};

DataTable.propTypes = {
  style: PropTypes.object,
  table: PropTypes.object.isRequired,
};

export * from './clear-filters-button';
export * from './pagination';
export * from './row-count';
export * from './table-toolbar';
