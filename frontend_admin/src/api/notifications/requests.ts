import { AxiosResponse } from 'axios'
import api from '../api'

export interface User {
  id: number
  username: string
  nameAndLastname: string
  roles: string[]
}

export const getUsers = async (): Promise<User[]> => {
  try {
    const token = localStorage.getItem('token')
    const response: AxiosResponse<User[]> = await api.get('/user/all', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching users', error)
    throw error
  }
}

export const deleteUser = async (id: number): Promise<void> => {
  try {
    const token = localStorage.getItem('token')
    await api.delete(`/user/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error('Error deleting user', error)
    throw error
  }
}

export const updateUser = async (user: User): Promise<User> => {
  try {
    const token = localStorage.getItem('token')
    const response: AxiosResponse<User> = await api.put('/user/update', user, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error updating user', error)
    throw error
  }
}
