import classes from './FetchError.module.css'
import { MdError } from "react-icons/md";

const FetchError = () => {
  return (
    <div className={classes.container}>
        <MdError className={classes.icon}/>
        <p className={classes.errorText}>Произошла ошибка на сервере, попробуйте позже.</p>
    </div>
  )
}

export default FetchError