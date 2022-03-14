import React from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { authActions } from "../store/authReducer"

const LogoutButton = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const logoutHandler = async () => {
    try {
      await fetch("http://localhost:5000/api/v1/auth/logout", {
        method: "GET",
        credentials: "include",
      })

      dispatch(authActions.logout())
      localStorage.setItem("isAuthenticated", JSON.stringify(false))
      localStorage.setItem("user", JSON.stringify({}))
      router.push("/logout")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <button onClick={logoutHandler} type="button">
        Logout
      </button>
    </div>
  )
}

export default LogoutButton
