import classes from './Loader.module.css'
import { FiLoader } from "react-icons/fi";

const Loader = () => {
  return (
    <div className={classes.container}>
        <FiLoader className={classes.loader}/>
    </div>
  )
}

export default Loader