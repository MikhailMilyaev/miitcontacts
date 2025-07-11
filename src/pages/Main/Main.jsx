import SideBar from '../../components/SideBar/SideBar'
import Content from '../../components/Content/Content'
import classes from './Main.module.css'
import { useState } from 'react'
import axios from 'axios'

const Layout = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const fetchEmployees = async (departmentName) => {
    setSelectedDepartment(departmentName);
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get('', {
        params: { department: departmentName },
      });
      setEmployees(response.data);
    } catch (err) {
      setError(true);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.main}>
        <SideBar onSelectDepartment={fetchEmployees}/>
        <Content
          department={selectedDepartment}
          employees={employees}
          loading={loading}
          error={error}
      />
    </div>
  )
}

export default Layout