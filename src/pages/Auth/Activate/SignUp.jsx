import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import classes from './ActivatePage.module.css'
import FormInput from '../../components/Auth/FormInput/FormInput'
import FormInputPassword from '../../components/Auth/FormInputPassword/FormInputPassword'
import FormErrorMessage from '../../components/Auth/FormErrorMessage/FormErrorMessage'
import SubmitButton from '../../components/Auth/SubmitButton/SubmitButton'

const ActivatePage = () => {
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const key = searchParams.get('key')

  useEffect(() => {
    if (!key) {
      setErrorMessage('Ссылка недействительна: отсутствует ключ')
      setLoading(false)
      return
    }

    axios.get(`/api/invite/check?key=${key}`)
      .then(response => {
        setEmail(response.data.email)
        setLoading(false)
      })
      .catch(() => {
        setErrorMessage('Ссылка устарела или недействительна')
        setLoading(false)
      })
  }, [key])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!password || password.length < 8) {
      setErrorMessage('Пароль должен быть не менее 8 символов')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Пароли не совпадают')
      return
    }

    try {
      setSubmitting(true)
      await axios.post('/api/invite/confirm', { key, password })
      navigate('/signin')
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message)
      } else {
        setErrorMessage('Ошибка при подтверждении регистрации')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div style={{ padding: 20 }}>Проверка ссылки...</div>

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Регистрация менеджера</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          value={email}
          disabled
          placeholder="Электронная почта"
        />

        <FormInputPassword
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (errorMessage) setErrorMessage('')
          }}
          placeholder="Придумайте пароль"
        />

        <FormInputPassword
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            if (errorMessage) setErrorMessage('')
          }}
          placeholder="Подтвердите пароль"
        />

        {errorMessage && (
          <div style={{ marginTop: '12px' }}>
            <FormErrorMessage message={errorMessage} />
          </div>
        )}

        <SubmitButton type="submit" disabled={submitting} style={{ marginTop: '20px' }}>
          {submitting ? 'Загрузка...' : 'Зарегистрироваться'}
        </SubmitButton>
      </form>
    </div>
  )
}

export default ActivatePage
