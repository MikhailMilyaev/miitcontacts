import SideBar from '../../components/SideBar/SideBar'
import Content from '../../components/Content/Content'
import classes from './Main.module.css'

const Layout = () => {
  return (
    <div className={classes.main}>
        <SideBar />
        <Content />
    </div>
  )
}

export default Layout