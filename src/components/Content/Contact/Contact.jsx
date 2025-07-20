import classes from './Contact.module.css'

const Contact = ({ employee }) => {
  return (
    <div className={classes.tableRow}>
      <div>{employee.full_name}</div>
      <div>{employee.personal_phone}</div>
      <div>{employee.business_phone}</div>
      <div>{employee.auditorium}</div>
      <div>{employee.email}</div>
      <div>{employee.info || '-'}</div>
    </div>
  )
}

export default Contact
