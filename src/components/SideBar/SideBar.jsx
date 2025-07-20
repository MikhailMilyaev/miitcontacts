import DepartmentsList from './DepartmentsList/DepartmentsList'
import SidebarHeader from './SideBarHeader/SideBarHeader'
import classes from './SideBar.module.css'

const SideBar = ({ onSelectDepartment, selectedDepartment }) => {
  return (
    <div className={classes.sideBar}>
      <SidebarHeader />
      <DepartmentsList onSelect={onSelectDepartment} selectedDepartment={selectedDepartment}/>
    </div>
  )
}

export default SideBar