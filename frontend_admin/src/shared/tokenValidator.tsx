import React, { useEffect, useState, ReactNode, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header' // Import the Header component

interface TokenValidatorProps {
  children: ReactNode
}

interface User {
  id: string
  username: string
}

const TokenValidator: React.FC<TokenValidatorProps> = ({ children }) => {
  const location = useLocation()
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [firstName, setFirstName] = useState<string | null>(null)
  const [lastName, setLastName] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const validateToken = useCallback(
    async (token: string) => {
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
          setUsername(response.data.username)
          fetchUserId(response.data.username, token) // Fetch user ID after validating the token
        } else {
          await requestNewToken(response.data.username)
        }
      } catch (error) {
        await requestNewToken(username)
        console.error('Error validating token:', error)
      }
    },
    [username]
  )

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
        fetchUserId(username, newToken) // Fetch user ID after getting a new token
      } else {
        setIsTokenValid(false)
        console.log('Failed to get new token')
      }
    } catch (error) {
      setIsTokenValid(false)
      console.error('Error requesting new token:', error)
    }
  }

  const fetchUserId = async (username: string, token: string) => {
    try {
      const response = await axios.get(
        'https://backend.ponarth.com/api/user/all',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.status === 200) {
        const user: User | undefined = response.data.find(
          (user: User) => user.username === username
        )
        if (user) {
          sendTelegramRequest(user.id) // Send request to Telegram API with the user ID
        } else {
          console.log('User not found')
        }
      } else {
        console.log('Failed to fetch users')
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const sendTelegramRequest = async (id: string) => {
    try {
      const response = await axios.get(
        `https://api.telegram.org/bot7325305177:AAEPXOEoUqU8w_slY6osObJwbNfdWQ0sjus/getChat?chat_id=${id}`
      )

      if (response.status === 200) {
        setFirstName(response.data.result.first_name)
        setLastName(response.data.result.last_name)
        const bigFileUniqueId = response.data.result.photo.big_file_id
        console.log('Telegram request successful:', response.data)
        fetchFile(bigFileUniqueId) // Fetch file using big_file_unique_id
      } else {
        console.log('Failed to send Telegram request')
      }
    } catch (error) {
      console.error('Error sending Telegram request:', error)
    }
  }

  const fetchFile = async (fileId: string) => {
    try {
      const response = await axios.get(
        `https://api.telegram.org/bot7325305177:AAEPXOEoUqU8w_slY6osObJwbNfdWQ0sjus/getFile?file_id=${fileId}`
      )

      if (response.status === 200) {
        const filePath = response.data.result.file_path
        const fileUrl = `https://api.telegram.org/file/bot7325305177:AAEPXOEoUqU8w_slY6osObJwbNfdWQ0sjus/${filePath}`
        setAvatarUrl(fileUrl)
        console.log('File fetched successfully:', response.data)
      } else {
        console.log('Failed to fetch file')
      }
    } catch (error) {
      console.error('Error fetching file:', error)
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

  return (
    <>
      <Header firstName={firstName} lastName={lastName} avatarUrl={avatarUrl} />
      {children}
    </>
  )
}

export default TokenValidator
