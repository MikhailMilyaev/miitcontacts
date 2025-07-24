import HeadPanel from "./HeadPanel/HeadPanel"
import classes from './Content.module.css'
import Contacts from "./Contacts/Contacts"

const Content = ({ department, employees, loading, error, onSearch }) => {

  return (
    <div className={classes.content}>
        <HeadPanel onSearch={onSearch} department={department}/>
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