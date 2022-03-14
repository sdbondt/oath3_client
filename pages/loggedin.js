import React, { useEffect } from 'react'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import { useDispatch, useSelector } from "react-redux"
import { authActions } from '../store/authReducer'

const loggedin = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  useEffect(() => {
    const getUser = async () => {
      const data = await fetch('http://localhost:5000/api/v1/getuser', {
        method: "GET",
        credentials: "include",
      })
      const dataJSON = await data.json()
      const { user } = dataJSON
      if (user) {
        return user
      }
    }

    getUser().then(user => {
      localStorage.setItem('isAuthenticated', JSON.stringify(true))
      localStorage.setItem('user', JSON.stringify(user))
      dispatch(authActions.setUser(user))
      dispatch(authActions.login())
    })  
  }, [])

  if (!user || !isAuthenticated) {
    return (
      <div>
          <p>You are logged in</p>
          <Link href="/">
            <a >Return to home page</a>
      </Link>
      <LogoutButton />
      </div>
  )
  } else {
    return (
      <div>
        <p>You are logged in, {user.username}</p>
          <Link href="/">
            <a >Return to home page</a>
      </Link>
      <LogoutButton />
      </div>
  )
  }
  
}

export default loggedin