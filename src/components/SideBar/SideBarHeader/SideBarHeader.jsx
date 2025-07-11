import { IoMenu } from "react-icons/io5";
import classes from './SideBarHeader.module.css'

const SideBarHeader = () => {
  return (
    <div className={classes.header}>
      <IoMenu className={classes.menu}/>
      <span className={classes.text}>Контакты ИУЦТ</span>
    </div>
  )
}

export default SideBarHeader