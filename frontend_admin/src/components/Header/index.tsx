import React from 'react'
import HeaderSlider from '../HeaderSlider'
import styles from './header.module.scss'

interface HeaderProps {
  firstName: string | null
  lastName: string | null
  avatarUrl: string | null
}

const Header: React.FC<HeaderProps> = ({ firstName, lastName, avatarUrl }) => {
  const defaultName = 'Гусь утка'

  return (
    <div className={styles.wrapper}>
      <section className={styles.header_logo}>
        <div className={styles.header_avatar}>
          <img
            src={
              avatarUrl ||
              'https://masterpiecer-images.s3.yandex.net/fa066d4962eb11ee8c6d168cdf1572ce:upscaled'
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
