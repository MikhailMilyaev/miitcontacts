import { useContext, useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import classes from './HeadPanel.module.css'
import { NavLink } from 'react-router-dom'
import {Context} from '../../../index'
import {observer} from 'mobx-react-lite'

const HeadPanel = observer(({onSearch}) => {
  const {user} = useContext(Context)
  const [searchInput, setSearchInput] = useState('')

  const logOut = () => {
      localStorage.removeItem('token')
      user.setUser({})
      user.setIsAuth(false)
  }

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value)  
  }
  
  return (
    <div className={classes.headPanel}>
      <SearchBar value={searchInput} onChange={handleSearchChange} onSearch={onSearch}/>
      {user.isAuth ? 
      <NavLink to='/' className={classes.enterBtn} onClick={logOut}>Выход</NavLink>
      :
      <NavLink to='/signin' className={classes.enterBtn}>Вход</NavLink>
      }
    </div>
  )
})

export default HeadPanel