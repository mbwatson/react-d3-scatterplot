import PropTypes from 'prop-types';

export const RowCount = ({ table }) => {
  return (
    <span>
      { table.getFilteredRowModel().rows.length } rows
    </span>
  );
};

RowCount.propTypes = {
  table: PropTypes.object.isRequired,
};
