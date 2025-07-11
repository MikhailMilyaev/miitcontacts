import Department from './Department/Department'
import classes from './DepartmentsList.module.css'

const DepartmentsList = ({ onSelect, selectedDepartment }) => {
  const departments = [
    'Учебный отдел',
    'Отдел информатизации',
    'Кафедра математики',
    'Библиотека',
    'Методический кабинет',
    'Центр молодежи',
    'Отдел кадров',
    'Бухгалтерия',
    'Администрация',
    'Приёмная комиссия',
];

  return (
    <div className={classes.departmentList}>
      {departments.map((name, index) => (
        <Department 
          key={index} 
          name={name} 
          onClick={() => onSelect(name)}
          isActive={selectedDepartment === name} />
      ))}
    </div>
  );
}

export default DepartmentsList