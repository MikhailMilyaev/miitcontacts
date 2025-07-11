import classes from './EmptyDepartment.module.css'
import { MdPerson } from "react-icons/md";

const EmptyDepartment = () => {
  return (
    <div className={classes.container}>
        <MdPerson className={classes.icon}/>
        <p>В этом подразделении нет сотрудников.</p>
    </div>
  )
}

export default EmptyDepartment