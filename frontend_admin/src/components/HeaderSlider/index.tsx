import { FC, useState, useRef, MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './slider.module.scss'

export interface Button {
  label: string
  path: string
}

const buttons: Button[] = [
  { label: 'Продукты', path: '/products' },
  { label: 'Вакансии', path: '/vacancies' },
  { label: 'Точки', path: '/points' },
  { label: 'Уведомления', path: '/notifications' },
]

const HeaderSlider: FC = () => {
  const location = useLocation()
  const [isScrolling, setScrolling] = useState<boolean>(false)
  const [scrollStart, setScrollStart] = useState<number>(0)
  const slider = useRef<HTMLDivElement | null>(null)

  const handleMouseDown = (e: MouseEvent) => {
    setScrolling(true)
    setScrollStart(e.clientX)
  }

  const handleMouseLeave = () => {
    setScrolling(false)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isScrolling && slider.current) {
      slider.current.scrollLeft += scrollStart - e.clientX
      setScrollStart(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setScrolling(false)
  }

  const handleVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate(10)
    }
  }

  return (
    <div
      className={styles.slider_box}
      ref={slider}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {buttons.map((button: Button, index: number) => (
        <Link to={button.path} onDragStart={(e) => e.preventDefault()}>
          <button
            key={index}
            className={`${styles.slider_button} ${
              location.pathname === button.path ? styles.selected : ''
            }`}
            onClick={handleVibration}
          >
            {button.label}
          </button>
        </Link>
      ))}
    </div>
  )
}

export default HeaderSlider
