// HeadPanel.js
import { useContext, useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import classes from './HeadPanel.module.css'
import { NavLink } from 'react-router-dom'
import { Context } from '../../../index'
import { observer } from 'mobx-react-lite'

const HeadPanel = observer(({ onSearch, onAddContact, department }) => {
  const { user } = useContext(Context)
  const [searchInput, setSearchInput] = useState('')

  const logOut = () => {
    localStorage.removeItem('user')
    user.setUser({})
    user.setIsAuth(false)
  }

  const handleSearchChange = (event) => {
    onSearch(event.target.value)
    setSearchInput(event.target.value)
  }

  const isAdmin = user.isAuth && user.user.role === 'ADMIN'
  const isManager = user.isAuth && user.user.role === 'MANAGER'
  const isManagerInOwnDepartment = isManager && department && department.id === user.user.department_id

  return (
    <div className={classes.headPanel}>
      <SearchBar value={searchInput} onChange={handleSearchChange} />

      {(isAdmin || isManagerInOwnDepartment) && (
        <button
          className={classes.addButton}
          onClick={onAddContact || (() => alert('Открыть форму добавления контакта'))}
        >
          Добавить
        </button>
      )}

      {user.isAuth ? (
        <NavLink to='/' className={classes.enterBtn} onClick={logOut}>
          Выход
        </NavLink>
      ) : (
        <NavLink to='/signin' className={classes.enterBtn}>
          Вход
        </NavLink>
      )}
    </div>
  )
})

export default HeadPanel
