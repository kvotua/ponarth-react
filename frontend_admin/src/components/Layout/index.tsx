import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import styles from './layout.module.scss'

const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
