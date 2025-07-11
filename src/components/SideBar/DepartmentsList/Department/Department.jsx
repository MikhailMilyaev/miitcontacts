import classes from './Department.module.css'

const Department = ({ name }) => {
  return (
    <div className={classes.department}>{name}</div>
  )
}

export default Department