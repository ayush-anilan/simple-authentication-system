import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import IndexPage from './pages/IndexPage'
import ResetPasswordPage from './pages/ResetPasswordPage'


axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : '/api'
axios.defaults.withCredentials = true

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<IndexPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
