import DepartmentsList from './DepartmentsList/DepartmentsList'
import SidebarHeader from './SideBarHeader/SideBarHeader'
import classes from './SideBar.module.css'

const SideBar = () => {
  return (
    <div className={classes.sideBar}>
      <SidebarHeader />
      <DepartmentsList />
    </div>
  )
}

export default SideBar