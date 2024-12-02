import PropTypes from 'prop-types';
import { useData } from "@data";

export const ClearFiltersButton = ({ table }) => {
  const { filterCount } = useData();
  const noActiveFilters = !table.getAllLeafColumns()
    .some(col => col.getIsFiltered());

  return (
    <button
      key="clear-selections"
      onClick={ () => table.resetColumnFilters() }
      style={{ whiteSpace: 'nowrap' }}
      disabled={ noActiveFilters }
    >☒ Clear Filters { filterCount > 0 ? `(${ filterCount })` : `` }</button>
  )
}

ClearFiltersButton.propTypes = {
  table: PropTypes.object.isRequired,
};
