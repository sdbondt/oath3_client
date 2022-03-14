import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const signup = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    username: '',
    password: ''
  })
  const {email, password, username} = userDetails
  const router = useRouter()
  const changeHandler = (e) => {
    setUserDetails((prevState) => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const signupHandler = async (e) => {
    e.preventDefault()
    const signupBody = JSON.stringify({
      email: email,
      username: username,
      password: password,
    })
    const data = await fetch('http://localhost:5000/api/v1/auth/signup', {
      method: 'POST',
      body: signupBody,
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const dataJSON = await data.json()
    if (dataJSON.data === 'ok') {
      router.push('/loggedin')
    }
  }

  return (
    <div onSubmit={signupHandler}>
      <form>
        <label htmlFor="username">Username</label>
        <br />
        <input value={username} name="username" onChange={changeHandler} type="text" id="username" />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input value={email} name="email" onChange={changeHandler} type="email" id="email" />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input value={password} name="password" onChange={changeHandler} type="password" id="password" />
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <Link href="/">
        <a>Already got an account? Login Here</a>
      </Link>
    </div>
  )
}

export default signup
