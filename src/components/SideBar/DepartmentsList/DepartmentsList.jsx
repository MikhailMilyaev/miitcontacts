import { useState, useEffect } from 'react';
import Department from './Department/Department';
import classes from './DepartmentsList.module.css';
import axios from 'axios';
import FetchError from '../../Content/FetchError/FetchError';
import Loader from '../../Content/Loader/Loader'

const DepartmentsList = ({ onSelect, selectedDepartment }) => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/department/departments')
      .then(response => {
        setDepartments(response.data);
        setError(false);
      })
      .catch(error => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <FetchError />;
  }

  return (
    <div className={classes.departmentList}>
      {departments.map((dep) => (
        <Department 
          key={dep.id} 
          name={dep.name} 
          onClick={() => onSelect(dep)} 
          isActive={selectedDepartment === dep.name}
        />
      ))}
    </div>
  );
}

export default DepartmentsList;
