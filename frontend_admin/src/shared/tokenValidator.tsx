import React, { useEffect, useState, ReactNode, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

interface TokenValidatorProps {
  children: ReactNode
}

const TokenValidator: React.FC<TokenValidatorProps> = ({ children }) => {
  const location = useLocation()
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null)

  const validateToken = useCallback(async (token: string) => {
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
        await requestNewToken(response.data.username)
      }
    } catch (error) {
      await requestNewToken(null)
      console.error('Error validating token:', error)
    }
  }, [])

  const requestNewToken = async (username: string | null) => {
    if (!username) {
      setIsTokenValid(false)
      console.error('Username is required to request a new token')
      return
    }

    try {
      const response = await axios.post(
        'https://backend.ponarth.com/api/auth/login',
        {
          username: username,
        }
      )

      if (response.status === 200) {
        const newToken = response.data.token
        localStorage.setItem('token', newToken)
        setIsTokenValid(true)
      } else {
        setIsTokenValid(false)
        console.log('Failed to get new token')
      }
    } catch (error) {
      setIsTokenValid(false)
      console.error('Error requesting new token:', error)
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token') || localStorage.getItem('token')

    if (token) {
      validateToken(token)
    } else {
      setIsTokenValid(false)
    }
  }, [location, validateToken])

  if (isTokenValid === null) {
    return <div>Loading...</div>
  }

  if (!isTokenValid) {
    return <div>У вас нет доступа</div>
  }

  return <>{children}</>
}

export default TokenValidator
