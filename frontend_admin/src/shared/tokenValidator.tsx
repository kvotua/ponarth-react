import React, { useEffect, useState, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

interface TokenValidatorProps {
  children: ReactNode
}

const TokenValidator: React.FC<TokenValidatorProps> = ({ children }) => {
  const location = useLocation()
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token') || localStorage.getItem('token')

    if (token) {
      validateToken(token)
    } else {
      setIsTokenValid(false)
    }
  }, [location])

  const validateToken = async (token: string) => {
    try {
      const response = await axios.get(
        'https://backend.ponarth.com/api/auth/validateToken',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.status === 200) {
        localStorage.setItem('token', token)
        setIsTokenValid(true)
      } else {
        setIsTokenValid(false)
        console.log('Invalid token')
      }
    } catch (error) {
      setIsTokenValid(false)
      console.error('Error validating token:', error)
    }
  }

  if (isTokenValid === null) {
    return <div>Loading...</div>
  }

  if (!isTokenValid) {
    return <div>У вас нет доступа</div>
  }

  return <>{children}</>
}

export default TokenValidator
