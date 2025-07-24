import SideBar from '../../components/SideBar/SideBar'
import Content from '../../components/Content/Content'
import classes from './Main.module.css'
import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Context } from '../../index'

const Main = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  const { user } = useContext(Context)

  const isAdmin = user.isAuth && user.user.role === 'ADMIN'
  const isManager = user.isAuth && user.user.role === 'MANAGER'
  const managerDepartmentId = user.user.department_id

const fetchEmployees = async (department) => {
  setSelectedDepartment(department)
  setLoading(true)
  setError(false)
  try {
    const response = await axios.get('http://localhost:8080/api/department', {
      params: { department_id: department.id },
    })
    setEmployees(response.data)
  } catch (err) {
    setError(true)
    setEmployees([])
  } finally {
    setLoading(false)
  }
}

  const handleSearch = async (query) => {
    setSelectedDepartment(null)
    setLoading(true)
    setError(false)
    try {
      const response = await axios.get(`http://localhost:8080/api/search?query=${query}`)
      setEmployees(response.data)
    } catch (err) {
      setError(true)
      setEmployees([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddContact = () => {
    if (!selectedDepartment) {
      alert('Сначала выберите подразделение')
      return
    }
    if (isManager && selectedDepartment.id !== managerDepartmentId) {
      alert('Вы можете добавлять контакты только в своём подразделении')
      return
    }
    setShowAddForm(true)
  }

  return (
    <div className={classes.main}>
      <SideBar
        onSelectDepartment={fetchEmployees}
        selectedDepartment={selectedDepartment}
      />
      <Content
        onSearch={handleSearch}
        onAddContact={handleAddContact} // ✅ передаём функцию для кнопки "Добавить"
        department={selectedDepartment}
        employees={employees}
        loading={loading}
        error={error}
      />

      {showAddForm && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            <h3>Добавить контакт</h3>
            {/* тут будет форма добавления */}
            <button onClick={() => setShowAddForm(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Main
