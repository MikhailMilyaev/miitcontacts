import axios from 'axios'
import {$host, $authHost} from './index'
import {jwtDecode} from 'jwt-decode'

// export const signUp = async (email, password) => {
//     const {data} = await axios.post('http://localhost:8080/api/signup', {email, password, role: 'MANAGER'})
//     return data
// }

export const signIn = async (email, password) => {
    const { data } = await axios.post('http://localhost:8080/api/signin', { email, password })
    return data
}

// export const check = async () => {
//     const {data} = await $authHost.get('api/check')
//     localStorage.setItem('token', data.token)
//     return jwtDecode(data.token)
// }