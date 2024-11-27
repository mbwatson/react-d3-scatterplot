import PropTypes from 'prop-types';
import classes from './data-table.module.css';

const FirstIcon = '⟪';
const PreviousIcon = '⟨';
const NextIcon = '⟩';
const LastIcon = '⟫';

export const Pagination = ({ table }) => {
  const handleChangePageSize = event => {
    table.setPageSize(event.target.value);
  };

  return (
    <div className={ classes.pagination }>
      {/* current page & total pages */}
      <div className="page-select">
        <div style={{ whiteSpace: 'nowrap' }} htmlFor="current-page">
          Page{' '}
          <input
            id="current-page"
            type="number"
            min="1"
            max={ table.getPageCount() }
            value={ table.getState().pagination.pageIndex + 1 }
            onChange={ e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            } }
          />
          {' '}of { table.getPageCount() }
        </div>
      </div>

      {/* page navigation buttons */}
      <div className={ classes.paginationButtons }>
        <button
          onClick={ () => table.firstPage() }
          disabled={ !table.getCanPreviousPage() }
          aria-label="Go to first page"
        >{ FirstIcon }</button>
        <button
          onClick={ () => table.previousPage() }
          disabled={ !table.getCanPreviousPage() }
          aria-label="Go to previous page"
        >{ PreviousIcon }</button>
        <button
          onClick={ () => table.nextPage() }
          disabled={ !table.getCanNextPage() }
          aria-label="Go to next page"
        >{ NextIcon }</button>
        <button
          onClick={ () => table.lastPage() }
          disabled={ !table.getCanNextPage() }
          aria-label="Go to last page"
        >{ LastIcon }</button>
      </div>

      {/* page size select */}
      <select
        value={ table.getState().pagination.pageSize }
        onChange={ handleChangePageSize }
        aria-label="Page size select"
      >
        {[10, 25, 50, 100].map(size => (
          <option
            key={ size }
            value={ size }
          >{ size } / page</option>
        ))}
      </select>
    </div>
  );
};

Pagination.propTypes = {
  table: PropTypes.object.isRequired,
};
