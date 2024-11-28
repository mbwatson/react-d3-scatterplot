import PropTypes from 'prop-types';

export const ClearFiltersButton = ({ table }) => {
  const noActiveFilters = !table.getAllLeafColumns()
    .some(col => col.getIsFiltered());

  return (
    <button
      key="clear-selections"
      onClick={ () => table.resetColumnFilters() }
      style={{ whiteSpace: 'nowrap' }}
      disabled={ noActiveFilters }
    >☒ Clear Filters</button>
  )
}

ClearFiltersButton.propTypes = {
  table: PropTypes.object.isRequired,
};
