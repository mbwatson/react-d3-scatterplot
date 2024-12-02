import PropTypes from 'prop-types';
import classes from './container.module.css';

export const Container = ({ children, flexDirection = 'column' }) => {
  const containerClasses = [classes.container, classes[flexDirection]].join(' ');
  
  return (
    <div className={ containerClasses }>
      { children }
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  flexDirection: PropTypes.oneOf(['row', 'column']),
};
