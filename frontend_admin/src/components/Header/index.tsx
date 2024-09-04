import React from 'react'
import HeaderSlider from '../HeaderSlider'
import styles from './header.module.scss'

interface HeaderProps {
  firstName: string | null
  lastName: string | null
  avatarUrl: string | null
}

const Header: React.FC<HeaderProps> = ({ firstName, lastName, avatarUrl }) => {
  const defaultName = 'Загрузка...'

  return (
    <div className={styles.wrapper}>
      <section className={styles.header_logo}>
        <div className={styles.header_avatar}>
          <img
            src={
              avatarUrl ||
              'https://i0.wp.com/www.stignatius.co.uk/wp-content/uploads/2020/10/default-user-icon.jpg?fit=415%2C415&ssl=1'
            }
            alt=""
          />
        </div>
        <p className={styles.name}>
          {firstName || defaultName} {lastName || ''}
        </p>
      </section>
      <HeaderSlider />
    </div>
  )
}

export default Header
