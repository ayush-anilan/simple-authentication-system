import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import IndexPage from './pages/IndexPage'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.withCredentials = true


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<IndexPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/signup' element={<SignUpPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
