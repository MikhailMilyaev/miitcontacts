import HeadPanel from "./HeadPanel/HeadPanel"
import classes from './Content.module.css'
import Contacts from "./Contacts/Contacts"

const Content = ({ department, employees, loading, error }) => {

  return (
    <div className={classes.content}>
        <HeadPanel />
        <Contacts
          department={department}
          employees={employees}
          loading={loading}
          error={error}
      />
    </div>
  )
}

export default Content