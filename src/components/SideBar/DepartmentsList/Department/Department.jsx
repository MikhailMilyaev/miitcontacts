import classes from './Department.module.css'

const Department = ({ name, onClick, isActive }) => {
  return (
    <div
      className={`${classes.department} ${isActive ? classes.active : ''}`}
      onClick={onClick}
    >
      {name}
    </div>
  )
}

export default Department