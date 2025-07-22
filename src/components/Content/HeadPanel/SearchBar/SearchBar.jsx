import { IoSearchOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import classes from './SearchBar.module.css'
import { useState } from "react";

const SearchBar = ({ value, onChange, onSearch }) => {
  const [isFocus, setIsFocus] = useState(false)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(value);
      onChange({target:{value: ''}})
    }
  }

  // const search = async (e) => {
  //   try {

  //     const response = (await axios.get('http://localhost:8080/api/search?query=' + e));
  //     console.log(response.data)

  //   } finally {
  //     console.log('here!')
  //   }
  // }

  return (
    <div className={classes.inputContainer}>
      <IoSearchOutline className={classes.searchIcon} style={{color: isFocus && 'black'}}/>
      <input 
        type='text'
        className={classes.input}
        placeholder='Поиск по ФИО или номеру кабинета'
        value={value} 
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        />
        {value && 
          <IoCloseOutline 
          className={classes.clearIcon} 
          style={{color: isFocus && 'black'}} 
          onClick={() => onChange({ target: { value: '' }})}/>}
    </div>
    
  )
}

export default SearchBar;