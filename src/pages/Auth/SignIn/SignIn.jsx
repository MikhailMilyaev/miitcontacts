import classes from './SignIn.module.css'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../../index'
import { observer } from 'mobx-react-lite'
import { signIn } from '../../../http/UserApi'

import Brand from '../../../components/Auth/Brand/Brand'
import FormInput from '../../../components/Auth/FormInput/FormInput'
import FormInputPassword from '../../../components/Auth/FormInputPassword/FormInputPassword'
import RecoveryButton from '../../../components/Auth/RecoveryButton/RecoveryButton'
import FormErrorMessage from '../../../components/Auth/FormErrorMessage/FormErrorMessage'
import SubmitButton from '../../../components/Auth/SubmitButton/SubmitButton'

const SignIn = observer(() => {
  const { user } = useContext(Context)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateInputs = () => {
    if (!email || !password) {
      setErrorMessage('Все поля должны быть заполнены')
      return false
    }
    if (password.length < 8) {
      setErrorMessage('Пароль должен содержать минимум 8 символов')
      return false
    }
    setErrorMessage('')
    return true
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateInputs()) return

  setIsLoading(true)

  try {
    const data = await signIn(email, password)
    data.role = data.role.toUpperCase()
    user.setUser(data)      
    user.setIsAuth(true)
    localStorage.setItem('user', JSON.stringify(data))
    navigate('/')
  } catch (error) {
    console.error('Ошибка при авторизации:', error)
    if (error.response) {
      setErrorMessage(error.response.data.error || 'Неверный email или пароль')
    } else {
      setErrorMessage('Ошибка подключения к серверу')
    }
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className={classes.container}>
      <Brand />
      <form onSubmit={handleSubmit}>
        <FormInput 
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (errorMessage) setErrorMessage('')
          }}
          type='email' 
          placeholder='Электронная почта' 
        />
        <FormInputPassword
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (errorMessage) setErrorMessage('')
          }}
          placeholder='Пароль' 
        />
        <RecoveryButton />

        {errorMessage && (
          <div style={{ marginTop: '12px' }}>
            <FormErrorMessage message={errorMessage}/>
          </div>
        )}

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Вход...' : 'Войти'}
        </SubmitButton>
      </form>
    </div>
  )
})

export default SignIn
