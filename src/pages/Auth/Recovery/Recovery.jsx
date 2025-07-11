import classes from './Recovery.module.css'
import { useState } from 'react'
import Brand from '../../../components/Auth/Brand/Brand'
import FormInput from '../../../components/Auth/FormInput/FormInput'
import FormErrorMessage from '../../../components/Auth/FormErrorMessage/FormErrorMessage'
import SubmitButton from '../../../components/Auth/SubmitButton/SubmitButton'

const Recovery = () => {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

//   useEffect(() => {
//     setErrorMessage('')
//   }, [email])

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!email) {
//       setErrorMessage('Пожалуйта, заполните поле!')
//       return
//     }

//     if (!validator.isEmail(email)) {
//       setErrorMessage('Данные введены некорректно');
//       return
//     }

//     try {
//       setIsLoading(true)
//       await axios.post('/api/recovery', {email})
//       setSuccess(true)
//     } catch (error) {
//       if (error.response) {
//         if (error.response.status === 404) {
//           setErrorMessage('Данные введены некорректно');
//         } else {
//           setErrorMessage(error.response.data.message || 'Произошла ошибка на сервере');
//         }
//       } else {
//         setErrorMessage('Произошла ошибка на клиенте');
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

  return (
    <div className={classes.container}>
        <Brand />
      {!success ?
        <form /*onSubmit={handleSubmit}*/>
          <div style={{ marginBottom: '30px'}}>
            <FormInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type={'email'}
              placeholder={'Электронная почта'} />
          </div>
          {errorMessage && <FormErrorMessage message={errorMessage}/> }

          <SubmitButton isLoading={isLoading}>Отправить</SubmitButton>  
        </form>
         : <p style={{ marginBottom: '30px'}}>На ваш адрес электронный почты было отправлено письмо с паролем.</p>
      }
    </div>
  )
}

export default Recovery