import { Children } from 'react';
import PropTypes from 'prop-types';
import classes from './data-table.module.css';

const Divider = () => <span>⋮⋮⋮</span>;

export const TableToolbar = ({ children }) => {
  const toolbarItems = Children.toArray(children);
  // every other element resulting from this
  // should be a divider, sans the last one.
  const dividedToolbarItems = toolbarItems
    .reduce((acc, item, i) => {
      acc.push(item);
      if (i + 1 < toolbarItems.length) {
        acc.push(<Divider key={ `div-${ i }` }/>)
      }
      return acc;
    }, []);

  return (
    <div className={ classes.toolbar }>
      { dividedToolbarItems }
    </div>
  )
};

TableToolbar.propTypes = {
  children: PropTypes.node,
};
