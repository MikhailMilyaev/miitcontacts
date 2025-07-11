import classes from './Contact.module.css'

const Contact = ({ employee }) => {
  return (
    <div className={classes.tableRow}>
      <div>{employee.name}</div>
      <div>{employee.mobile}</div>
      <div>{employee.internal}</div>
      <div>{employee.room}</div>
      <div>{employee.email}</div>
      <div>{employee.note || '-'}</div>
    </div>
  )
}

export default Contact