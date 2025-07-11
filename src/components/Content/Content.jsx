import HeadPanel from "./HeadPanel/HeadPanel"
import classes from './Content.module.css'
import Contacts from "./Contacts/Contacts"

const Content = () => {
  return (
    <div className={classes.content}>
        <HeadPanel />
        <Contacts />
    </div>
  )
}

export default Content