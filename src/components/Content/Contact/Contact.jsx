import classes from './Contact.module.css'

const Contact = ({ employee }) => {
  return (
    <div className={classes.tableRow}>
      <div>{employee.fullName}</div>
      <div>{employee.personalPhone}</div>
      <div>{employee.businessPhone}</div>
      <div>{employee.auditorium}</div>
      <div>{employee.email}</div>
      <div>{employee.info || '-'}</div>
    </div>
  )
}

export default Contact
