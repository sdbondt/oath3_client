import React from 'react'
import Link from 'next/link'

const logout = () => {
  return (
      <div>
          <p>You are logged out</p>
          <Link href='/'>
            <a>Log back in</a>
          </Link>
      </div>
  )
}

export default logout