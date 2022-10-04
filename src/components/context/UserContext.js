import React, {useState} from 'react'
import { useEffect } from 'react'

const Context = React.createContext({})

export function UserContextProvider ({children}) {
  const [jwt, setJWT] = useState(
    () => window.localStorage.getItem('refresh_token')
  )
  const [user, setUSER] = useState(
    () => window.localStorage.getItem('user')
  )

  useEffect(() => {
    if (!jwt) return setJWT([])
  }, [jwt])

  useEffect(() => {
    if (!user) return setUSER([])
  }, [user])

  return <Context.Provider value={{
    jwt,
    setJWT,
    user,
    setUSER
  }}>
    {children}
  </Context.Provider>
}

export default Context