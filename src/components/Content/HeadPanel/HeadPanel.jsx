import { useState } from 'react'
import SearchBar from './SearchBar/SearchBar'
import classes from './HeadPanel.module.css'
import { Link } from 'react-router-dom'

const HeadPanel = ({onSearch}) => {
  const [searchInput, setSearchInput] = useState('')

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value)  
  }
  
  return (
    <div className={classes.headPanel}>
      <SearchBar value={searchInput} onChange={handleSearchChange} onSearch={onSearch}/>
      <Link to='/signin' className={classes.enterBtn}>Вход</Link>
    </div>
  )
}

export default HeadPanel