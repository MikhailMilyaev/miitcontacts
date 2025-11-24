import classes from './Department.module.css';
import { FaStar } from 'react-icons/fa';

const Department = ({ name, onClick, isActive, isManagerDepartment }) => {
  return (
    <div
      className={`${classes.department} ${isActive ? classes.active : ''}`}
      onClick={onClick}
    >
      <span>{name}</span>
      {isManagerDepartment && <FaStar className={classes.star} />}
    </div>
  );
};

export default Department;
