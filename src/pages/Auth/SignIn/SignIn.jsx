import classes from './SignIn.module.css'
import { useState/*, useEffect */} from 'react'
// import validator from 'validator';
// import axios from 'axios';
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

  // useEffect(() => {
  //   setErrorMessage('')
  // }, [email, password])

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   if (!email || !password) {
  //     setErrorMessage('Пожалуйста заполните все поля!')
  //     return
  //   }

  //   if (!validator.isEmail(email)) { 
  //     setErrorMessage('Данные введены некорректно');
  //     return; 
  //   }

  //   if (password.length < 8) { 
  //     setErrorMessage('Данные введены некорректно');
  //     return; 
  //   }

  //   try {
  //     setIsLoading(true)
  //     const response = await axios.post('/api/signin', {email, password})

  //     if (!response.data?.token || !response.data?.user) {
  //       setErrorMessage('Некорректный ответ от сервера');
  //       return;
  //     }

  //     Cookies.set('token', response.data.token, {
  //       expires: 365,
  //       secure: process.env.NODE_ENV === 'production',
  //       sameSite: 'Strict'
  //     })

  //     login(response.data.user)
  //   } catch (error) {
  //     if (error.response) {
  //       if (error.response.status === 401) {
  //         setErrorMessage('Данные введены некорректно');
  //       } else {
  //         setErrorMessage(error.response.data.message || 'Произошла ошибка на сервере');
  //       }
  //     } else {
  //       setErrorMessage('Произошла ошибка на клиенте');
  //     }
  //   }  finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <div className={classes.container}>
      <Brand />
      <form /*onSubmit={handleSubmit}*/>
        <FormInput 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email' 
          placeholder='Электронная почта' />
        <FormInputPassword
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Пароль' />
          
        <RecoveryButton />

        {errorMessage && <div style={{ marginTop: '12px'}}><FormErrorMessage message={errorMessage}/></div>}

        <SubmitButton isLoading={isLoading}>Войти</SubmitButton>
      </form>
    </div>
  )
}

export default SignIn