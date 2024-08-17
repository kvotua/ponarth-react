import styles from './styles/notificationpage.module.scss'
import settings from '../assets/settings.svg'
import delete_btn from '../assets/delete.svg'

import { useEffect, useState } from 'react'
import { deleteUser, getUsers, User } from '../api/notifications/requests'
import { useNavigate } from 'react-router-dom'

const roleSynonyms: Record<string, string> = {
  formVacancy: 'Форма вакансии',
  formOfExcursions: 'Форма экскурсии',
  formPartner: 'Форма партнеров',
  formShareholder: 'Форма акционеров',
}

const NotificationPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data: User[] = await getUsers()
        const usersWithSynonyms = data.map((user) => ({
          ...user,
          nameAndLastname: user.nameAndLastname.replace(';', ' '),
          roles: user.roles
            .filter((role) => role !== 'ADMIN')
            .map((role) => roleSynonyms[role] || role),
        }))
        setUsers(usersWithSynonyms)
      } catch (error) {
        console.error('Error fetching users', error)
      }
    }
    fetchUsers()
  }, [])

  const handleDeleteClick = async (id: number) => {
    const confirmed = window.confirm(
      'Вы уверены что хотите удалить данного пользователя?'
    )
    if (confirmed) {
      try {
        await deleteUser(id)
        setUsers(users.filter((user) => user.id !== id))
      } catch (error) {
        console.error('Error deleting user', error)
      }
    }
  }

  const handleSettingsClick = (user: User) => {
    navigate('/notifications/add', { state: { user } })
  }

  return (
    <>
      <h1 className={styles.title}>Управление уведомлениями</h1>

      <div className={styles.notifications_list}>
        {users.map((user) => (
          <div key={user.id} className={styles.notification}>
            <div className={styles.image_block}>
              <img alt="image" />
            </div>
            <div className={styles.description_block}>
              <h2>{user.nameAndLastname}</h2>
              <p>@{user.username}</p>
              <br />
              <h3>Роли:</h3>
              <div>
                {user.roles.length > 0 ? (
                  user.roles.map((role) => <p key={role}>{role}</p>)
                ) : (
                  <p>—</p>
                )}
              </div>
            </div>
            <div
              className={styles.settings_btn}
              onClick={() => handleSettingsClick(user)}
            >
              <img src={settings} alt="settings" />
            </div>
            <div
              className={styles.delete_btn}
              onClick={() => handleDeleteClick(user.id)}
            >
              <img src={delete_btn} alt="delete" />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default NotificationPage
