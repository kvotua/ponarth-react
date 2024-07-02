
import './App.css'
import Header from './components/Header'
import RightBar from './components/RightBar'

function App() {

  return (
    <>
      <Header />

      {/* </> между Header и RightBar должен быть <Content>, в котором уже должны находиться все компоненты  */}

      <RightBar />
    </>
  )
}

export default App
