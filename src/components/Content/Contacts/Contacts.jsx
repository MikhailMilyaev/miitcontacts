import { useState } from 'react';
import classes from './Contacts.module.css';
import Contact from '../Contact/Contact';
import FirstScreen from '../FirstScreen/FirstScreen';
import FetchError from '../FetchError/FetchError';
import Loader from '../Loader/Loader';
import { FaStar, FaPen, FaTrashAlt } from 'react-icons/fa';
import EmptyDepartment from '../EmptyDepartment/EmptyDepartment';

const Contacts = ({ department, employees, loading, error }) => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    employeeId: null
  });

  const handleContextMenu = (e, employeeId) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      employeeId
    });
  };

  const handleAction = (action) => {
    console.log(`Действие: ${action} над элементом ${contextMenu.employeeId}`);
    setContextMenu(prev => ({ ...prev, visible: false }));
    // Реализуйте вашу логику здесь
  };

  if (!department && employees.length === 0 && !loading && !error) {
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
          <Contact 
            // key={emp.id}
            key={index} 
            employee={emp} 
            onContextMenu={handleContextMenu}
          />
        ))
      ) : (
        <EmptyDepartment />
      )}

      {contextMenu.visible && (
        <div 
          className={classes.contextMenu}
          style={{
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
          }}
        >
          <div className={classes.menuItem} onClick={() => handleAction('assign')}>
            <FaStar className={classes.iconStar} />
            <span>Назначить</span>
          </div>
          <div className={classes.menuItem} onClick={() => handleAction('edit')}>
            <FaPen className={classes.iconPen} />
            <span>Изменить</span>
          </div>
          <div className={classes.menuItem} onClick={() => handleAction('delete')}>
            <FaTrashAlt className={classes.iconTrash} />
            <span>Удалить</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;