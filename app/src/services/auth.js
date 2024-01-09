import axios from 'axios'
import { useNavigate } from 'react-router-dom'

let headers = {
    'Content-Type': 'application/json'
}

const userIsLoggedIn = (navigate, route) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if(user) {
        if( route === '/login' || route === '/register') {
            navigate('/')
        }
        return true
    }

    return false
    // else{
    //     if( route !== '/login' && route !== '/register') {
    //         navigate('/login')
    //     }
    // }
    }

const login = async (userEmail, password) => {
    return await axios ({
        method: 'post',
        url: 'http://localhost:3002/auth/login',
        data: {
            userEmail, password
        },
        headers
    })
}
const register = async (email, username, name, password) => {
    return await axios ({
        method: 'post',
        url: 'http://localhost:3002/auth/register',
        data: {
            email, username, name, password
        },
        headers
    })

}
const forgotPassword = async (userEmail, loginUrl) => {
    return await axios ({
        method: 'patch',
        url: 'http://localhost:3002/auth/forgot-password',
        data: {
            userEmail,
            loginUrl
        },
        headers,
        
    })
}

const getUser = () => {
    return JSON.parse(window.localStorage.getItem('user'))

}


export {
    login,
    register,
    userIsLoggedIn,
    getUser,
    forgotPassword,
}