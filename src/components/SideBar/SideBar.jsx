import DepartmentsList from './DepartmentsList/DepartmentsList'
import SidebarHeader from './SideBarHeader/SideBarHeader'
import classes from './SideBar.module.css'

const SideBar = ({ onSelectDepartment}) => {
  return (
    <div className={classes.sideBar}>
      <SidebarHeader />
      <DepartmentsList onSelect={onSelectDepartment} />
    </div>
  )
}

export default SideBar