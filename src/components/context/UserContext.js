import React, {useState} from 'react'
import { useEffect } from 'react'

const Context = React.createContext({})

export function UserContextProvider ({children}) {
  const [jwt, setJWT] = useState(
    () => window.sessionStorage.getItem('refresh_token')
  )

  useEffect(() => {
    if (!jwt) return setJWT([])
  }, [jwt])

  return <Context.Provider value={{
    jwt,
    setJWT
  }}>
    {children}
  </Context.Provider>
}

export default Context