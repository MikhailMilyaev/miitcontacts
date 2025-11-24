import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import classes from './Contacts.module.css';
import Contact from '../Contact/Contact';
import FirstScreen from '../FirstScreen/FirstScreen';
import FetchError from '../FetchError/FetchError';
import Loader from '../Loader/Loader';
import { FaStar, FaPen, FaTrashAlt } from 'react-icons/fa';
import EmptyDepartment from '../EmptyDepartment/EmptyDepartment';
import { Context } from '../../../index';

const Contacts = ({ department, employees, loading, error }) => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    employee: null
  });

  const [editContactId, setEditContactId] = useState(null);
  const [editedContact, setEditedContact] = useState({});

  const { user } = useContext(Context);

  const canEdit = user.isAuth && (
    user.user.role === 'ADMIN' || 
    (user.user.role === 'MANAGER' && user.user.department_id === department?.id)
  );

  const handleContextMenu = (e, employee) => {
    e.preventDefault();
    if (!canEdit || employee.email === user.user.email) return; 
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      employee
    });
  };

  const handleAction = async (action) => {
    const contact = contextMenu.employee;

    if (action === 'assign') {
      try {
        await axios.post(`http://localhost:8080/api/manager/assign`, null, {
          params: {
            contactId: contact.contacts_id,
            email: contact.email
          }
        });
        alert('Ссылка для назначения отправлена на почту');
      } catch (error) {
        alert('Ошибка при назначении менеджера');
      }
    }

    if (action === 'edit') {
      setEditContactId(contact.contacts_id);
      setEditedContact({ ...contact });
    }

    if (action === 'delete') {
      const confirmed = window.confirm('Вы уверены, что хотите удалить контакт?');
      if (confirmed) {
        try {
          await axios.delete(`http://localhost:8080/api/contact/${contact.contacts_id}`);
          alert('Контакт удалён');
        } catch (err) {
          alert('Ошибка при удалении контакта');
        }
      }
    }

    setContextMenu(prev => ({ ...prev, visible: false }));
  };

  const handleCancelEdit = () => {
    setEditContactId(null);
    setEditedContact({});
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:8080/api/contact/${editContactId}`, editedContact);
      alert('Контакт обновлён');
      setEditContactId(null);
      setEditedContact({});
    } catch (err) {
      alert('Ошибка при обновлении контакта');
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu(prev => ({ ...prev, visible: false }));
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
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

  return (
    <div className={classes.contacts}>
      {editContactId && (
        <div className={classes.editPanel}>
          <button onClick={handleSaveEdit} className={classes.saveBtn}>Сохранить</button>
          <button onClick={handleCancelEdit} className={classes.cancelBtn}>Отмена</button>
        </div>
      )}

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
          emp.contacts_id === editContactId ? (
            <div key={emp.contacts_id} className={classes.tableRow}>
              <input value={editedContact.full_name || ''} onChange={(e) => setEditedContact({...editedContact, full_name: e.target.value})} />
              <input value={editedContact.personal_phone || ''} onChange={(e) => setEditedContact({...editedContact, personal_phone: e.target.value})} />
              <input value={editedContact.business_phone || ''} onChange={(e) => setEditedContact({...editedContact, business_phone: e.target.value})} />
              <input value={editedContact.auditorium || ''} onChange={(e) => setEditedContact({...editedContact, auditorium: e.target.value})} />
              <input value={editedContact.email || ''} onChange={(e) => setEditedContact({...editedContact, email: e.target.value})} />
              <input value={editedContact.info || ''} onChange={(e) => setEditedContact({...editedContact, info: e.target.value})} />
            </div>
          ) : (
            <Contact 
              key={emp.contacts_id}
              employee={emp} 
              onContextMenu={(e) => handleContextMenu(e, emp)}
            />
          )
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
          {user.user.role === 'ADMIN' && (
            <div className={classes.menuItem} onClick={() => handleAction('assign')}>
              <FaStar className={classes.iconStar} />
              <span>Назначить</span>
            </div>
          )}

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