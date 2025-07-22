import SideBar from '../../components/SideBar/SideBar'
import SearchBar from '../../components/Content/HeadPanel/SearchBar/SearchBar'
import Content from '../../components/Content/Content'
import classes from './Main.module.css'
import { useState } from 'react'
import axios from 'axios'

const Layout = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const fetchEmployees = async (department) => {
    setSelectedDepartment(department.name);
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get('http://localhost:8080/api/department', {
        params: { department_id: department.id }
      });
      console.log(response.data);
      setEmployees(response.data);
    } catch (err) {
      setError(true);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSelectedDepartment(null);  // Сбрасываем выбранный департамент
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`http://localhost:8080/api/search?query=${query}`);
      setEmployees(response.data);  // Обновляем сотрудников
    } catch (err) {
      setError(true);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.main}>
        <SideBar 
          onSelectDepartment={fetchEmployees}
          selectedDepartment={selectedDepartment}/>
        <Content
          onSearch={handleSearch}
          department={selectedDepartment}
          employees={employees}
          loading={loading}
          error={error}
      />
    </div>
  )
}

export default Layout