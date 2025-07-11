import classes from './FirstScreen.module.css'
import { IoPersonCircle } from "react-icons/io5";

const FirstScreen = () => {
  return (
    <div className={classes.container}>
        <IoPersonCircle className={classes.icon}/>
        <h2>Контакты МИИТ</h2>
        <p>Выберите подразделение или найдите сотрудника в поиске.</p>
    </div>
  )
}

export default FirstScreen