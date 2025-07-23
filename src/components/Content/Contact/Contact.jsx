import classes from './Contact.module.css';

const Contact = ({ employee, onContextMenu, key}) => {
  return (
    <div 
      className={classes.tableRow}
      onContextMenu={(e) => onContextMenu(e, key)}
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