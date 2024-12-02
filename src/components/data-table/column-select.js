import { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './data-table.module.css';

export const ColumnsSelect = ({ table }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={ classes.columnsSelect }>
      <button onClick={ () => setOpen(!open) }>||| Columns { open ? '🡡' : '🡣'}</button>
      {
        open && (
          <div className={ classes.tempPopover }>
            <ColumnsList columns={ table.getAllColumns() } />
          </div>
        )
      }
    </div>
  );
};

/*
    awaiting the popover and anchor features to come to Firefox
    <div className={ classes.columnsSelect }>
      <button popovertarget="col-select-popover">||| Columns 🡣</button>
      <dialog id="col-select-popover" popover="true">
        <ColumnsList columns={ table.getAllColumns() } />
      </dialog>
    </div>

*/

ColumnsSelect.propTypes = {
  table: PropTypes.object.isRequired,
};

const ColumnsList = ({ columns }) => {
  return (
    <ul aria-labelledby="column-select" className={ classes.list }>
      {
        columns.map(column => {
          const checked = column.getIsVisible();
          return (
            <li key={ `${ column.id }-select` }>
              <label>
                <input
                  type="checkbox"
                  checked={ checked }
                  onChange={ column.getToggleVisibilityHandler() }
                /> { column.id }
              </label>
            </li>
          )
        })
      }
    </ul>
  );
};

ColumnsList.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};
