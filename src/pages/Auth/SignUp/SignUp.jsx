import classes from './SignUp.module.css'
import { useState } from 'react'
import { useLocation } from "react-router-dom"
import FormInputPassword from '../../../components/Auth/FormInputPassword/FormInputPassword'
import SubmitButton from '../../../components/Auth/SubmitButton/SubmitButton'

const SingUp = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("userId");
    
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    return (
        <div className={classes.container}>
            <form>
                <FormInputPassword
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Новый пароль' />
                <FormInputPassword
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder='Подтвердите новый пароль' />
                
                {errorMessage && (
                    <div style={{ marginTop: '12px' }}>
                        <FormErrorMessage message={errorMessage}/>
                    </div>
                )}

                <SubmitButton type="submit">Зарегестрироваться</SubmitButton>
            </form>
        </div>
    );
}

export default SingUp