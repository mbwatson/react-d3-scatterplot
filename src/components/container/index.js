import PropTypes from 'prop-types';
import classes from './container.module.css';

export const Container = ({ children }) => {
  return (
    <div className={ classes.container }>
      { children }
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
};
