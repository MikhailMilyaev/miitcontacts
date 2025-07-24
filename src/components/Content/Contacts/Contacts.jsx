import { useState, useEffect } from 'react';
// import { $host } from '../../../http/index';
import axios from 'axios';
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
    employee: null
  });

  const handleContextMenu = (e, employee) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      employee
    });
  };

  const handleAction = (action) => {
    console.log(`Действие: ${action} над элементом ${contextMenu.employee.contacts_id}`);
    setContextMenu(prev => ({ ...prev, visible: false }));
    
    if (action === 'assign') {
      console.log('http://localhost:8080/api/manager/assign?contactsId=' + contextMenu.employee.contacts_id +
                                  '&email=' + contextMenu.employee.email)
      const response = axios.post('http://localhost:8080/api/manager/assign?contactId=' + contextMenu.employee.contacts_id +
                                  '&email=' + contextMenu.employee.email)
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu(prev => ({ ...prev, visible: false }));
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (!department && employees.length === 0 && !loading && !error) {
    return <div className={classes.contacts}><FirstScreen /></div>;
  }

  if (loading) {
    return <div className={classes.contacts}><Loader /></div>;
  }

  if (error) {
    return <div className={classes.contacts}><FetchError /></div>;
  }
  console.log(employees)
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
        employees.map((emp) => (
          <Contact 
            key={emp.contacts_id}
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