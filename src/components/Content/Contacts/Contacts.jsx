import classes from './Contacts.module.css'
import Contact from '../Contact/Contact'
import FirstScreen from '../FirstScreen/FirstScreen'
import FetchError from '../FetchError/FetchError'
import Loader from '../Loader/Loader'
import EmptyDepartment from '../EmptyDepartment/EmptyDepartment'

const Contacts = ({ department, employees, loading, error }) => {
  if (!department) {
    return <div className={classes.contacts}><FirstScreen /></div>;
  }

  if (loading) {
    return <div className={classes.contacts}><Loader /></div>;
  }

  if (error) {
    return <div className={classes.contacts}><FetchError /></div>;
  }

  return (
    <div className={classes.contacts}>
      <div className={`${classes.row} ${classes.header}`}>
        <div>ФИО</div>
        <div>Мобильный телефон</div>
        <div>Внутренний номер</div>
        <div>Кабинет</div>
        <div>Почта</div>
        <div>Примечание</div>
      </div>

      {employees.length > 0 ? (
        employees.map((emp, index) => (
          <Contact key={index} employee={emp} />
        ))
      ) : (
        <EmptyDepartment />
      )}
    </div>
  );
};

export default Contacts;
