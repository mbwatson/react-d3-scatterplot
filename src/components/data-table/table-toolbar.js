import PropTypes from 'prop-types';
import classes from './data-table.module.css';

export const TableToolbar = ({ children }) => {
  return (
    <div className={ classes.toolbar }>
      { children }
    </div>
  )
};

TableToolbar.propTypes = {
  children: PropTypes.node,
};
