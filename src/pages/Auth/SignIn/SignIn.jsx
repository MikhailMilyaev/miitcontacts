import classes from './SignIn.module.css'
import { useState } from 'react'
import axios from 'axios'
import Brand from '../../../components/Auth/Brand/Brand'
import FormInput from '../../../components/Auth/FormInput/FormInput'
import FormInputPassword from '../../../components/Auth/FormInputPassword/FormInputPassword'
import RecoveryButton from '../../../components/Auth/RecoveryButton/RecoveryButton'
import FormErrorMessage from '../../../components/Auth/FormErrorMessage/FormErrorMessage'
import SubmitButton from '../../../components/Auth/SubmitButton/SubmitButton'

const SignIn = () => {
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
    
    // Валидация перед отправкой
    if (!validateInputs()) {
      return
    }
    
    let data = {
      "email": email,
      "password": password
    };

    try {
      const response = await axios.post('http://localhost:8080/api/login', data);
      setIsLoading(true)
      console.log('Успешно отправлено:', response.data);
      
      // Очистка формы после успешной отправки
      setEmail('')
      setPassword('')
      setErrorMessage('')
      
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      
      // Обработка ошибок сервера
      if (error.response) {
        // Сервер ответил с кодом ошибки (4xx, 5xx)
        setErrorMessage(error.response.data.message || 'Неверный email или пароль');
      } else if (error.request) {
        // Запрос был сделан, но ответ не получен
        setErrorMessage('Не удалось подключиться к серверу');
      } else {
        // Ошибка при настройке запроса
        setErrorMessage('Произошла ошибка при отправке запроса');
      }
    }
  };

  return (
    <div className={classes.container}>
      <Brand />
      <form onSubmit={handleSubmit} isLoading={isLoading}>
        <FormInput 
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            // Очищаем ошибку при изменении поля
            if (errorMessage) setErrorMessage('')
          }}
          type='email' 
          placeholder='Электронная почта' />
          
        <FormInputPassword
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            // Очищаем ошибку при изменении поля
            if (errorMessage) setErrorMessage('')
          }}
          placeholder='Пароль' />

        <RecoveryButton />

        {errorMessage && (
          <div style={{ marginTop: '12px' }}>
            <FormErrorMessage message={errorMessage}/>
          </div>
        )}

        <SubmitButton type="submit">Войти</SubmitButton>
      </form>
    </div>
  )
}

export default SignIn