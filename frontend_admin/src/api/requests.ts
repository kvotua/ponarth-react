import api from './api'

export const addVacancy = async (data: {
  name: string
  description: string
}) => {
  try {
    const token = localStorage.getItem('token')
    const response = await api.post('/admin/vacancy/add', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error adding vacancy:', error)
    throw error
  }
}
