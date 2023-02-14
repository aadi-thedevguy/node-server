import React,{createContext,useState, FC, PropsWithChildren, ReactElement} from 'react'
import { useNavigate } from 'react-router-dom'
import { ResponseUser } from '../pages/auth/_interfaces'

const value = localStorage.getItem('user')
const storedVal = typeof value === 'string' ? JSON.parse(value) : null

export const AppContext = createContext({
    updated : false,
    toggle : () => {},
    login : (user : ResponseUser) => {},
    logout : () => {},
    user : {
      _id : '',
      name : '',
      email : '',
      token : ''
    }
})

const AppContextProvider : FC<PropsWithChildren> = (props) : ReactElement => {

    const [updated, setUpdated] = useState(false)
    const [user, setUser] = useState<ResponseUser | any>(storedVal)
    const navigate = useNavigate()

    function toggleHandler() {
        updated ? setUpdated(false) : setUpdated(true)
    }

    function login(user : ResponseUser) {
      setUser(user)
      localStorage.setItem('user',JSON.stringify(user))
      navigate('/')
    }

    function logout() {
      setUser(null)
      localStorage.removeItem('user')
      navigate('/')
    }

  return (
    <AppContext.Provider
    value={{updated : updated, toggle : toggleHandler, user, login, logout}}
    >{props.children}</AppContext.Provider>
  )
}

export default AppContextProvider