import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProductPage from './pages/ProductsPage'
import VacanciesPage from './pages/VacanciesPage'
import PointsPage from './pages/PointsPage'
import NotificationPage from './pages/NotificationsPage'
import AddVacanciesPage from './pages/AddVacanciesPage'
import AddPointsPage from './pages/AddPointPage'
import AddTelegramNotificationPage from './pages/AddNotificationsPage'
import AddLayout from './components/AddLayout'
import AddProductPage from './pages/AddProductPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Parent routes */}
        <Route path="/" element={<Layout />}>
          <Route path="products" element={<ProductPage />} />
          <Route path="vacancies" element={<VacanciesPage />} />
          <Route path="points" element={<PointsPage />} />
          <Route path="notifications" element={<NotificationPage />} />
        </Route>

        {/* Child routes */}
        <Route path="/" element={<AddLayout />}>
          <Route path="vacancies/add" element={<AddVacanciesPage />} />
          <Route path="points/add" element={<AddPointsPage />} />
          <Route path="products/add" element={<AddProductPage />} />
          <Route path="notifications/add"element={<AddTelegramNotificationPage />}
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
