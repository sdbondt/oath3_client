import React, { useState } from "react"
import Link from 'next/link'
import { useRouter } from "next/router"

const LoginPage = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  })
  const { email, password } = userDetails
  const router = useRouter()

  const googleLogin = () => {
    window.open("http://localhost:5000/api/v1/auth/google", "_self")
  }

  const githubLogin = () => {
        window.open("http://localhost:5000/api/v1/auth/github", "_self");
  }
  
  const changeHandler = (e) => {
    setUserDetails((prevState) => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    const loginBody = JSON.stringify({
      email: email,
      password: password
    })
    const data = await fetch('http://localhost:5000/api/v1/auth/login', {
      method: 'POST',
      body: loginBody,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const dataJSON = await data.json()
    if (dataJSON.data === 'ok') {
      router.push('/loggedin')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <div onClick={googleLogin}>
        <p>Login with Google</p>
      </div>
      <div onClick={githubLogin}>
        <p>Login with Github</p>
      </div>
      <div>
        <form onSubmit={loginHandler}>
          <label htmlFor="email">Email</label><br />
          <input value={email} onChange={changeHandler} name="email" type="email" id="email" /><br />
          <label htmlFor="password">Password</label><br />
          <input value={password} name="password" onChange={changeHandler} type="password" id="password" /><br />
          <button type="submit">Login</button>
        </form>
        <Link href="/signup">
        <a>No Account yet? Signup here</a>
      </Link>
      </div>
    </div>
  )
}

export default LoginPage
