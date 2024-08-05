import { Outlet } from 'react-router-dom'
import styles from './addlayout.module.scss'

const AddLayout = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  )
}

export default AddLayout
