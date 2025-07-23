import classes from './Contact.module.css';

const Contact = ({ employee, onContextMenu }) => {
  return (
    <div 
      className={classes.tableRow}
      onContextMenu={(e) => onContextMenu(e, employee.id)}
    >
      <div>{employee.full_name}</div>
      <div>{employee.personal_phone}</div>
      <div>{employee.business_phone}</div>
      <div>{employee.auditorium}</div>
      <div>{employee.email}</div>
      <div>{employee.info || '-'}</div>
    </div>
  );
};

export default Contact;